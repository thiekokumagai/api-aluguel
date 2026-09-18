import { Module } from '@nestjs/common';
import { TenantsController } from './infrastructure/controllers/tenants.controller';
import { CreateTenantUseCase } from './domain/use-cases/create-tenant.use-case';

@Module({
  controllers: [TenantsController],
  providers: [CreateTenantUseCase]
})
export class TenantsModule {}
