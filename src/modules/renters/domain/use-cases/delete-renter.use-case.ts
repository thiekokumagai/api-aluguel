import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { FindRenterUseCase } from './find-renter.use-case';

@Injectable()
export class DeleteRenterUseCase {
  constructor(
    private prisma: PrismaService,
    private findRenter: FindRenterUseCase
  ) {}

  async execute(id: string) {
    const renter = await this.findRenter.execute(id);
    return this.prisma.renter.delete({
      where: { id: renter.id }
    });
  }
}
