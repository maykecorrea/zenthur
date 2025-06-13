const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// ⭐ CORREÇÃO: IMPORTAR CORRETAMENTE O MIDDLEWARE
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

console.log('✅ [Users Routes] Configuradas');

// ⭐ MIDDLEWARE DE LOGS
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('🔑 Headers de autorização:', req.headers.authorization ? 'Presente' : 'Ausente');
  next();
};

// ⭐ MIDDLEWARE DE ADMIN SIMPLIFICADO
const adminMiddleware = (req, res, next) => {
  try {
    console.log('🔐 [Admin Check] Verificando permissão admin...');
    console.log('👤 [Admin Check] Usuário:', req.user);
    
    if (!req.user) {
      console.log('❌ [Admin Check] req.user não definido');
      return res.status(401).json({ 
        success: false,
        message: 'Token de autenticação necessário' 
      });
    }

    if (req.user.role !== 'admin') {
      console.log(`⚠️ [Admin Check] Acesso negado para usuário: ${req.user.email} (role: ${req.user.role})`);
      return res.status(403).json({ 
        success: false,
        message: 'Acesso negado. Apenas administradores podem realizar esta ação.' 
      });
    }

    console.log(`✅ [Admin Check] Acesso admin autorizado para: ${req.user.email}`);
    next();
  } catch (error) {
    console.error('❌ [Admin Check] Erro no middleware admin:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// ⭐ GET /api/users - LISTAR USUÁRIOS
router.get('/', logRequest, authenticateToken, adminMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /users] Buscando todos os usuários...');
    console.log('👤 [GET /users] Admin solicitante:', req.user.email);
    
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`✅ [GET /users] ${usuarios.length} usuários encontrados`);
    
    res.json({
      success: true,
      data: usuarios,
      total: usuarios.length
    });
    
  } catch (error) {
    console.error('❌ [GET /users] Erro:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ POST /api/users - CRIAR USUÁRIO
router.post('/', logRequest, authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { email, password, nome, role = 'user', empresa, telefone } = req.body;
    
    console.log('➕ [POST /users] Criando novo usuário:', { email, nome, role, empresa });
    console.log('👤 [POST /users] Admin solicitante:', req.user.email);

    // Validações básicas
    if (!email || !password || !nome) {
      return res.status(400).json({ 
        success: false,
        message: 'Email, senha e nome são obrigatórios' 
      });
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Formato de email inválido' 
      });
    }

    // Validar senha
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Senha deve ter pelo menos 6 caracteres' 
      });
    }

    // Verificar se email já existe
    const usuarioExistente = await prisma.user.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
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

    console.log(`✅ [POST /users] Usuário criado com sucesso: ${novoUsuario.email} (ID: ${novoUsuario.id})`);
    
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: novoUsuario
    });

  } catch (error) {
    console.error('❌ [POST /users] Erro ao criar usuário:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false,
        message: 'Email já está em uso' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ PUT /api/users/:id - EDITAR USUÁRIO
router.put('/:id', logRequest, authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, nome, role, empresa, telefone } = req.body;
    
    console.log(`✏️ [PUT /users/${id}] Editando usuário`, { email, nome, role });
    console.log('👤 [PUT /users] Admin solicitante:', req.user.email);

    // Verificar se usuário existe
    const usuarioExistente = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuarioExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
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
          success: false,
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

    console.log(`✅ [PUT /users/${id}] Usuário atualizado com sucesso: ${usuarioAtualizado.email}`);
    
    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: usuarioAtualizado
    });

  } catch (error) {
    console.error(`❌ [PUT /users/${req.params.id}] Erro ao atualizar usuário:`, error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false,
        message: 'Email já está em uso' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ DELETE /api/users/:id - EXCLUIR USUÁRIO  
router.delete('/:id', logRequest, authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const adminUserId = req.user.id; // Usar req.user.id (não sub)
    
    console.log(`🗑️ [DELETE /users/${id}] Excluindo usuário (solicitado por admin ID: ${adminUserId})`);

    // Verificar se usuário existe
    const usuario = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }

    // Impedir que admin exclua a si mesmo
    if (parseInt(id) === adminUserId) {
      return res.status(400).json({ 
        success: false,
        message: 'Você não pode excluir sua própria conta' 
      });
    }

    // Excluir usuário
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    console.log(`✅ [DELETE /users/${id}] Usuário excluído com sucesso: ${usuario.email}`);
    
    res.json({
      success: true,
      message: 'Usuário excluído com sucesso',
      data: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      }
    });

  } catch (error) {
    console.error(`❌ [DELETE /users/${req.params.id}] Erro ao excluir usuário:`, error);
    
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// ⭐ ROTAS DE AUTENTICAÇÃO
router.post('/login', logRequest, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    const token = jwt.sign(
      { 
        sub: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        empresa: user.empresa
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

module.exports = router;
