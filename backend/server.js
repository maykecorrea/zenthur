const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🚀 Inicializando servidor...');

// ⭐ MIDDLEWARE GLOBAL
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // ⭐ ADICIONAR PATCH
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ⭐ CONFIGURAÇÃO DO MULTER PARA UPLOADS (APENAS DOCUMENTOS)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    console.log(`📁 [Upload] Arquivo recebido: ${file.originalname}, Tipo: ${file.mimetype}`);
    
    // ⭐ ACEITAR APENAS DOCUMENTOS
    const allowedTypes = [
      'application/pdf',
      'image/jpeg', 'image/png', 'image/gif',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const allowedExtensions = [
      '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.txt', '.doc', '.docx'
    ];
    
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExt)) {
      console.log(`✅ [Upload] Arquivo aceito: ${file.originalname}`);
      cb(null, true);
    } else {
      console.log(`❌ [Upload] Arquivo rejeitado: ${file.originalname} (${file.mimetype})`);
      cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`), false);
    }
  }
});

// ⭐ IMPORTAR ROTAS (APENAS AS QUE EXISTEM)
let authRoutes, categoriaRoutes, equipamentoRoutes, manutencaoRoutes, documentoRoutes, usersRoutes;

try {
  const authMiddleware = require('./middleware/auth'); 
  app.use('/api/auth', authMiddleware.router);
  console.log('✅ Auth routes carregadas do middleware');
} catch (error) {
  console.error('⚠️ Auth routes não encontradas:', error.message);
}

try {
  categoriaRoutes = require('./routes/categorias');
  console.log('✅ Categoria routes carregadas');
} catch (error) {
  console.warn('⚠️ Categoria routes não encontradas:', error.message);
}

try {
  equipamentoRoutes = require('./routes/equipamentos');
  console.log('✅ Equipamento routes carregadas');
} catch (error) {
  console.warn('⚠️ Equipamento routes não encontradas:', error.message);
}

try {
  manutencaoRoutes = require('./routes/manutencoes');
  console.log('✅ Manutenção routes carregadas');
} catch (error) {
  console.warn('⚠️ Manutenção routes não encontradas:', error.message);
}

try {
  documentoRoutes = require('./routes/documentos');
  console.log('✅ Documento routes carregadas');
} catch (error) {
  console.warn('⚠️ Documento routes não encontradas:', error.message);
}

try {
  usersRoutes = require('./routes/users');
  console.log('✅ Users routes carregadas');
} catch (error) {
  console.warn('⚠️ Users routes não encontradas:', error.message);
}

// ⭐ REGISTRAR ROTAS (APENAS AS QUE EXISTEM)
if (categoriaRoutes) {
  app.use('/api/categorias', categoriaRoutes);
  console.log('🔗 Rota /api/categorias registrada');
}

if (equipamentoRoutes) {
  app.use('/api/equipamentos', equipamentoRoutes);
  console.log('🔗 Rota /api/equipamentos registrada');
}

if (manutencaoRoutes) {
  app.use('/api/manutencoes', manutencaoRoutes);
  console.log('🔗 Rota /api/manutencoes registrada');
}

if (documentoRoutes) {
  app.use('/api/documentos', documentoRoutes);
  console.log('🔗 Rota /api/documentos registrada');
}

if (usersRoutes) {
  app.use('/api/users', usersRoutes);
  console.log('🔗 Rota /api/users registrada');
}

// ⭐ ROTA DE HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ⭐ ROTA RAIZ
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API Zenthur funcionando',
    version: '2.0.0',
    endpoints: [
      '/api/auth',
      '/api/categorias',
      '/api/equipamentos', 
      '/api/manutencoes',
      '/api/documentos',
      '/health'
    ]
  });
});

// ⭐ MIDDLEWARE DE ERRO GLOBAL
app.use((error, req, res, next) => {
  console.error('❌ [Error Handler]', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'Arquivo muito grande. Limite: 100MB'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    details: error.message
  });
});

// ⭐ MIDDLEWARE 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// ⭐ INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor Zenthur rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`💾 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // ⭐ VERIFICAR VARIÁVEIS DE AMBIENTE IMPORTANTES
  console.log('\n📋 Verificação de Environment:');
  console.log(`🗃️ DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Configurado' : '❌ Não configurado'}`);
  console.log(`🔑 JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Configurado' : '❌ Não configurado'}`);
});

// ⭐ TRATAMENTO DE SINAIS
process.on('SIGINT', () => {
  console.log('\n🛑 Recebido SIGINT, encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Recebido SIGTERM, encerrando servidor...');
  process.exit(0);
});