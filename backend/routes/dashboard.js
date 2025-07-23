const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// Função auxiliar para calcular a data N dias no futuro
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Estatísticas do dashboard
// ⭐ Rota alterada de '/stats' para '/estatisticas' para corresponder ao frontend
router.get('/estatisticas', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas a data

    const sevenDaysFromNow = addDays(today, 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999); // Define para o fim do dia

    const [
      totalEquipamentos,
      totalManutencoes,
      manutencoesAbertas,
      totalCategorias,
      totalDocumentos,
      manutencoesVencidas,
      manutencoesProximasVencimento
    ] = await Promise.all([
      prisma.equipamento.count(),
      prisma.manutencao.count(),
      prisma.manutencao.count({
        where: {
          status: {
            in: ['recebida', 'analise', 'execucao']
          }
        }
      }),
      prisma.categoria.count(),
      // Verifica se a model Documento existe antes de tentar contar
      prisma.documento ? prisma.documento.count() : 0,
      
      // ⭐ Lógica para contar manutenções vencidas:
      // - dataPrevisao menor que a data de hoje
      // - status não está em 'concluida' ou 'cancelada'
      prisma.manutencao.count({
        where: {
          dataPrevisao: {
            lt: today
          },
          status: {
            notIn: ['concluida', 'cancelada'] 
          }
        }
      }),
      
      // ⭐ Lógica para contar manutenções próximas do vencimento:
      // - dataPrevisao entre hoje e os próximos 7 dias
      // - status não está em 'concluida' ou 'cancelada'
      prisma.manutencao.count({
        where: {
          dataPrevisao: {
            gte: today,
            lte: sevenDaysFromNow
          },
          status: {
            notIn: ['concluida', 'cancelada']
          }
        }
      })
    ]);

    res.json({
      totalEquipamentos,
      totalManutencoes,
      manutencoesAbertas,
      totalCategorias,
      totalDocumentos,
      // ⭐ Incluindo as novas contagens na resposta
      vencidas: manutencoesVencidas,
      proximasVencimento: manutencoesProximasVencimento
    });

  } catch (error) {
    console.error('Erro nas estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
