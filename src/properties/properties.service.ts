import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';

export class CreatePropertyDto {
  address!: string;
  description?: string;
  status?: string;
}

export class UpdatePropertyDto {
  address?: string;
  description?: string;
  status?: string;
}

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService, private cls: ClsService) {}

  async create(data: CreatePropertyDto) {
    const tenantId = this.cls.get('tenantId');
    return this.prisma.property.create({
      data: {
        ...data,
        organizationId: tenantId,
      }
    });
  }

  async findAll() {
    return this.prisma.property.findMany();
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id }
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async update(id: string, data: UpdatePropertyDto) {
    const property = await this.findOne(id);
    return this.prisma.property.update({
      where: { id: property.id },
      data,
    });
  }

  async remove(id: string) {
    const property = await this.findOne(id);
    return this.prisma.property.delete({
      where: { id: property.id }
    });
  }
}
