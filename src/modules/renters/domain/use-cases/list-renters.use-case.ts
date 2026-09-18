import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class ListRentersUseCase {
  constructor(private prisma: PrismaService) {}

  async execute() {
    return this.prisma.renter.findMany();
  }
}
