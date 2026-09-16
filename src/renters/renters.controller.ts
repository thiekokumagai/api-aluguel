import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentersService, CreateRenterDto, UpdateRenterDto } from './renters.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('renters')
export class RentersController {
  constructor(private readonly rentersService: RentersService) {}

  @Post()
  async create(@Body() createRenterDto: CreateRenterDto) {
    return this.rentersService.create(createRenterDto);
  }

  @Get()
  async findAll() {
    return this.rentersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rentersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRenterDto: UpdateRenterDto) {
    return this.rentersService.update(id, updateRenterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rentersService.remove(id);
  }
}
