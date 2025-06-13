const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

console.log('✅ [Equipamentos Routes] Configuradas');

// Middleware de log
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// ✅ LISTAR EQUIPAMENTOS
router.get('/', logRequest, authMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /equipamentos] Buscando equipamentos...');
    console.log('👤 [GET /equipamentos] Usuário:', req.user.email, '(Role:', req.user.role, ')');
    
    let whereClause = {};
    
    if (req.user.role !== 'admin') {
      whereClause.userId = req.user.id;
      console.log('👤 [GET /equipamentos] Usuário normal, filtrando por userId:', req.user.id);
    } else {
      console.log('👑 [GET /equipamentos] Usuário é admin, mostrando todos os equipamentos');
    }

    const equipamentos = await prisma.equipamento.findMany({
      where: whereClause,
      include: {
        categoria: {
          select: { id: true, nome: true }
        },
        user: {
          select: { id: true, email: true, nome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`✅ [GET /equipamentos] ${equipamentos.length} equipamentos encontrados`);

    res.json({
      success: true,
      data: equipamentos,
      total: equipamentos.length
    });
  } catch (error) {
    console.error('❌ [GET /equipamentos] Erro:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// ✅ CRIAR EQUIPAMENTO
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('📝 [POST /equipamentos] Criando equipamento...');
    console.log('📦 [POST /equipamentos] Dados:', req.body);
    
    const { nome, tag, fabricante, modelo, numeroSerie, localizacao, unidade, disciplina, area, categoriaId } = req.body;
    
    if (!nome) {
      return res.status(400).json({
        success: false,
        message: 'Nome do equipamento é obrigatório'
      });
    }

    const equipamento = await prisma.equipamento.create({
      data: {
        nome,
        tag,
        fabricante,
        modelo,
        numeroSerie,
        localizacao,
        unidade,
        disciplina,
        area,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        userId: req.user.id
      },
      include: {
        categoria: true,
        user: {
          select: { id: true, email: true, nome: true }
        }
      }
    });

    console.log('✅ [POST /equipamentos] Equipamento criado:', equipamento.id);
    
    res.status(201).json({
      success: true,
      message: 'Equipamento criado com sucesso',
      data: equipamento
    });
    
  } catch (error) {
    console.error('❌ [POST /equipamentos] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

module.exports = router;
