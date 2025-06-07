import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UsersService } from './users.service';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
    sub: number;
  };
}

@Controller('api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') // Todas as rotas só para admin
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    console.log('📋 [Controller] Listando usuários - Admin:', req.user.email);
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    console.log('🔍 [Controller] Buscando usuário ID:', id);
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: any, @Req() req: RequestWithUser) {
    console.log('➕ [Controller] Criando usuário:', createUserDto.email);
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any, @Req() req: RequestWithUser) {
    console.log('✏️ [Controller] Atualizando usuário ID:', id);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    console.log('🗑️ [Controller] Removendo usuário ID:', id);
    
    // Impedir que admin exclua a si mesmo
    if (+id === req.user.userId) {
      throw new Error('Você não pode excluir sua própria conta');
    }
    
    return this.usersService.remove(+id);
  }
}
