import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from './prisma/prisma.service';

export function createExtendedPrismaClient(cls: ClsService) {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query, model, operation }) {
          const modelsWithTenant = ['User', 'Property', 'Contract', 'Charge'];
          
          if (modelsWithTenant.includes(model as string)) {
            const tenantId = cls?.get('tenantId');
            const role = cls?.get('role');

            if (role !== 'SUPER_ADMIN' && tenantId) {
              if (['findUnique', 'findUniqueOrThrow'].includes(operation)) {
                const result = await query(args);
                if (result && typeof result === 'object' && 'organizationId' in result) {
                  if (result.organizationId !== tenantId) {
                    return null;
                  }
                }
                return result;
              } else if (['findMany', 'findFirst', 'update', 'updateMany', 'delete', 'deleteMany', 'count'].includes(operation)) {
                const where = (args as Record<string, unknown>).where as Record<string, unknown> | undefined;
                (args as Record<string, unknown>).where = { ...where, organizationId: tenantId };
              }
            }
          }
          return query(args);
        },
      },
    },
  });
}

export type ExtendedPrismaClient = ReturnType<typeof createExtendedPrismaClient>;

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      inject: [ClsService],
      useFactory: (cls: ClsService) => createExtendedPrismaClient(cls),
    },
  ],
  exports: [PrismaService],
})
export class CoreModule {}
