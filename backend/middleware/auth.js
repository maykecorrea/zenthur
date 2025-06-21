const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'formato de token inválido' });
    }

    // ⭐ IGNORAR EXPIRAÇÃO TEMPORARIAMENTE PARA TESTAR
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true // ⭐ REMOVER DEPOIS
    });
    
    req.user = decoded;
    next();
    
  } catch (error) {
    console.error('❌ erro jwt:', error.message);
    return res.status(401).json({ message: 'token inválido' });
  }
};

// Rota de login com TIMESTAMP FORÇADO CORRETO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 tentando login:', email);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha inválidos' 
      });
    }

    // ⭐ USAR SEMPRE HORA DO SERVIDOR
    const agora = Math.floor(Date.now() / 1000); // timestamp atual do servidor
    const expiraEm24h = agora + (24 * 60 * 60); // +24 horas

    const token = jwt.sign(
      { 
        sub: user.id,
        email: user.email,
        role: user.role,
        iat: agora,        // ⭐ emitido agora (servidor)
        exp: expiraEm24h   // ⭐ expira em 24h (servidor)
      },
      process.env.JWT_SECRET
    );

    console.log('✅ token gerado com timestamps do servidor');
    console.log('🕐 emitido em:', new Date(agora * 1000).toISOString());
    console.log('🕐 expira em:', new Date(expiraEm24h * 1000).toISOString());

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        empresa: user.empresa
      }
    });

  } catch (error) {
    console.error('❌ erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Nova rota para refresh do token
router.post('/refresh', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    
    // Gerar novo token com 24h
    const newToken = jwt.sign(
      { 
        sub: user.sub,
        email: user.email,
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('🔄 [POST /refresh] Token renovado para:', user.email);

    res.json({
      success: true,
      message: 'Token renovado com sucesso',
      token: newToken
    });
    
  } catch (error) {
    console.error('❌ [POST /refresh] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao renovar token'
    });
  }
});

router.post('/logout', (req, res) => {
  console.log('📞 [POST /logout] Logout solicitado');
  
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

router.get('/verify', authMiddleware, (req, res) => {
  console.log(`✅ [GET /verify] Token verificado para: ${req.user.email}`);
  
  res.json({
    success: true,
    valid: true,
    user: req.user
  });
});

module.exports = authMiddleware;
module.exports.router = router;
