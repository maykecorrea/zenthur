import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface EstatisticasResponse {
  totalAtivos: number;
  proximasVencimento: number;
  vencidas: number;
  crescimentoMensal: number;
  statusData: Array<{
    name: string;
    count: number;
    percentage: number;
    bgColor: string;
    textColor: string;
  }>;
}

export interface ChartData {
  month: string;
  value: number;
}

export interface AtividadeRecente {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  tipo: string;
}

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private prisma: PrismaService) {}

  async getEstatisticas(userId: number): Promise<EstatisticasResponse> {
    this.logger.log(`Buscando estatísticas para usuário: ${userId}`);
    
    try {
      // Obter contagem de equipamentos
      const equipamentosCount = await this.prisma.equipamento.count({
        where: { userId }
      });
      
      // Obter manutenções próximas do vencimento (próximos 7 dias)
      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() + 7);
      
      const proximasVencimento = await this.prisma.manutencao.count({
        where: {
          userId,
          dataVencimento: {
            gte: new Date(),
            lte: dataLimite
          },
          status: { not: 'concluida' }
        }
      });
      
      // Obter manutenções vencidas
      const vencidas = await this.prisma.manutencao.count({
        where: {
          userId,
          dataVencimento: { lt: new Date() },
          status: { not: 'concluida' }
        }
      });
      
      // Calcular crescimento mensal (simulado)
      const crescimentoMensal = 8; // Em percentual
      
      // Dados para o gráfico de status
      const statusCounts = await this.prisma.manutencao.groupBy({
        by: ['status'],
        _count: true,
        where: { userId }
      });
      
      const totalManutencoes = statusCounts.reduce(
        (acc, curr) => acc + curr._count, 0
      );
      
      const statusData = [
        {
          name: 'Concluídas',
          count: statusCounts.find(s => s.status === 'concluida')?._count || 0,
          percentage: 0, // Será calculado abaixo
          bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
          textColor: 'text-green-600'
        },
        {
          name: 'Em execução',
          count: statusCounts.find(s => s.status === 'execucao')?._count || 0,
          percentage: 0,
          bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
          textColor: 'text-blue-600'
        },
        {
          name: 'Em análise',
          count: statusCounts.find(s => s.status === 'analise')?._count || 0,
          percentage: 0,
          bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          textColor: 'text-yellow-600'
        },
        {
          name: 'Recebidas',
          count: statusCounts.find(s => s.status === 'recebida')?._count || 0,
          percentage: 0,
          bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
          textColor: 'text-purple-600'
        }
      ];
      
      // Calcular percentuais
      statusData.forEach(item => {
        item.percentage = totalManutencoes > 0 
          ? Math.round((item.count / totalManutencoes) * 100) 
          : 0;
      });
      
      return {
        totalAtivos: equipamentosCount,
        proximasVencimento,
        vencidas,
        crescimentoMensal,
        statusData
      };
    } catch (error) {
      this.logger.error(`Erro ao buscar estatísticas: ${error.message}`);
      throw error;
    }
  }

  async getTendencias(userId: number): Promise<ChartData[]> {
    this.logger.log(`Buscando tendências para usuário: ${userId}`);
    
    try {
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                     'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const mesAtual = new Date().getMonth();
      
      // Simulação de dados de tendência
      // Em uma implementação real, buscaríamos no banco de dados
      return [
        { month: meses[(mesAtual + 10) % 12], value: 15 },
        { month: meses[(mesAtual + 11) % 12], value: 22 },
        { month: meses[mesAtual], value: 30 },
        { month: meses[(mesAtual + 1) % 12], value: 27 },
        { month: meses[(mesAtual + 2) % 12], value: 32 }
      ];
    } catch (error) {
      this.logger.error(`Erro ao buscar tendências: ${error.message}`);
      throw error;
    }
  }

  async getAtividadeRecente(userId: number): Promise<AtividadeRecente[]> {
    this.logger.log(`Buscando atividade recente para usuário: ${userId}`);
    
    try {
      // Buscar as últimas manutenções criadas ou atualizadas
      const manutencoes = await this.prisma.manutencao.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          titulo: true,
          descricao: true,
          updatedAt: true,
          status: true
        }
      });
      
      // Mapear para o formato esperado
      return manutencoes.map(m => ({
        id: m.id,
        titulo: m.titulo,
        descricao: `Manutenção ${m.status}`,
        data: m.updatedAt.toISOString(),
        tipo: 'manutencao'
      }));
    } catch (error) {
      this.logger.error(`Erro ao buscar atividade recente: ${error.message}`);
      throw error;
    }
  }
}
