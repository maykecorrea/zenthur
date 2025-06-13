const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = require('../config/database');

// Registrar usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    
    // Validações
    if (!nome || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos os campos são obrigatórios'
      });
    }
    
    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este email já está em uso'
      });
    }
    
    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hashedPassword
      }
    });
    
    // Gerar token
    const token = jwt.sign(
      { 
        sub: user.id,
        nome: user.nome,
        email: user.email
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    // Responder sem senha
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      token,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('❌ [POST /auth/register] Erro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao registrar usuário'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('📝 [POST /auth/login] Tentativa de login:', req.body.email);
    
    const { email, password } = req.body;
    
    // Validações
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email e senha são obrigatórios'
      });
    }
    
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log('❌ [POST /auth/login] Usuário não encontrado:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas'
      });
    }
    
    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('❌ [POST /auth/login] Senha incorreta para:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas'
      });
    }
    
    // Gerar token
    const token = jwt.sign(
      { 
        sub: user.id,
        nome: user.nome,
        email: user.email
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    // Responder sem senha
    const { password: _, ...userWithoutPassword } = user;
    
    console.log('✅ [POST /auth/login] Login bem-sucedido:', email);
    
    res.status(200).json({
      success: true,
      message: 'Login bem-sucedido',
      token,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('❌ [POST /auth/login] Erro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao fazer login',
      error: error.message
    });
  }
});

// Verificar token
router.get('/me', async (req, res) => {
  try {
    // Token enviado no header Authorization
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token não fornecido'
      });
    }
    
    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: decoded.sub }
      });
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Usuário não encontrado'
        });
      }
      
      // Responder sem senha
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        user: userWithoutPassword
      });
      
    } catch (error) {
      console.error('❌ [GET /auth/me] Erro ao verificar token:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido'
      });
    }
    
  } catch (error) {
    console.error('❌ [GET /auth/me] Erro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao verificar autenticação'
    });
  }
});

module.exports = router;
