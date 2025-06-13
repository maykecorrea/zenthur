import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}
  
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // IMPORTANTE: Incluir role no payload do JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // Estrutura da resposta
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        empresa: user.empresa,
        telefone: user.telefone,
        role: user.role  // Garantir que o role seja enviado
      }
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new BadRequestException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Criar o usuário
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        nome: createUserDto.nome,
        empresa: createUserDto.empresa,
        telefone: createUserDto.telefone,
        role: createUserDto.role || 'user' // Padrão é 'user' se não informado
      }
    });

    // Retornar usuário sem a senha
    const { password, ...result } = user;
    return result;
  }

  async findAll(page = 1, limit = 100) {
    const skip = (page - 1) * limit;
    
    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        nome: true,
        empresa: true,
        telefone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    return users;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async validateUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return null;
    }
    
    // Retornar usuário sem a senha
    const { password, ...result } = user;
    return result;
  }
}
