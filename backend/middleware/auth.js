const jwt = require('jsonwebtoken');
<<<<<<< HEAD

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
=======
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const router = express.Router();

console.log('✅ [Auth Middleware] Configurado');
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? 'Configurado' : 'NÃO CONFIGURADO');

// ⭐ MIDDLEWARE DE VERIFICAÇÃO - CORRIGIDO
const authenticateToken = (req, res, next) => {
  try {
    console.log('🔐 [Auth Middleware] Verificando token...');
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('⚠️ [Auth Middleware] Token não fornecido');
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      return res.status(401).json({
        success: false,
        message: 'Token de acesso requerido'
      });
    }
    
    const token = authHeader.substring(7);
<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
=======
    console.log('🔍 Token recebido:', token.substring(0, 50) + '...');
    
    // ⭐ VERIFICAR SE JWT_SECRET EXISTE
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET não configurado!');
      return res.status(500).json({
        success: false,
        message: 'Configuração do servidor incorreta'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decodificado:', decoded);
    
    console.log(`✅ [Auth Middleware] Token válido para: ${decoded.email} (${decoded.role})`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    req.user = {
      id: decoded.sub,
      sub: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
    
  } catch (error) {
<<<<<<< HEAD
=======
    console.error('❌ [Auth Middleware] Token inválido:', error.message);
    
    // ⭐ LOGS DETALHADOS PARA DEBUG
    console.error('❌ Detalhes do erro:', {
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt
    });
    
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido'
    });
  }
};

<<<<<<< HEAD
module.exports = authenticateToken;
=======
// ⭐ LOGIN CORRIGIDO - VERIFICAR EXPIRAÇÃO
router.post('/login', async (req, res) => {
  try {
    console.log('📞 [POST /login] Tentativa de login');
    
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
    
    if (!user) {
      console.log(`⚠️ [POST /login] Usuário não encontrado: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      console.log(`⚠️ [POST /login] Senha incorreta para: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // ⭐ PAYLOAD CORRETO COM EXPIRAÇÃO LONGA
    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role 
    };
    
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { 
        expiresIn: '7d', // ⭐ 7 DIAS EM VEZ DE 24H
        issuer: 'zenthur-api',
        audience: 'zenthur-frontend'
      }
    );
    
    console.log(`✅ [POST /login] Login realizado: ${user.email} (${user.role})`);
    console.log('🔑 Token gerado com payload:', payload);
    
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
    console.error('❌ [POST /login] Erro:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// ⭐ RESTO DO CÓDIGO MANTIDO
router.post('/logout', (req, res) => {
  console.log('📞 [POST /logout] Logout solicitado');
  
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

router.get('/verify', authenticateToken, (req, res) => {
  console.log(`✅ [GET /verify] Token verificado para: ${req.user.email}`);
  
  res.json({
    success: true,
    valid: true,
    user: req.user
  });
});

module.exports = authenticateToken;
module.exports.router = router;
module.exports.authenticateToken = authenticateToken;
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
