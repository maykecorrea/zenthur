const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// Listar categorias com contagem de equipamentos
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('📂 [GET /categorias] Usuário:', req.user.email);
    
    const categorias = await prisma.categoria.findMany({
      where: { userId: req.user.id },
      include: {
        _count: {
          select: { equipamentos: true }
        }
      },
      orderBy: { nome: 'asc' }
    });

    const resultado = categorias.map(categoria => ({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao || null,
      userId: categoria.userId,
      equipamentos_count: categoria._count.equipamentos,
      createdAt: categoria.createdAt,
      updatedAt: categoria.updatedAt
    }));
    
    res.json(resultado);
  } catch (error) {
    console.error('❌ [GET /categorias] Erro:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Criar nova categoria
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('➕ [POST /categorias] Usuário:', req.user.email);
    
    const { nome, descricao } = req.body;
    
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
    }

    const existing = await prisma.categoria.findFirst({
      where: { 
        nome: nome.trim(),
        userId: req.user.id
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Categoria já existe' });
    }

    const categoria = await prisma.categoria.create({
      data: {
        nome: nome.trim(),
        descricao: descricao?.trim() || null,
        userId: req.user.id
      }
    });

    const resultado = {
      ...categoria,
      equipamentos_count: 0
    };

    res.status(201).json(resultado);
  } catch (error) {
    console.error('❌ [POST /categorias] Erro:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

console.log('✅ [Categorias Routes] Configurado com Prisma');
module.exports = router;
