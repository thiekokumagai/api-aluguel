import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';
import { CreatePropertyDto } from '../../infrastructure/dtos/create-property.dto';

@Injectable()
export class CreatePropertyUseCase {
  constructor(private prisma: PrismaService, private cls: ClsService) {}

  async execute(data: CreatePropertyDto) {
    const tenantId = this.cls.get('tenantId');
    return this.prisma.property.create({
      data: {
        ...data,
        organizationId: tenantId,
      }
    });
  }
}
