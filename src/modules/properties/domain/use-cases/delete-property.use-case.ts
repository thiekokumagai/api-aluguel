import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { FindPropertyUseCase } from './find-property.use-case';

@Injectable()
export class DeletePropertyUseCase {
  constructor(
    private prisma: PrismaService,
    private findProperty: FindPropertyUseCase
  ) {}

  async execute(id: string) {
    const property = await this.findProperty.execute(id);
    return this.prisma.property.delete({
      where: { id: property.id }
    });
  }
}
