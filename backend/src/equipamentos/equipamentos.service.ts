import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

@Injectable()
export class EquipamentosService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    try {
      const equipamentos = await this.prisma.equipamento.findMany({
        where: { userId },
        include: {
          categoria: true,
          _count: {
            select: {
              manutencoes: true,
              documentos: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return equipamentos;
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
      throw error;
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const equipamento = await this.prisma.equipamento.findFirst({
        where: { 
          id,
          userId 
        },
        include: {
          categoria: true,
          manutencoes: {
            orderBy: { createdAt: 'desc' },
            take: 5
          },
          documentos: true
        }
      });

      if (!equipamento) {
        throw new NotFoundException('Equipamento não encontrado');
      }

      return equipamento;
    } catch (error) {
      console.error('Erro ao buscar equipamento:', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      console.log('🔧 Service - Dados recebidos para criação:', data);

      // ⭐ VERIFICAR SE A CATEGORIA EXISTE (se foi fornecida)
      if (data.categoriaId) {
        const categoriaExiste = await this.prisma.categoria.findFirst({
          where: { 
            id: data.categoriaId,
            userId: data.userId
          }
        });

        if (!categoriaExiste) {
          console.log('❌ Categoria não encontrada:', data.categoriaId);
          throw new Error('Categoria selecionada não existe ou não pertence ao usuário');
        }
      }

      // ⭐ CRIAR EQUIPAMENTO
      const equipamento = await this.prisma.equipamento.create({
        data,
        include: {
          categoria: true,
          user: {
            select: {
              id: true,
              email: true,
              nome: true
            }
          }
        }
      });

      console.log('✅ Service - Equipamento criado:', equipamento.id);
      return equipamento;
    } catch (error) {
      console.log('❌ Service - Erro ao criar equipamento:', error.message);
      console.log('🔍 Service - Stack trace:', error.stack);
      throw error;
    }
  }

  async update(id: number, data: any, userId: number) {
    try {
      // Verificar se o equipamento existe e pertence ao usuário
      const equipamentoExiste = await this.prisma.equipamento.findFirst({
        where: { id, userId }
      });

      if (!equipamentoExiste) {
        throw new NotFoundException('Equipamento não encontrado ou sem permissão');
      }

      // Verificar categoria se fornecida
      if (data.categoriaId) {
        const categoriaExiste = await this.prisma.categoria.findFirst({
          where: { 
            id: data.categoriaId,
            userId
          }
        });

        if (!categoriaExiste) {
          throw new Error('Categoria selecionada não existe');
        }
      }

      const equipamento = await this.prisma.equipamento.update({
        where: { id },
        data,
        include: {
          categoria: true
        }
      });

      return equipamento;
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error);
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      const equipamento = await this.prisma.equipamento.findFirst({
        where: { id, userId }
      });

      if (!equipamento) {
        throw new NotFoundException('Equipamento não encontrado ou sem permissão');
      }

      return this.prisma.equipamento.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Erro ao excluir equipamento:', error);
      throw error;
    }
  }
}
