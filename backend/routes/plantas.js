const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configuração de upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/plantas');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `planta-${uniqueSuffix}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// ✅ LISTAR PLANTAS
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /plantas] Usuário:', req.user.email);
    
    const plantas = await prisma.planta.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ success: true, data: plantas });
  } catch (error) {
    console.error('❌ [GET /plantas] Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar plantas' });
  }
});

// ✅ CRIAR PLANTA
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    console.log('📤 [POST /plantas] Body:', req.body);
    
    const { titulo, descricao } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ success: false, message: 'Título é obrigatório' });
    }
    
    let imageUrl = null;
    let imagePath = null;
    let fileName = null;
    
    if (req.file) {
      imageUrl = `/uploads/plantas/${req.file.filename}`;
      imagePath = req.file.path;
      fileName = req.file.filename;
    }
    
    const planta = await prisma.planta.create({
      data: {
        titulo,
        descricao: descricao || '',
        imageUrl,
        imagePath,
        fileName,
        userId: req.user.id
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Planta criada com sucesso',
      planta
    });
  } catch (error) {
    console.error('❌ [POST /plantas] Erro:', error);
    
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao criar planta',
      error: error.message
    });
  }
});

// ✅ CRIAR MARCADOR
router.post('/:plantaId/marcadores', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.plantaId);
    const { texto, url, cor, posicaoX, posicaoY } = req.body;
    
    if (!texto || !posicaoX || !posicaoY) {
      return res.status(400).json({ success: false, message: 'Dados incompletos para o marcador' });
    }
    
    // Verificar se a planta existe e pertence ao usuário
    const planta = await prisma.planta.findFirst({
      where: { 
        id: plantaId, 
        userId: req.user.id 
      }
    });
    
    if (!planta) {
      return res.status(404).json({ success: false, message: 'Planta não encontrada' });
    }
    
    const marcador = await prisma.marcadorPlanta.create({
      data: {
        texto,
        url: url || null,
        cor: cor || '#ef4444',
        posicaoX: parseFloat(posicaoX),
        posicaoY: parseFloat(posicaoY),
        plantaId
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Marcador criado com sucesso',
      marcador
    });
  } catch (error) {
    console.error('❌ [POST /plantas/:id/marcadores] Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar marcador' });
  }
});

// ✅ LISTAR MARCADORES
router.get('/:plantaId/marcadores', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.plantaId);
    
    const planta = await prisma.planta.findFirst({
      where: { 
        id: plantaId, 
        userId: req.user.id 
      }
    });
    
    if (!planta) {
      return res.status(404).json({ success: false, message: 'Planta não encontrada' });
    }
    
    const marcadores = await prisma.marcadorPlanta.findMany({
      where: { 
        plantaId,
        ativo: true 
      }
    });
    
    res.json({ success: true, data: marcadores });
  } catch (error) {
    console.error('❌ [GET /plantas/:id/marcadores] Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar marcadores' });
  }
});

console.log('✅ [Plantas Routes] Configurado');
module.exports = router;
