const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// ⭐ IMPORTAR SUAS ROTAS EXISTENTES
const usersRoutes = require('./routes/users');
const categoriasRoutes = require('./routes/categorias');
const manutencoesRoutes = require('./routes/manutencoes');
const equipamentosRoutes = require('./routes/equipamentos');
const documentosRoutes = require('./routes/documentos');
const dashboardRoutes = require('./routes/dashboard');
const plantasRoutes = require('./routes/plantas'); // ⭐ ADICIONAR ESTA LINHA

// ⭐ IMPORTAR AUTH COMO MIDDLEWARE
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4001;

// ⭐ MIDDLEWARE BÁSICO
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], 
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ⭐ SERVIR ARQUIVOS ESTÁTICOS
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⭐ CRIAR PASTA DE UPLOADS SE NÃO EXISTIR
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ⭐ ROTA RAIZ (ADICIONAR ESTA LINHA)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Zenthur Backend API', 
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ⭐ USAR ROTAS AUTH DO MIDDLEWARE
app.use('/api/auth', authMiddleware.router);

// ⭐ USAR SUAS ROTAS EXISTENTES
app.use('/api/users', usersRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/manutencoes', manutencoesRoutes);
app.use('/api/equipamentos', equipamentosRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/plantas', plantasRoutes); // ⭐ ADICIONAR ESTA LINHA

// ⭐ ROTA DE SAÚDE
app.get('/api/health', (req, res) => {
  console.log('📞 [Health] Verificação de saúde solicitada');
  
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando - Sistema de Manutenção',
    timestamp: new Date().toISOString(),
    multer: {
      configured: true,
      maxSize: '50MB'
    },
    uploadsDir: uploadsDir,
    environment: process.env.NODE_ENV || 'development'
  });
});

// ⭐ MIDDLEWARE DE ERRO GLOBAL
app.use((error, req, res, next) => {
  console.error('❌ [Server] Erro capturado:', error.message);
  
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          error: 'Arquivo muito grande',
          details: 'Tamanho máximo: 50MB',
          code: 'FILE_TOO_LARGE'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          error: 'Campo de arquivo inesperado',
          details: 'Use o campo correto para upload',
          code: 'UNEXPECTED_FIELD'
        });
      default:
        return res.status(400).json({
          error: 'Erro no upload',
          details: error.message,
          code: error.code
        });
    }
  }
  
  if (error.message.includes('não suportado')) {
    return res.status(400).json({
      error: 'Formato não suportado',
      details: error.message,
      code: 'UNSUPPORTED_FORMAT'
    });
  }
  
  res.status(500).json({
    error: error.message || 'Erro interno do servidor',
    timestamp: new Date().toISOString(),
    code: 'INTERNAL_ERROR'
  });
});

// ⭐ INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log('');
  console.log('🚀==============================================');
  console.log('🚀           SERVIDOR INICIADO               ');
  console.log('🚀==============================================');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('🔧 CONFIGURAÇÕES:');
  console.log(`   📁 Uploads: ${uploadsDir}`);
  console.log(`   🌐 CORS: ✅ HABILITADO`);
  console.log(`   📄 Multer: ✅ 50MB max`);
  console.log('');
  console.log('📡 ROTAS ATIVAS:');
  console.log('   ✅ POST /api/auth/login');
  console.log('   ✅ POST /api/auth/refresh');
  console.log('   ✅ GET  /api/users');
  console.log('   ✅ GET  /api/equipamentos');
  console.log('   ✅ GET  /api/manutencoes');
  console.log('   ✅ GET  /api/documentos');
  console.log('   ✅ GET  /api/dashboard');
  console.log('   ✅ GET  /api/categorias');
  console.log('   ✅ GET  /api/plantas'); // ⭐ ADICIONAR ESTA LINHA
  console.log('🚀==============================================');
  console.log('');
});

module.exports = app;

// ✅ ARQUIVO COMPLETAMENTE LIMPO - SEM CÓDIGO ÓRFÃO
