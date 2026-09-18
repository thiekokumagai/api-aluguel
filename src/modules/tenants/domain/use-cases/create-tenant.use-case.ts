import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateTenantDto } from '../../infrastructure/dtos/create-tenant.dto';

@Injectable()
export class CreateTenantUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateTenantDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.adminEmail }
    });

    if (existingUser) {
      throw new BadRequestException('User email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.adminPassword, 10);

    const organization = await this.prisma.organization.create({
      data: {
        name: data.organizationName,
        document: data.document,
        users: {
          create: {
            name: data.adminName,
            email: data.adminEmail,
            password: hashedPassword,
            role: 'ADMIN'
          }
        }
      },
      include: {
        users: true
      }
    });

    return {
      organizationId: organization.id,
      organizationName: organization.name,
      adminId: organization.users[0].id,
      adminEmail: organization.users[0].email
    };
  }
}
