const express = require('express');
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