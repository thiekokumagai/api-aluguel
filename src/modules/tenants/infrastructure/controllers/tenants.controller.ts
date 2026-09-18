import { Controller, Post, Body } from '@nestjs/common';
import { CreateTenantUseCase } from '../../domain/use-cases/create-tenant.use-case';
import { CreateTenantDto } from '../dtos/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly createTenantUseCase: CreateTenantUseCase) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.createTenantUseCase.execute(createTenantDto);
  }
}
