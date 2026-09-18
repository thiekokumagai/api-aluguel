import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class ListPropertiesUseCase {
  constructor(private prisma: PrismaService) {}

  async execute() {
    return this.prisma.property.findMany();
  }
}
