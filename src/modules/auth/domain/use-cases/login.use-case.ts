import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../infrastructure/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async execute(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.organizationId };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
