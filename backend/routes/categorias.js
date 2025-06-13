const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();
=======
const prisma = require('../config/database'); // ✅ USAR O PRISMA
const authMiddleware = require('../middleware/auth'); // ✅ NOME CORRETO
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8

// Listar categorias com contagem de equipamentos
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('📂 [GET /categorias] Usuário:', req.user.email);
    
    const categorias = await prisma.categoria.findMany({
<<<<<<< HEAD
      where: { userId: req.user.id },
=======
      where: { userId: req.user.sub },
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      include: {
        _count: {
          select: { equipamentos: true }
        }
      },
      orderBy: { nome: 'asc' }
    });

<<<<<<< HEAD
=======
    // Mapear para formato esperado pelo frontend
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    const resultado = categorias.map(categoria => ({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao || null,
      userId: categoria.userId,
      equipamentos_count: categoria._count.equipamentos,
      createdAt: categoria.createdAt,
      updatedAt: categoria.updatedAt
    }));
    
<<<<<<< HEAD
=======
    console.log(`✅ [GET /categorias] ${resultado.length} categorias encontradas`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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
<<<<<<< HEAD
=======
    console.log('🔍 DEBUG - req.user completo:', req.user);
    console.log('🔍 DEBUG - req.user.sub tipo:', typeof req.user.sub, 'valor:', req.user.sub);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    const { nome, descricao } = req.body;
    
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
    }

<<<<<<< HEAD
    const existing = await prisma.categoria.findFirst({
      where: { 
        nome: nome.trim(),
        userId: req.user.id
=======
    // VERIFICAR SE O USUÁRIO EXISTE NO BANCO
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(req.user.sub) }
    });
    console.log('🔍 DEBUG - Usuário existe no banco:', userExists ? 'SIM' : 'NÃO');
    console.log('🔍 DEBUG - Dados do usuário no banco:', userExists);

    if (!userExists) {
      console.log('❌ ERRO: Usuário do token não existe no banco!');
      return res.status(400).json({ message: 'Usuário não encontrado no banco. Faça login novamente.' });
    }

    // Verificar se já existe para o usuário
    const existing = await prisma.categoria.findFirst({
      where: { 
        nome: nome.trim(),
        userId: parseInt(req.user.sub)  // ⭐ FORÇAR CONVERSÃO PARA INT
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Categoria já existe' });
    }

<<<<<<< HEAD
=======
    console.log('📝 DEBUG - Tentando criar categoria com userId:', parseInt(req.user.sub));

>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    const categoria = await prisma.categoria.create({
      data: {
        nome: nome.trim(),
        descricao: descricao?.trim() || null,
<<<<<<< HEAD
        userId: req.user.id
      }
    });

=======
        userId: parseInt(req.user.sub)  // ⭐ FORÇAR CONVERSÃO PARA INT
      }
    });

    // Adicionar a contagem de equipamentos (0 para nova categoria)
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    const resultado = {
      ...categoria,
      equipamentos_count: 0
    };

<<<<<<< HEAD
    res.status(201).json(resultado);
  } catch (error) {
    console.error('❌ [POST /categorias] Erro:', error.message);
=======
    console.log(`✅ [POST /categorias] Categoria criada: ${categoria.nome}`);
    res.status(201).json(resultado);
  } catch (error) {
    console.log('❌ ERRO COMPLETO:', error);
    console.error('❌ [POST /categorias] Erro:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor', debug: error.message });
  }
});

// Buscar categoria por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🔍 [GET /categorias/:id] ID:', id, 'Usuário:', req.user.email);

    // ⭐ VERIFICAR SE ID É VÁLIDO
    if (isNaN(id)) {
      return res.status(400).json({ 
        error: 'ID inválido',
        message: 'O ID deve ser um número válido' 
      });
    }

    // ⭐ CORRIGIR QUERY PRISMA
    const categoria = await prisma.categoria.findFirst({
      where: {
        userId: req.user.userId,
        id: id  // ⭐ ADICIONAR O ID NA CONSULTA
      },
      include: {
        _count: {
          select: {
            equipamentos: true
          }
        }
      }
    });

    if (!categoria) {
      console.log('📭 [GET /categorias/:id] Categoria não encontrada');
      return res.status(404).json({ 
        error: 'Categoria não encontrada',
        message: 'A categoria solicitada não foi encontrada ou não pertence ao usuário' 
      });
    }

    console.log('✅ [GET /categorias/:id] Categoria encontrada:', categoria.nome);
    res.json(categoria);

  } catch (error) {
    console.error('❌ [GET /categorias/:id] Erro:', error.message);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Erro ao buscar categoria' 
    });
  }
});

// Atualizar categoria
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;
    console.log('✏️ [PUT /categorias/:id] ID:', id, 'Usuário:', req.user.email);
    
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
    }

    // Verificar se categoria existe e pertence ao usuário
    const existing = await prisma.categoria.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      }
    });

    if (!existing) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Verificar se nome já existe em outra categoria
    const duplicate = await prisma.categoria.findFirst({
      where: { 
        nome: nome.trim(),
        userId: req.user.sub,
        NOT: { id }
      }
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Nome já utilizado por outra categoria' });
    }

    const categoria = await prisma.categoria.update({
      where: { id },
      data: {
        nome: nome.trim(),
        descricao: descricao?.trim() || null
      },
      include: {
        _count: {
          select: { equipamentos: true }
        }
      }
    });

    const resultado = {
      ...categoria,
      equipamentos_count: categoria._count.equipamentos
    };

    console.log(`✅ [PUT /categorias/:id] Categoria atualizada: ${categoria.nome}`);
    res.json(resultado);
  } catch (error) {
    console.error('❌ [PUT /categorias/:id] Erro:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Deletar categoria
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🗑️ [DELETE /categorias/:id] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se categoria existe e pertence ao usuário
    const categoria = await prisma.categoria.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      }
    });

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Verificar se tem equipamentos associados
    const equipamentosCount = await prisma.equipamento.count({
      where: { categoriaId: id }
    });
    
    if (equipamentosCount > 0) {
      return res.status(400).json({
        message: `Não é possível excluir categoria que possui ${equipamentosCount} equipamento(s) associado(s)`
      });
    }

    await prisma.categoria.delete({
      where: { id }
    });

    console.log(`✅ [DELETE /categorias/:id] Categoria excluída: ${categoria.nome}`);
    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /categorias/:id] Erro:', error.message);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

console.log('✅ [Categorias Routes] Configurado com Prisma');
<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
