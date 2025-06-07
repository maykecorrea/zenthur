import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ManutencoesService {
  private readonly logger = new Logger(ManutencoesService.name);

  constructor(private prisma: PrismaService) {}

  // ⭐ CRIAR NOVA MANUTENÇÃO
  async create(createManutencaoDto: any, userId: number) {
    try {
      this.logger.log('➕ [ManutencoesService] Criando nova manutenção');
      console.log('📥 Dados recebidos:', createManutencaoDto);

      // ⭐ GERAR CÓDIGO TEMPORÁRIO
      const contadorManutencoes = await this.prisma.manutencao.count();
      const proximoNumero = contadorManutencoes + 1;
      const codigoTemporario = `MNT${String(proximoNumero).padStart(4, '0')}`;

      const dadosManutencao = {
        codigo: codigoTemporario, // ⭐ ADICIONAR CÓDIGO OBRIGATÓRIO
        titulo: createManutencaoDto.titulo,
        descricao: createManutencaoDto.descricao,
        equipamentoId: createManutencaoDto.equipamentoId ? parseInt(createManutencaoDto.equipamentoId) : null,
        solicitante: createManutencaoDto.solicitante || null,
        responsavel: createManutencaoDto.responsavel || null,
        status: createManutencaoDto.status || 'recebida',
        criticidade: createManutencaoDto.criticidade || 'baixa',
        tipo: createManutencaoDto.tipo || 'preventiva',
        observacoes: createManutencaoDto.observacoes || null,
        dataHora: createManutencaoDto.dataHora ? new Date(createManutencaoDto.dataHora) : new Date(),
        dataProximaManutencao: createManutencaoDto.dataProximaManutencao ? new Date(createManutencaoDto.dataProximaManutencao) : null,
        frequenciaDias: createManutencaoDto.frequenciaDias ? parseInt(createManutencaoDto.frequenciaDias) : null,
        userId: userId
      };

      const novaManutencao = await this.prisma.manutencao.create({
        data: dadosManutencao,
        include: {
          equipamento: true,
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        }
      });

      this.logger.log(`✅ [ManutencoesService] Manutenção criada com sucesso: ${novaManutencao.id}`);
      return novaManutencao;

    } catch (error) {
      this.logger.error(`❌ [ManutencoesService] Erro ao criar manutenção: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao criar manutenção');
    }
  }

  // ⭐ BUSCAR TODAS AS MANUTENÇÕES
  async findAll(userId: number, userRole: string) {
    try {
      this.logger.log(`🔍 [ManutencoesService] Buscando manutenções para usuário ${userId} (${userRole})`);

      const whereClause = userRole === 'admin' ? {} : { userId: userId };

      const manutencoes = await this.prisma.manutencao.findMany({
        where: whereClause,
        include: {
          equipamento: {
            select: {
              id: true,
              nome: true,
              tag: true,
              area: true,
              localizacao: true
            }
          },
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          },
          historicoTecnicos: { // ✅ NOME CORRETO DA RELAÇÃO
            where: { ativo: true },
            select: {
              id: true,
              tecnicoNome: true, // ✅ CAMPO CORRETO
              dataAtribuicao: true,
              observacoes: true
            }
          }
        },
        orderBy: {
          dataHora: 'desc'
        }
      });

      this.logger.log(`✅ [ManutencoesService] ${manutencoes.length} manutenções encontradas`);

      return {
        manutencoes,
        total: manutencoes.length,
        page: 1,
        totalPages: 1
      };

    } catch (error) {
      this.logger.error(`❌ [ManutencoesService] Erro ao buscar manutenções: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenções');
    }
  }

  // ⭐ BUSCAR MANUTENÇÃO POR ID
  async findOne(id: number, userId: number, userRole: string) {
    try {
      this.logger.log(`🔍 [ManutencoesService] Buscando manutenção ${id}`);

      const whereClause = userRole === 'admin' ? { id } : { id, userId };

      const manutencao = await this.prisma.manutencao.findFirst({
        where: whereClause,
        include: {
          equipamento: true,
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          },
          historicoTecnicos: { // ⭐ USAR NOME CORRETO DO SCHEMA
            orderBy: { dataAtribuicao: 'desc' }
          }
        }
      });

      if (!manutencao) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      this.logger.log(`✅ [ManutencoesService] Manutenção ${id} encontrada`);
      return manutencao;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`❌ [ManutencoesService] Erro ao buscar manutenção ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenção');
    }
  }

  // ⭐ ATUALIZAR MANUTENÇÃO
  async update(id: number, updateManutencaoDto: any, userId: number, userRole: string) {
    try {
      this.logger.log(`🔄 [ManutencoesService] Atualizando manutenção ${id}`);
      console.log('📥 Dados para atualização:', updateManutencaoDto);

      // Verificar se existe
      const whereClause = userRole === 'admin' ? { id } : { id, userId };
      const manutencaoExistente = await this.prisma.manutencao.findFirst({
        where: whereClause
      });

      if (!manutencaoExistente) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      // Preparar dados para atualização
      const dadosAtualizacao: any = {};

      if (updateManutencaoDto.titulo !== undefined) {
        dadosAtualizacao.titulo = updateManutencaoDto.titulo;
      }
      if (updateManutencaoDto.descricao !== undefined) {
        dadosAtualizacao.descricao = updateManutencaoDto.descricao;
      }
      if (updateManutencaoDto.status !== undefined) {
        dadosAtualizacao.status = updateManutencaoDto.status;
      }
      if (updateManutencaoDto.criticidade !== undefined) {
        dadosAtualizacao.criticidade = updateManutencaoDto.criticidade;
      }
      if (updateManutencaoDto.tipo !== undefined) {
        dadosAtualizacao.tipo = updateManutencaoDto.tipo;
      }
      if (updateManutencaoDto.solicitante !== undefined) {
        dadosAtualizacao.solicitante = updateManutencaoDto.solicitante;
      }
      if (updateManutencaoDto.responsavel !== undefined) {
        dadosAtualizacao.responsavel = updateManutencaoDto.responsavel;
      }
      if (updateManutencaoDto.observacoes !== undefined) {
        dadosAtualizacao.observacoes = updateManutencaoDto.observacoes;
      }
      if (updateManutencaoDto.equipamentoId !== undefined) {
        dadosAtualizacao.equipamentoId = updateManutencaoDto.equipamentoId ? parseInt(updateManutencaoDto.equipamentoId) : null;
      }
      if (updateManutencaoDto.dataProximaManutencao !== undefined) {
        dadosAtualizacao.dataProximaManutencao = updateManutencaoDto.dataProximaManutencao ? new Date(updateManutencaoDto.dataProximaManutencao) : null;
      }
      if (updateManutencaoDto.frequenciaDias !== undefined) {
        dadosAtualizacao.frequenciaDias = updateManutencaoDto.frequenciaDias ? parseInt(updateManutencaoDto.frequenciaDias) : null;
      }

      console.log('📤 Dados finais para atualização:', dadosAtualizacao);

      const manutencaoAtualizada = await this.prisma.manutencao.update({
        where: { id },
        data: dadosAtualizacao,
        include: {
          equipamento: true,
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        }
      });

      this.logger.log(`✅ [ManutencoesService] Manutenção ${id} atualizada com sucesso`);
      return manutencaoAtualizada;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`❌ [ManutencoesService] Erro ao atualizar manutenção ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao atualizar manutenção');
    }
  }

  // ⭐ REMOVER MANUTENÇÃO
  async remove(id: number, userId: number, userRole: string) {
    try {
      this.logger.log(`🗑️ [ManutencoesService] Removendo manutenção ${id}`);

      const whereClause = userRole === 'admin' ? { id } : { id, userId };
      const manutencao = await this.prisma.manutencao.findFirst({
        where: whereClause
      });

      if (!manutencao) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      await this.prisma.manutencao.delete({
        where: { id }
      });

      this.logger.log(`✅ [ManutencoesService] Manutenção ${id} removida com sucesso`);
      return { message: 'Manutenção removida com sucesso' };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`❌ [ManutencoesService] Erro ao remover manutenção ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao remover manutenção');
    }
  }

  // ⭐ ATUALIZAR STATUS
  async updateStatus(id: number, status: string, userId: number, userRole: string) {
    try {
      this.logger.log(`🔄 [ManutencoesService] Atualizando status da manutenção ${id} para ${status}`);

      const whereClause = userRole === 'admin' ? { id } : { id, userId };
      const manutencao = await this.prisma.manutencao.findFirst({
        where: whereClause
      });

      if (!manutencao) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      const statusValidos = ['recebida', 'analise', 'execucao', 'concluida', 'cancelada', 'arquivada'];
      if (!statusValidos.includes(status)) {
        throw new Error(`Status inválido: ${status}`);
      }

      const manutencaoAtualizada = await this.prisma.manutencao.update({
        where: { id },
        data: { status },
        include: {
          equipamento: true,
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        }
      });

      this.logger.log(`✅ [ManutencoesService] Status da manutenção ${id} atualizado para ${status}`);
      return manutencaoAtualizada;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`❌ [ManutencoesService] Erro ao atualizar status: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao atualizar status');
    }
  }

  // ⭐ ARQUIVAR MANUTENÇÃO
  async arquivar(id: number, userId: number, userRole: string) {
    try {
      this.logger.log(`📦 [ManutencoesService] Arquivando manutenção ${id}`);

      const whereClause = userRole === 'admin' ? { id } : { id, userId };
      const manutencao = await this.prisma.manutencao.findFirst({
        where: whereClause
      });

      if (!manutencao) {
        throw new NotFoundException(`Manutenção com ID ${id} não encontrada`);
      }

      const manutencaoArquivada = await this.prisma.manutencao.update({
        where: { id },
        data: { status: 'arquivada' }
      });

      this.logger.log(`✅ [ManutencoesService] Manutenção ${id} arquivada com sucesso`);
      return { success: true, message: 'Manutenção arquivada com sucesso', data: manutencaoArquivada };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`❌ [ManutencoesService] Erro ao arquivar: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao arquivar manutenção');
    }
  }

  // ⭐ BUSCAR POR EQUIPAMENTO
  async findByEquipamento(equipamentoId: number, includeArchived: boolean = false) {
    try {
      this.logger.log(`🔍 [ManutencoesService] Buscando manutenções do equipamento ${equipamentoId}`);

      const whereClause: any = { equipamentoId };
      if (!includeArchived) {
        whereClause.status = { not: 'arquivada' };
      }

      const manutencoes = await this.prisma.manutencao.findMany({
        where: whereClause,
        include: {
          equipamento: true,
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        },
        orderBy: {
          dataHora: 'desc'
        }
      });

      this.logger.log(`✅ [ManutencoesService] ${manutencoes.length} manutenções encontradas para equipamento ${equipamentoId}`);
      return manutencoes;

    } catch (error) {
      this.logger.error(`❌ [ManutencoesService] Erro ao buscar por equipamento: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar manutenções do equipamento');
    }
  }

  // ⭐ BUSCAR HISTÓRICO
  async findHistorico(userId: number, userRole: string) {
    try {
      this.logger.log(`📚 [ManutencoesService] Buscando histórico para usuário ${userId} (${userRole})`);

      const whereClause = userRole === 'admin' ? {} : { userId: userId };

      const manutencoes = await this.prisma.manutencao.findMany({
        where: whereClause,
        include: {
          equipamento: {
            select: {
              id: true,
              nome: true,
              tag: true,
              area: true
            }
          },
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        },
        orderBy: {
          dataHora: 'desc'
        }
      });

      this.logger.log(`✅ [ManutencoesService] ${manutencoes.length} registros de histórico encontrados`);
      return manutencoes;

    } catch (error) {
      this.logger.error(`❌ Erro ao buscar histórico: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar histórico');
    }
  }

  // ⭐ ADICIONAR TÉCNICO
  async adicionarTecnico(manutencaoId: number, dadosTecnico: any, userId: number) {
    try {
      console.log('➕ [ManutencoesService] Adicionando técnico:', dadosTecnico);
      
      // ⭐ DESATIVAR TÉCNICO ANTERIOR (SE HOUVER)
      await this.prisma.manutencaoTecnico.updateMany({
        where: {
          manutencaoId: manutencaoId,
          ativo: true
        },
        data: {
          ativo: false,
          dataFinalizacao: new Date()
        }
      });
      
      // ⭐ CRIAR APENAS COM CAMPOS BÁSICOS PRIMEIRO
      const novoTecnico = await this.prisma.manutencaoTecnico.create({
        data: {
          manutencaoId: manutencaoId,
          tecnicoNome: dadosTecnico.tecnicoNome,
          observacoes: dadosTecnico.observacoes || null,
          statusAnterior: 'nova_atribuicao',
          statusAtual: 'em_andamento',
          ativo: true
          // ⭐ REMOVER TEMPORARIAMENTE OS CAMPOS PROBLEMÁTICOS
        }
      });
      
      // ⭐ DEPOIS ATUALIZAR COM OS CAMPOS EXTRAS (SE EXISTIREM)
      try {
        if (dadosTecnico.relatorioTecnico || dadosTecnico.horasTrabalho || dadosTecnico.materiaisUsados) {
          const camposExtras: any = {};
          
          if (dadosTecnico.relatorioTecnico) {
            camposExtras.relatorioTecnico = dadosTecnico.relatorioTecnico;
          }
          if (dadosTecnico.horasTrabalho) {
            camposExtras.horasTrabalho = parseFloat(dadosTecnico.horasTrabalho);
          }
          if (dadosTecnico.materiaisUsados) {
            camposExtras.materiaisUsados = dadosTecnico.materiaisUsados;
          }
          
          await this.prisma.manutencaoTecnico.update({
            where: { id: novoTecnico.id },
            data: camposExtras
          });
        }
      } catch (updateError) {
        console.warn('⚠️ Erro ao atualizar campos extras, mas técnico foi criado:', updateError);
      }
      
      console.log('✅ Técnico adicionado com sucesso:', novoTecnico);
      return novoTecnico;
      
    } catch (error) {
      console.error('❌ [ManutencoesService] Erro ao adicionar técnico:', error);
      throw new InternalServerErrorException('Falha ao adicionar técnico');
    }
  }

  // ⭐ BUSCAR HISTÓRICO DE TÉCNICOS
  async findHistoricoTecnicos(manutencaoId: number, userId: number) {
    try {
      console.log('📋 [ManutencoesService] Buscando histórico de técnicos para manutenção:', manutencaoId);
      
      const tecnicos = await this.prisma.manutencaoTecnico.findMany({
        where: {
          manutencaoId: manutencaoId
        },
        orderBy: {
          dataAtribuicao: 'desc'
        }
      });
      
      console.log(`✅ [ManutencoesService] ${tecnicos.length} registros de técnicos encontrados`);
      return tecnicos;
      
    } catch (error) {
      console.error('❌ [ManutencoesService] Erro ao buscar histórico de técnicos:', error);
      throw new InternalServerErrorException('Falha ao buscar histórico de técnicos');
    }
  }
}