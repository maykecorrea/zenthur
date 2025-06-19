import { Injectable, Logger, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManutencaoDto, UpdateManutencaoDto } from './dto';
import { getPrismaClient } from '../prisma/prisma-client-helper';

@Injectable()
export class ManutencoesService {
  private readonly logger = new Logger(ManutencoesService.name);

  constructor(private prisma: PrismaService) {}

  async create(createManutencaoDto: CreateManutencaoDto, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Verificar se o equipamento existe e pertence a este usuário
      const equipamento = await prisma.equipamento.findFirst({
        where: { 
          id: createManutencaoDto.equipamentoId,
          userId: userId
        },
      });
      
      if (!equipamento) {
        throw new ForbiddenException('Equipamento não encontrado ou você não tem permissão para acessá-lo');
      }
      
      // Gerar código único para a manutenção (ex: TO-5200-035)
      const prefix = 'TO';
      const count = await prisma.manutencao.count() + 1;
      const codigo = `${prefix}-${Math.floor(Math.random() * 10000)}-${String(count).padStart(3, '0')}`;
      
      // Combinar data e hora em um único timestamp
      const dataHora = new Date(`${createManutencaoDto.data}T${createManutencaoDto.hora}`);
      
      // Criar a manutenção
      const manutencao = await prisma.manutencao.create({
        data: {
          titulo: createManutencaoDto.titulo,
          descricao: createManutencaoDto.descricao,
          tipo: createManutencaoDto.tipo,
          dataHora: dataHora,
          criticidade: createManutencaoDto.criticidade,
          equipamentoId: createManutencaoDto.equipamentoId,
          userId: userId,
          codigo,
          status: 'recebida'
        },
        include: {
          equipamento: true
        }
      });
      
      return manutencao;
    } catch (error) {
      this.logger.error(`Erro ao criar manutenção: ${error.message}`, error.stack);
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao criar manutenção');
    }
  }

  async findAll(userId: number, role: string) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Admin vê todas as manutenções, usuário normal vê só as suas
      const where = role === 'admin' ? {} : { userId };
      
      // Buscar equipamentos do usuário primeiro
      const equipamentos = await prisma.equipamento.findMany({
        where: { userId: userId },
        select: { id: true }
      });
      
      const equipamentoIds = equipamentos.map(e => e.id);
      
      // Buscar as manutenções relacionadas a esses equipamentos
      return prisma.manutencao.findMany({
        where: {
          equipamentoId: { in: equipamentoIds }
        },
        orderBy: { 
          createdAt: 'desc'
        },
        include: {
          equipamento: true,
          user: {
            select: {
              nome: true,
              email: true,
              empresa: true
            }
          }
        }
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar manutenções: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenções');
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      const manutencao = await prisma.manutencao.findUnique({
        where: { id },
        include: { equipamento: true }
      });
      
      if (!manutencao) {
        throw new NotFoundException('Manutenção não encontrada');
      }
      
      // Verificar se a manutenção está relacionada a um equipamento do usuário
      const equipamento = await prisma.equipamento.findFirst({
        where: {
          id: manutencao.equipamentoId,
          userId: userId
        }
      });
      
      if (!equipamento) {
        throw new ForbiddenException('Você não tem permissão para acessar esta manutenção');
      }
      
      return manutencao;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(`Erro ao buscar manutenção: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenção');
    }
  }

  async update(id: number, updateManutencaoDto: UpdateManutencaoDto, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Verificar se a manutenção existe
      const existingManutencao = await prisma.manutencao.findUnique({
        where: { id },
        include: { historicoTecnicos: true }
      });
      
      if (!existingManutencao) {
        throw new NotFoundException('Manutenção não encontrada');
      }
      
      // Verificar permissão
      const equipamento = await prisma.equipamento.findFirst({
        where: {
          id: existingManutencao.equipamentoId,
          userId: userId
        }
      });
      
      if (!equipamento) {
        throw new ForbiddenException('Você não tem permissão para atualizar esta manutenção');
      }
      
      // Preparar dados para atualização
      const updateData: any = { ...updateManutencaoDto };
      
      // Combinar data e hora se fornecidas
      if (updateManutencaoDto.data && updateManutencaoDto.hora) {
        updateData.dataHora = new Date(`${updateManutencaoDto.data}T${updateManutencaoDto.hora}`);
        delete updateData.data;
        delete updateData.hora;
      }
      
      // Controlar datas baseadas no status
      if (updateManutencaoDto.status) {
        if (updateManutencaoDto.status === 'execucao' && existingManutencao.status !== 'execucao') {
          updateData.dataInicioExecucao = new Date();
        }
        if (updateManutencaoDto.status === 'concluida' && existingManutencao.status !== 'concluida') {
          updateData.dataConclusao = new Date();
          
          // Calcular tempo de execução se tiver data de início
          if (existingManutencao.dataInicioExecucao) {
            const tempoMs = Date.now() - existingManutencao.dataInicioExecucao.getTime();
            updateData.tempoExecucao = Math.floor(tempoMs / (1000 * 60)); // em minutos
          }
        }
      }
      
      // Se responsável foi alterado, salvar no histórico
      if (updateManutencaoDto.responsavel && updateManutencaoDto.responsavel !== existingManutencao.responsavel) {
        // Finalizar técnico anterior se existir
        if (existingManutencao.responsavel) {
          await prisma.manutencaoTecnico.updateMany({
            where: {
              manutencaoId: id,
              ativo: true
            },
            data: {
              ativo: false,
              dataFinalizacao: new Date(),
              statusAtual: updateManutencaoDto.status || existingManutencao.status
            }
          });
        }
        
        // Criar novo registro de técnico
        await prisma.manutencaoTecnico.create({
          data: {
            manutencaoId: id,
            nomeTenico: updateManutencaoDto.responsavel,
            statusAnterior: existingManutencao.status,
            statusAtual: updateManutencaoDto.status || existingManutencao.status,
            observacoes: updateManutencaoDto.observacoes,
            ativo: true
          }
        });
      }
      
      // Atualizar manutenção
      return prisma.manutencao.update({
        where: { id },
        data: updateData,
        include: {
          equipamento: true,
          historicoTecnicos: {
            orderBy: { dataAtribuicao: 'desc' }
          }
        }
      });
      
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(`Erro ao atualizar manutenção: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao atualizar manutenção');
    }
  }

  async remove(id: number, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Verificar se a manutenção existe
      const manutencao = await prisma.manutencao.findUnique({
        where: { id }
      });
      
      if (!manutencao) {
        throw new NotFoundException('Manutenção não encontrada');
      }
      
      // Verificar se o equipamento pertence ao usuário
      const equipamento = await prisma.equipamento.findFirst({
        where: {
          id: manutencao.equipamentoId,
          userId: userId
        }
      });
      
      if (!equipamento) {
        throw new ForbiddenException('Você não tem permissão para excluir esta manutenção');
      }
      
      // Excluir a manutenção
      return prisma.manutencao.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(`Erro ao excluir manutenção: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao excluir manutenção');
    }
  }

  async findByTipoAndStatus(tipo: string, status: string, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Buscar equipamentos do usuário primeiro
      const equipamentos = await prisma.equipamento.findMany({
        where: { userId: userId },
        select: { id: true }
      });
      
      const equipamentoIds = equipamentos.map(e => e.id);
      
      // Buscar manutenções com filtros
      return prisma.manutencao.findMany({
        where: {
          equipamentoId: { in: equipamentoIds },
          tipo: tipo,
          status: status
        },
        orderBy: { 
          dataHora: 'desc' 
        },
        include: {
          equipamento: true
        }
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar manutenções por tipo e status: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenções');
    }
  }

  async updateStatus(id: number, status: string, userId: number, role: string) {
    try {
      // Verificar se a manutenção existe
      const manutencao = await this.prisma.manutencao.findUnique({
        where: { id }
      });

      if (!manutencao) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      // Verificar permissão (apenas o próprio usuário ou admin)
      if (manutencao.userId !== userId && role !== 'admin') {
        throw new ForbiddenException('Você não tem permissão para modificar esta manutenção');
      }

      // Validar status
      const statusesValidos = ['recebida', 'analise', 'execucao', 'concluida'];
      if (!statusesValidos.includes(status)) {
        throw new Error(`Status inválido. Use um dos seguintes: ${statusesValidos.join(', ')}`);
      }

      // Atualizar status
      return this.prisma.manutencao.update({
        where: { id },
        data: { status },
        include: {
          equipamento: true
        }
      });
    } catch (error) {
      this.logger.error(`Erro ao atualizar status: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao atualizar status da manutenção');
    }
  }

  async arquivarManutencao(id: number) {
    // Verificar se a manutenção existe
    const manutencao = await this.prisma.manutencao.findUnique({
      where: { id }
    });

    if (!manutencao) {
      throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
    }

    // Atualizar o status para "arquivada"
    return this.prisma.manutencao.update({
      where: { id },
      data: {
        status: 'arquivada',
        updatedAt: new Date()
      }
    });
  }

  async findByEquipamento(equipamentoId: number, includeArchived: boolean = false) {
    // Criar condição de busca
    const whereCondition: any = { equipamentoId };
    
    // Se não incluir arquivadas, filtrar apenas as ativas
    if (!includeArchived) {
      whereCondition.status = { not: 'arquivada' };
    }

    return this.prisma.manutencao.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            empresa: true,
            telefone: true
          }
        },
        equipamento: {
          select: {
            id: true,
            tag: true,
            nome: true,
            area: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findHistoricoTecnicos(id: number, userId: number) {
    try {
      const prisma = getPrismaClient(this.prisma);
      
      // Verificar permissão
      const manutencao = await prisma.manutencao.findUnique({
        where: { id },
        include: { equipamento: true }
      });
      
      if (!manutencao) {
        throw new NotFoundException('Manutenção não encontrada');
      }
      
      const equipamento = await prisma.equipamento.findFirst({
        where: {
          id: manutencao.equipamentoId,
          userId: userId
        }
      });
      
      if (!equipamento) {
        throw new ForbiddenException('Sem permissão para acessar histórico');
      }
      
      // Buscar histórico de técnicos
      return prisma.manutencaoTecnico.findMany({
        where: { manutencaoId: id },
        include: {
          tecnico: {
            select: {
              nome: true,
              email: true
            }
          }
        },
        orderBy: { dataAtribuicao: 'desc' }
      });
      
    } catch (error) {
      this.logger.error(`Erro ao buscar histórico de técnicos: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar histórico');
    }
  }
}