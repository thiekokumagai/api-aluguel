import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreatePropertyUseCase } from '../../domain/use-cases/create-property.use-case';
import { ListPropertiesUseCase } from '../../domain/use-cases/list-properties.use-case';
import { FindPropertyUseCase } from '../../domain/use-cases/find-property.use-case';
import { UpdatePropertyUseCase } from '../../domain/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from '../../domain/use-cases/delete-property.use-case';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly listPropertiesUseCase: ListPropertiesUseCase,
    private readonly findPropertyUseCase: FindPropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.createPropertyUseCase.execute(createPropertyDto);
  }

  @Get()
  async findAll() {
    return this.listPropertiesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findPropertyUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.updatePropertyUseCase.execute(id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deletePropertyUseCase.execute(id);
  }
}
