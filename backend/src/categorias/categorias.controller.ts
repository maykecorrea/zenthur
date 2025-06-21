import { Controller, Get, Post, Body, UseGuards, Delete, Param, Req, BadRequestException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('api/categorias')
@UseGuards(JwtAuthGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    console.log('📋 Buscando categorias para usuário:', req.user.userId);
    return this.categoriasService.findAll(req.user.userId);
  }

  @Get('with-count')
  async getCategoriasWithCount(@Req() req: RequestWithUser) {
    console.log('📋 Buscando categorias com contagem para usuário:', req.user.userId);
    try {
      // Verificação adicional de segurança
      if (!req.user || !req.user.userId) {
        throw new BadRequestException('Usuário não autenticado ou id não encontrado');
      }
      
      return this.categoriasService.getCategoriasWithCount(req.user.userId);
    } catch (error) {
      console.error('❌ Erro ao buscar categorias com contagem:', error);
      throw error;
    }
  }

  @Post()
  async create(@Body() createCategoriaDto: any, @Req() req: RequestWithUser) {
    console.log('➕ Criando categoria para usuário:', req.user.userId);
    return this.categoriasService.create(createCategoriaDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    console.log('🗑️ Removendo categoria ID:', id, 'para usuário:', req.user.userId);
    return this.categoriasService.remove(+id, req.user.userId);
  }
}
