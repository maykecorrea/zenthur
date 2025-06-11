const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3002;

// Inicializar Prisma
const prisma = new PrismaClient();

console.log('🚀 Inicializando servidor...');

// Middlewares básicos
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar middleware de autenticação
const authMiddleware = require('./middleware/auth');
console.log('✅ [Auth Middleware] Configurado');

// Verificar JWT_SECRET
if (process.env.JWT_SECRET) {
  console.log('🔑 JWT_SECRET: Configurado');
} else {
  console.warn('⚠️ JWT_SECRET não configurado!');
}

// Importar rotas
const { router: authRoutes } = require('./middleware/auth');
const categoriasRoutes = require('./routes/categorias');
const equipamentosRoutes = require('./routes/equipamentos');
const manutencoesRoutes = require('./routes/manutencoes');
const documentosRoutes = require('./routes/documentos');
const usersRoutes = require('./routes/users');
const plantasRoutes = require('./routes/plantas');
const healthcheckRoutes = require('./routes/healthcheck'); // ✅ NOVO

console.log('✅ Auth routes carregadas do middleware');

// Configurar Prisma para as rotas
console.log('✅ [Database] Prisma Client configurado');
console.log('✅ [Categorias Routes] Configurado com Prisma');
console.log('✅ [Equipamentos Routes] Configurado com Prisma');
console.log('✅ [Manutencoes Routes] Configurado com CRUD completo');
console.log('✅ [Documentos Routes] Configurado com upload/download');
console.log('✅ [Users Routes] Configuradas');
console.log('✅ [Plantas Routes] Configurado com Express');
console.log('🩺 [Healthcheck Routes] Configurado'); // ✅ NOVO

// Registrar rotas (HEALTHCHECK PRIMEIRO - sem auth)
app.use('/api/healthcheck', healthcheckRoutes); // ✅ NOVO
app.use('/healthcheck', healthcheckRoutes); // ✅ NOVO - Alias sem /api

app.use('/api/auth', authRoutes);
app.use('/api/categorias', authMiddleware, categoriasRoutes);
app.use('/api/equipamentos', authMiddleware, equipamentosRoutes);
app.use('/api/manutencoes', authMiddleware, manutencoesRoutes);
app.use('/api/documentos', authMiddleware, documentosRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/plantas', authMiddleware, plantasRoutes);

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
console.log('🔗 Rota /api/categorias registrada');
console.log('🔗 Rota /api/equipamentos registrada');
console.log('🔗 Rota /api/manutencoes registrada');
console.log('🔗 Rota /api/documentos registrada');
console.log('🔗 Rota /api/users registrada');
console.log('🔗 Rota /api/plantas registrada');

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

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