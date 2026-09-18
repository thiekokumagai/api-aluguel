import { Module } from '@nestjs/common';
import { LoginUseCase } from './domain/use-cases/login.use-case';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret', // Replace in prod
      signOptions: { expiresIn: '15m' }, // Short lived for refresh tokens later
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, JwtStrategy],
})
export class AuthModule {}
