import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';

export class CreateRenterDto {
  name!: string;
  email?: string;
  phone?: string;
  document!: string;
}

export class UpdateRenterDto {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
}

@Injectable()
export class RentersService {
  constructor(private prisma: PrismaService, private cls: ClsService) {}

  async create(data: CreateRenterDto) {
    const tenantId = this.cls.get('tenantId');
    return this.prisma.renter.create({
      data: {
        ...data,
        organizationId: tenantId,
      }
    });
  }

  async findAll() {
    return this.prisma.renter.findMany();
  }

  async findOne(id: string) {
    const renter = await this.prisma.renter.findUnique({
      where: { id }
    });
    if (!renter) {
      throw new NotFoundException('Renter not found');
    }
    return renter;
  }

  async update(id: string, data: UpdateRenterDto) {
    const renter = await this.findOne(id);
    return this.prisma.renter.update({
      where: { id: renter.id },
      data,
    });
  }

  async remove(id: string) {
    const renter = await this.findOne(id);
    return this.prisma.renter.delete({
      where: { id: renter.id }
    });
  }
}
