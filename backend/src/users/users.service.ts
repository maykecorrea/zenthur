import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      console.log('📋 [Service] Buscando todos os usuários...');
      
      const usuarios = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          empresa: true,
          telefone: true,
          createdAt: true,
          updatedAt: true
          // Não retornar senha
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      console.log(`✅ [Service] ${usuarios.length} usuários encontrados`);
      return usuarios;
    } catch (error) {
      console.error('❌ [Service] Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }
  }

  async findOne(id: number) {
    try {
      const usuario = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          empresa: true,
          telefone: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Erro ao buscar usuário');
    }
  }

  async create(userData: any) {
    try {
      console.log('➕ [Service] Criando usuário:', userData.email);

      // Validações
      if (!userData.email || !userData.password || !userData.nome) {
        throw new BadRequestException('Email, senha e nome são obrigatórios');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new BadRequestException('Formato de email inválido');
      }

      // Validar senha
      if (userData.password.length < 6) {
        throw new BadRequestException('Senha deve ter pelo menos 6 caracteres');
      }

      // Verificar se email já existe
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new BadRequestException('Email já está em uso');
      }

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Criar usuário
      const novoUsuario = await this.prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          nome: userData.nome,
          role: userData.role || 'user',
          empresa: userData.empresa || null,
          telefone: userData.telefone || null
        },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          empresa: true,
          telefone: true,
          createdAt: true
        }
      });

      console.log(`✅ [Service] Usuário criado: ${novoUsuario.email} (ID: ${novoUsuario.id})`);
      return {
        message: 'Usuário criado com sucesso',
        user: novoUsuario
      };
    } catch (error) {
      console.error('❌ [Service] Erro ao criar usuário:', error);
      
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      if (error.code === 'P2002') {
        throw new BadRequestException('Email já está em uso');
      }
      
      throw new Error('Erro interno ao criar usuário');
    }
  }

  async update(id: number, updateData: any) {
    try {
      console.log(`✏️ [Service] Atualizando usuário ID: ${id}`);

      // Verificar se usuário existe
      const usuarioExistente = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!usuarioExistente) {
        throw new NotFoundException('Usuário não encontrado');
      }

      // Preparar dados para atualização
      const dadosAtualizacao: any = {};
      
      if (updateData.email) dadosAtualizacao.email = updateData.email;
      if (updateData.nome) dadosAtualizacao.nome = updateData.nome;
      if (updateData.role) dadosAtualizacao.role = updateData.role;
      if (updateData.empresa !== undefined) dadosAtualizacao.empresa = updateData.empresa || null;
      if (updateData.telefone !== undefined) dadosAtualizacao.telefone = updateData.telefone || null;

      // Se senha foi fornecida, criptografar
      if (updateData.password && updateData.password.length > 0) {
        if (updateData.password.length < 6) {
          throw new BadRequestException('Senha deve ter pelo menos 6 caracteres');
        }
        
        dadosAtualizacao.password = await bcrypt.hash(updateData.password, 12);
      }

      // Atualizar usuário
      const usuarioAtualizado = await this.prisma.user.update({
        where: { id },
        data: dadosAtualizacao,
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          empresa: true,
          telefone: true,
          createdAt: true,
          updatedAt: true
        }
      });

      console.log(`✅ [Service] Usuário atualizado: ${usuarioAtualizado.email}`);
      return {
        message: 'Usuário atualizado com sucesso',
        user: usuarioAtualizado
      };
    } catch (error) {
      console.error('❌ [Service] Erro ao atualizar usuário:', error);
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      if (error.code === 'P2002') {
        throw new BadRequestException('Email já está em uso');
      }
      
      throw new Error('Erro interno ao atualizar usuário');
    }
  }

  async remove(id: number) {
    try {
      console.log(`🗑️ [Service] Removendo usuário ID: ${id}`);

      const user = await this.prisma.user.findUnique({ where: { id } });
      
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      
      // Verificar se é o último admin
      if (user.role === 'admin') {
        const adminCount = await this.prisma.user.count({
          where: { role: 'admin' }
        });
        
        if (adminCount <= 1) {
          throw new BadRequestException('Não é possível excluir o último administrador do sistema');
        }
      }
      
      await this.prisma.user.delete({ where: { id } });
      
      console.log(`✅ [Service] Usuário removido: ${user.email} (ID: ${id})`);
      return {
        message: 'Usuário excluído com sucesso',
        deletedUser: {
          id: user.id,
          email: user.email,
          nome: user.nome
        }
      };
    } catch (error) {
      console.error('❌ [Service] Erro ao remover usuário:', error);
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new Error('Erro interno ao remover usuário');
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}