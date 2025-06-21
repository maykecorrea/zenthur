import { Injectable, Logger, ConflictException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getPrismaClient } from '../prisma/prisma-client-helper';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);
  
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      const categorias = await prisma.categoria.findMany({
        where: {
          userId: userId 
        },
        orderBy: { 
          nome: 'asc' 
        }
      });
      
      return categorias;
    } catch (error) {
      this.logger.error(`Erro ao buscar categorias: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erro ao buscar categorias');
    }
  }

  async create(createCategoriaDto: any, userId: number) {
    try {
      const categoria = await this.prisma.categoria.create({
        data: {
          ...createCategoriaDto,
          userId: userId
        }
      });
      
      return categoria;
    } catch (error) {
      this.logger.error(`Erro ao criar categoria: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erro ao criar categoria');
    }
  }

  async remove(id: number, userId: number) {
    try {
      const categoria = await this.prisma.categoria.findFirst({
        where: { 
          id: id,
          userId: userId
        }
      });
      
      if (!categoria) {
        throw new ForbiddenException('Você não tem permissão para excluir esta categoria');
      }
      
      return this.prisma.categoria.delete({
        where: { id }
      });
    } catch (error) {
      this.logger.error(`Erro ao excluir categoria: ${error.message}`, error.stack);
      throw error;
    }
  }

  // ⭐ CORREÇÃO: Renomear método para coincidir com o controller
  async getCategoriasWithCount(userId: number) {
    try {
      this.logger.log(`Buscando categorias com contagem para usuário: ${userId}`);
      
      const categorias = await this.prisma.categoria.findMany({
        where: { userId },
        include: {
          _count: {
            select: { equipamentos: true }
          }
        },
        orderBy: { nome: 'asc' }
      });

      // Reformatar para o formato esperado pelo frontend
      const resultado = categorias.map(categoria => ({
        id: categoria.id,
        nome: categoria.nome,
        descricao: categoria.descricao || '',
        equipamentos_count: categoria._count.equipamentos, // IMPORTANTE: Este é o nome do campo esperado
        userId: categoria.userId,
        createdAt: categoria.createdAt,
        updatedAt: categoria.updatedAt
      }));

      this.logger.log(`Categorias com contagem encontradas: ${resultado.length}`);
      return resultado;
      
    } catch (error) {
      this.logger.error(`Erro ao buscar categorias com contagem: ${error.message}`);
      throw error;
    }
  }

  // ⭐ MANTER O MÉTODO ORIGINAL TAMBÉM (para compatibilidade)
  async findAllWithCount(userId: number) {
    try {
      this.logger.log(`Buscando categorias com contagem para usuário: ${userId}`);
      
      const categorias = await this.prisma.categoria.findMany({
        where: { userId },
        include: {
          _count: {
            select: { equipamentos: true }
          }
        },
        orderBy: { nome: 'asc' }
      });

      // ⭐ MAPEAR PARA O FORMATO ESPERADO
      const resultado = categorias.map(categoria => ({
        id: categoria.id,
        nome: categoria.nome,
        userId: categoria.userId,
        equipamentos_count: categoria._count.equipamentos, // ⭐ FORMATO CORRETO
        createdAt: categoria.createdAt,
        updatedAt: categoria.updatedAt
      }));

      this.logger.log(`Categorias com contagem encontradas: ${resultado.length}`);
      return resultado;
      
    } catch (error) {
      this.logger.error(`Erro ao buscar categorias com contagem: ${error.message}`);
      throw error;
    }
  }
}
