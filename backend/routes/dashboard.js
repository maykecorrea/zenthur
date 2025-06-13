const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// Estatísticas do dashboard
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalEquipamentos,
      totalManutencoes,
      manutencoesAbertas,
      totalCategorias,
      totalDocumentos
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
      prisma.documento ? prisma.documento.count() : 0
    ]);

    res.json({
      totalEquipamentos,
      totalManutencoes,
      manutencoesAbertas,
      totalCategorias,
      totalDocumentos
    });

  } catch (error) {
    console.error('Erro nas estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;