const express = require('express');
<<<<<<< HEAD
const corsPatch = require("./cors-patch");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ⭐ SERVIR ARQUIVOS ESTÁTICOS (UPLOADS)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://msgs4k8owowgwo4w4oc4400w.145.223.93.225.sslip.io'
  ],
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rotas
app.use('/auth', require('./routes/auth'));
app.use('/equipamentos', require('./routes/equipamentos'));
app.use('/categorias', require('./routes/categorias'));
app.use('/documentos', require('./routes/documentos'));
app.use('/plantas', require('./routes/plantas'));
app.use('/manutencoes', require('./routes/manutencoes'));
app.use('/healthcheck', require('./routes/healthcheck'));

// Rota de teste para arquivos
app.get('/test-upload/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', 'documentos', req.params.filename);
  console.log('🔍 Testando arquivo:', filepath);
  res.sendFile(filepath);
});

module.exports = app;
// Rotas de diagnóstico
app.use('/api', require('./diagnose-route'));

// Registrar todas as rotas
const logRoutes = require('./route-logger');
logRoutes(app);
=======
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const equipamentosRoutes = require('./routes/equipamentos');
const usersRoutes = require('./routes/users'); // ⭐ ADICIONAR
const model3DRoutes = require('./routes/model3D');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/equipamentos', equipamentosRoutes);
app.use('/api/users', usersRoutes); // ⭐ ADICIONAR
app.use('/api/models', model3DRoutes);
app.use('/api/dashboard', require('./routes/dashboard'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Middleware de erro global
app.use((error, req, res, next) => {
  console.error('❌ Erro global:', error);
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modelo3d')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
