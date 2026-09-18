import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../domain/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
