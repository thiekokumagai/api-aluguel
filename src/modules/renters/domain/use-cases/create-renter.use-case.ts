import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';
import { CreateRenterDto } from '../../infrastructure/dtos/create-renter.dto';

@Injectable()
export class CreateRenterUseCase {
  constructor(private prisma: PrismaService, private cls: ClsService) {}

  async execute(data: CreateRenterDto) {
    const tenantId = this.cls.get('tenantId');
    return this.prisma.renter.create({
      data: {
        ...data,
        organizationId: tenantId,
      }
    });
  }
}
