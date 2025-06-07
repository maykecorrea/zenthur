import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    
    // ⭐ CORRIGIR APENAS A ESTRUTURA DE RESPOSTA
    return { 
      success: true,  // ✅ Adicionar campo 'success'
      message: 'Login realizado com sucesso',  // ✅ Adicionar mensagem
      token: result.access_token,  // ✅ Manter 'token' (não 'access_token')
      user: {
        id: result.user.id,
        email: result.user.email,
        nome: result.user.nome,
        role: result.user.role,
        empresa: result.user.empresa
      }
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyToken() {
    return { valid: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return { user: req.user };
  }
  
  // Cadastrar novo usuário - apenas para admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role
      }
    };
  }
  
  // Listar todos os usuários - apenas para admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('users')
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 100) {
    const users = await this.authService.findAll(page, limit);
    return { users };
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req) {
    const user = await this.authService.findById(req.user.userId);
    
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    
    // Usar o método login que já existe
    const result = await this.authService.login({ 
      email: user.email, 
      password: '' // Como já está autenticado, o password não importa aqui
    });
    
    return {
      token: result.access_token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      }
    };
  }
}
