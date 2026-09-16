import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public extendedClient: any;

  constructor(private readonly cls: ClsService) {
    super();
    
    const clsService = this.cls;
    this.extendedClient = this.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query, model, operation }) {
            // Models that don't have organizationId shouldn't be filtered this way
            const modelsWithTenant = ['User', 'Property', 'Contract', 'Charge'];
            
            if (modelsWithTenant.includes(model as string)) {
              const tenantId = clsService?.get('tenantId');
              const role = clsService?.get('role');

              // If not SUPER_ADMIN and we have a tenantId in context, inject it
              if (role !== 'SUPER_ADMIN' && tenantId) {
                if (['findUnique', 'findUniqueOrThrow'].includes(operation)) {
                  // Transform unique find into findFirst to allow injecting organizationId safely
                  // Prisma's findUnique rejects non-unique where inputs
                  (args as any).where = { ...args.where, organizationId: tenantId };
                  return (query as any)({ ...args, take: 1, _mutation: false, _queryType: 'findFirst' });
                } else if (['findMany', 'findFirst', 'update', 'updateMany', 'delete', 'deleteMany', 'count'].includes(operation)) {
                  args.where = { ...args.where, organizationId: tenantId };
                }
              }
            }
            return query(args);
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
