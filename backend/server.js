const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3002;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

const prisma = new PrismaClient();

console.log('🚀 Inicializando servidor...');

app.use(cors({
  origin: [
    'http://localhost:3001', 
    'http://127.0.0.1:3001', 
    'http://localhost:3000',
    'https://localhost:3001', 
    'https://127.0.0.1:3001', 
    'https://localhost:3000',
    'http://msgs4k8owowgwo4w4oc4400w.145.223.93.225.sslip.io',
    'https://msgs4k8owowgwo4w4oc4400w.145.223.93.225.sslip.io'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authMiddleware = require('./middleware/auth');
console.log('✅ [Auth Middleware] Configurado');

if (process.env.JWT_SECRET) {
  console.log('🔑 JWT_SECRET: Configurado');
} else {
  console.warn('⚠️ JWT_SECRET não configurado!');
}

const usersRoutes = require('./routes/users');
const categoriasRoutes = require('./routes/categorias');
const equipamentosRoutes = require('./routes/equipamentos');
const manutencoesRoutes = require('./routes/manutencoes');
const documentosRoutes = require('./routes/documentos');
const plantasRoutes = require('./routes/plantas');

console.log('✅ [Database] Prisma Client configurado');
console.log('✅ [Categorias Routes] Configurado com Prisma');
console.log('✅ [Equipamentos Routes] Configurado com Prisma');
console.log('✅ [Manutencoes Routes] Configurado com CRUD completo');
console.log('✅ [Documentos Routes] Configurado com upload/download');
console.log('✅ [Users Routes] Configuradas');
console.log('✅ [Plantas Routes] Configurado com Express');

app.use('/api/auth', usersRoutes);
app.use('/api/categorias', authMiddleware, categoriasRoutes);
app.use('/api/equipamentos', authMiddleware, equipamentosRoutes);
app.use('/api/manutencoes', authMiddleware, manutencoesRoutes);
app.use('/api/documentos', authMiddleware, documentosRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/plantas', authMiddleware, plantasRoutes);

console.log('🔗 Rota /api/auth registrada');
console.log('🔗 Rota /api/categorias registrada');
console.log('🔗 Rota /api/equipamentos registrada');
console.log('🔗 Rota /api/manutencoes registrada');
console.log('🔗 Rota /api/documentos registrada');
console.log('🔗 Rota /api/users registrada');
console.log('🔗 Rota /api/plantas registrada');

app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

const loadSSLCertificates = () => {
  try {
    const keyPath = path.join(__dirname, 'ssl', 'private.key');
    const certPath = path.join(__dirname, 'ssl', 'certificate.crt');
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
    } else {
      console.log('⚠️ Certificados SSL não encontrados');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao carregar certificados SSL:', error.message);
    return null;
  }
};

const startServers = () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Servidor HTTP Zenthur rodando na porta', PORT);
    console.log('📍 http://localhost:' + PORT);
    console.log('🌐 http://msgs4k8owowgwo4w4oc4400w.145.223.93.225.sslip.io');
  });

  const sslOptions = loadSSLCertificates();
  
  if (sslOptions) {
    https.createServer(sslOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
      console.log('🔒 Servidor HTTPS Zenthur rodando na porta', HTTPS_PORT);
      console.log('📍 https://localhost:' + HTTPS_PORT);
      console.log('🌐 https://msgs4k8owowgwo4w4oc4400w.145.223.93.225.sslip.io:' + HTTPS_PORT);
    });
  } else {
    console.log('⚠️ HTTPS não iniciado - certificados SSL não encontrados');
  }

  console.log('💾 Environment:', process.env.NODE_ENV || 'development');
  console.log('\n📋 Verificação de Environment:');
  console.log('🗃️ DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurado' : '❌ Não configurado');
  console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? '✅ Configurado' : '❌ Não configurado');
};

startServers();

module.exports = app;
