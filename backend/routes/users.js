const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware simples de admin (temporário para teste)
const adminMiddleware = (req, res, next) => {
  try {
    console.log('🔐 Verificando permissão admin...');
    console.log('👤 Usuário:', req.user);
    
    if (!req.user) {
      return res.status(401).json({ message: 'Token de autenticação necessário' });
    }

    if (req.user.role !== 'admin') {
      console.log(`⚠️ Acesso negado para usuário: ${req.user.email} (role: ${req.user.role})`);
      return res.status(403).json({ 
        message: 'Acesso negado. Apenas administradores podem realizar esta ação.' 
      });
    }

    console.log(`✅ Acesso admin autorizado para: ${req.user.email}`);
    next();
  } catch (error) {
    console.error('❌ Erro no middleware admin:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Middleware para logs
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// ⭐ GET /api/users - Listar todos os usuários (apenas admin)
router.get('/', logRequest, authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('📋 Buscando todos os usuários...');
    
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        empresa: true,
        telefone: true,
        createdAt: true,
        updatedAt: true
        // Não retornar a senha por segurança
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`✅ ${usuarios.length} usuários encontrados`);
    
    res.json(usuarios);
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ POST /api/users - Criar novo usuário (apenas admin)
router.post('/', logRequest, authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { email, password, nome, role = 'user', empresa, telefone } = req.body;
    
    console.log('➕ Criando novo usuário:', { email, nome, role, empresa });

    // Validações básicas
    if (!email || !password || !nome) {
      return res.status(400).json({ 
        message: 'Email, senha e nome são obrigatórios' 
      });
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Formato de email inválido' 
      });
    }

    // Validar senha
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Senha deve ter pelo menos 6 caracteres' 
      });
    }

    // Verificar se email já existe
    const usuarioExistente = await prisma.user.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ 
        message: 'Email já está em uso' 
      });
    }

    // Criptografar senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const novoUsuario = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nome,
        role: role || 'user',
        empresa: empresa || null,
        telefone: telefone || null
      },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        empresa: true,
        telefone: true,
        createdAt: true
      }
    });

    console.log(`✅ Usuário criado com sucesso: ${novoUsuario.email} (ID: ${novoUsuario.id})`);
    
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: novoUsuario
    });

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: 'Email já está em uso' 
      });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ PUT /api/users/:id - Editar usuário (apenas admin)
router.put('/:id', logRequest, authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, nome, role, empresa, telefone } = req.body;
    
    console.log(`✏️ Editando usuário ID: ${id}`, { email, nome, role });

    // Verificar se usuário existe
    const usuarioExistente = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Preparar dados para atualização
    const dadosAtualizacao = {};
    
    if (email) dadosAtualizacao.email = email;
    if (nome) dadosAtualizacao.nome = nome;
    if (role) dadosAtualizacao.role = role;
    if (empresa !== undefined) dadosAtualizacao.empresa = empresa || null;
    if (telefone !== undefined) dadosAtualizacao.telefone = telefone || null;

    // Se senha foi fornecida, criptografar
    if (password && password.length > 0) {
      if (password.length < 6) {
        return res.status(400).json({ 
          message: 'Senha deve ter pelo menos 6 caracteres' 
        });
      }
      
      const saltRounds = 12;
      dadosAtualizacao.password = await bcrypt.hash(password, saltRounds);
    }

    // Atualizar usuário
    const usuarioAtualizado = await prisma.user.update({
      where: { id: parseInt(id) },
      data: dadosAtualizacao,
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        empresa: true,
        telefone: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log(`✅ Usuário atualizado com sucesso: ${usuarioAtualizado.email}`);
    
    res.json({
      message: 'Usuário atualizado com sucesso',
      user: usuarioAtualizado
    });

  } catch (error) {
    console.error('❌ Erro ao atualizar usuário:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: 'Email já está em uso' 
      });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ DELETE /api/users/:id - Excluir usuário (apenas admin)
router.delete('/:id', logRequest, authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const adminUserId = req.user.sub;
    
    console.log(`🗑️ Excluindo usuário ID: ${id} (solicitado por admin ID: ${adminUserId})`);

    // Verificar se usuário existe
    const usuario = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Impedir auto-exclusão
    if (parseInt(id) === adminUserId) {
      return res.status(400).json({ 
        message: 'Você não pode excluir sua própria conta' 
      });
    }

    // EXCLUSÃO SIMPLES - SEM CASCATA
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    console.log(`✅ Usuário excluído: ${usuario.email} (ID: ${id})`);
    
    res.json({
      message: 'Usuário excluído com sucesso',
      deletedUser: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      }
    });

  } catch (error) {
    console.error('❌ Erro ao excluir usuário:', error);
    
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        message: 'Usuário possui registros relacionados. Exclua-os primeiro.',
        error: 'Foreign key constraint'
      });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

module.exports = router;