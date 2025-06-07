import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlantasService } from './plantas.service';

@Controller('api/plantas')
@UseGuards(JwtAuthGuard)
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Get()
  async findAll() {
    return this.plantasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.plantasService.findOne(+id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.plantasService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.plantasService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.plantasService.remove(+id);
  }
}
