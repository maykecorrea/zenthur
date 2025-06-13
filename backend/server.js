const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
<<<<<<< HEAD
const https = require('https');
=======
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3002;
<<<<<<< HEAD
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

=======

// Inicializar Prisma
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
const prisma = new PrismaClient();

console.log('🚀 Inicializando servidor...');

<<<<<<< HEAD
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
=======
// Middlewares básicos
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000'],
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authMiddleware = require('./middleware/auth');
console.log('✅ [Auth Middleware] Configurado');

=======

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar middleware de autenticação
const authMiddleware = require('./middleware/auth');
console.log('✅ [Auth Middleware] Configurado');

// Verificar JWT_SECRET
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
if (process.env.JWT_SECRET) {
  console.log('🔑 JWT_SECRET: Configurado');
} else {
  console.warn('⚠️ JWT_SECRET não configurado!');
}

<<<<<<< HEAD
const usersRoutes = require('./routes/users');
=======
// Importar rotas
const { router: authRoutes } = require('./middleware/auth');
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
const categoriasRoutes = require('./routes/categorias');
const equipamentosRoutes = require('./routes/equipamentos');
const manutencoesRoutes = require('./routes/manutencoes');
const documentosRoutes = require('./routes/documentos');
<<<<<<< HEAD
const plantasRoutes = require('./routes/plantas');

=======
const usersRoutes = require('./routes/users');
const plantasRoutes = require('./routes/plantas');
const healthcheckRoutes = require('./routes/healthcheck');

console.log('✅ Auth routes carregadas do middleware');

// Configurar Prisma para as rotas
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
console.log('✅ [Database] Prisma Client configurado');
console.log('✅ [Categorias Routes] Configurado com Prisma');
console.log('✅ [Equipamentos Routes] Configurado com Prisma');
console.log('✅ [Manutencoes Routes] Configurado com CRUD completo');
console.log('✅ [Documentos Routes] Configurado com upload/download');
console.log('✅ [Users Routes] Configuradas');
console.log('✅ [Plantas Routes] Configurado com Express');
<<<<<<< HEAD

app.use('/api/auth', usersRoutes);
=======
console.log('🩺 [Healthcheck Routes] Configurado'); // ✅ NOVO

// Registrar rotas (HEALTHCHECK PRIMEIRO - sem auth)
app.use('/api/healthcheck', healthcheckRoutes); // ✅ NOVO
app.use('/healthcheck', healthcheckRoutes); // ✅ NOVO - Alias sem /api

app.use('/api/auth', authRoutes);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
app.use('/api/categorias', authMiddleware, categoriasRoutes);
app.use('/api/equipamentos', authMiddleware, equipamentosRoutes);
app.use('/api/manutencoes', authMiddleware, manutencoesRoutes);
app.use('/api/documentos', authMiddleware, documentosRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/plantas', authMiddleware, plantasRoutes);

<<<<<<< HEAD
console.log('🔗 Rota /api/auth registrada');
=======
console.log('✅ Categoria routes carregadas');
console.log('✅ Equipamento routes carregadas');
console.log('✅ Manutenção routes carregadas');
console.log('✅ Documento routes carregadas');
console.log('✅ Users routes carregadas');
console.log('✅ Planta routes carregadas');
console.log('🩺 Healthcheck routes carregadas'); // ✅ NOVO

// Registrar logs das rotas
console.log('🔗 Rota /api/healthcheck registrada'); // ✅ NOVO
console.log('🔗 Rota /healthcheck registrada'); // ✅ NOVO
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
console.log('🔗 Rota /api/categorias registrada');
console.log('🔗 Rota /api/equipamentos registrada');
console.log('🔗 Rota /api/manutencoes registrada');
console.log('🔗 Rota /api/documentos registrada');
console.log('🔗 Rota /api/users registrada');
console.log('🔗 Rota /api/plantas registrada');

<<<<<<< HEAD
=======
// Middleware de tratamento de erros
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

<<<<<<< HEAD
=======
// Rota 404
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

<<<<<<< HEAD
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
=======
// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Servidor Zenthur rodando na porta', PORT);
  console.log('📍 http://localhost:' + PORT);
  console.log('💾 Environment:', process.env.NODE_ENV || 'development');
  
  console.log('\n📋 Verificação de Environment:');
  console.log('🗃️ DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurado' : '❌ Não configurado');
  console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? '✅ Configurado' : '❌ Não configurado');
  console.log('🩺 HEALTHCHECK: ✅ Disponível em /api/healthcheck/health'); // ✅ NOVO
});

module.exports = app;
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
