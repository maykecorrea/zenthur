const express = require('express');
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
