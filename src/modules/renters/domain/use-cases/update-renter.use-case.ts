import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UpdateRenterDto } from '../../infrastructure/dtos/update-renter.dto';
import { FindRenterUseCase } from './find-renter.use-case';

@Injectable()
export class UpdateRenterUseCase {
  constructor(
    private prisma: PrismaService,
    private findRenter: FindRenterUseCase
  ) {}

  async execute(id: string, data: UpdateRenterDto) {
    const renter = await this.findRenter.execute(id);
    return this.prisma.renter.update({
      where: { id: renter.id },
      data,
    });
  }
}
