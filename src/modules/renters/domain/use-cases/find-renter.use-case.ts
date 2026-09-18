import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class FindRenterUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    const renter = await this.prisma.renter.findUnique({
      where: { id }
    });
    if (!renter) {
      throw new NotFoundException('Renter not found');
    }
    return renter;
  }
}
