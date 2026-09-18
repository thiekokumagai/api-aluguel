import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UpdatePropertyDto } from '../../infrastructure/dtos/update-property.dto';
import { FindPropertyUseCase } from './find-property.use-case';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    private prisma: PrismaService,
    private findProperty: FindPropertyUseCase
  ) {}

  async execute(id: string, data: UpdatePropertyDto) {
    const property = await this.findProperty.execute(id);
    return this.prisma.property.update({
      where: { id: property.id },
      data,
    });
  }
}
