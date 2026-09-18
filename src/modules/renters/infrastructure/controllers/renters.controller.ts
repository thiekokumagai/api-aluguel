import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateRenterUseCase } from '../../domain/use-cases/create-renter.use-case';
import { ListRentersUseCase } from '../../domain/use-cases/list-renters.use-case';
import { FindRenterUseCase } from '../../domain/use-cases/find-renter.use-case';
import { UpdateRenterUseCase } from '../../domain/use-cases/update-renter.use-case';
import { DeleteRenterUseCase } from '../../domain/use-cases/delete-renter.use-case';
import { CreateRenterDto } from '../dtos/create-renter.dto';
import { UpdateRenterDto } from '../dtos/update-renter.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('renters')
export class RentersController {
  constructor(
    private readonly createRenterUseCase: CreateRenterUseCase,
    private readonly listRentersUseCase: ListRentersUseCase,
    private readonly findRenterUseCase: FindRenterUseCase,
    private readonly updateRenterUseCase: UpdateRenterUseCase,
    private readonly deleteRenterUseCase: DeleteRenterUseCase,
  ) {}

  @Post()
  async create(@Body() createRenterDto: CreateRenterDto) {
    return this.createRenterUseCase.execute(createRenterDto);
  }

  @Get()
  async findAll() {
    return this.listRentersUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findRenterUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRenterDto: UpdateRenterDto) {
    return this.updateRenterUseCase.execute(id, updateRenterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deleteRenterUseCase.execute(id);
  }
}
