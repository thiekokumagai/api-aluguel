import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class FindPropertyUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id }
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }
}
