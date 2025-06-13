const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

<<<<<<< HEAD
// Configuração de upload
=======
// ✅ CONFIGURAÇÃO UPLOAD IGUAL AOS EQUIPAMENTOS
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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
<<<<<<< HEAD
  limits: { fileSize: 10 * 1024 * 1024 }
=======
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo não suportado.'), false);
    }
  }
});

// ✅ ROTA DE TESTE
router.get('/test', authMiddleware, (req, res) => {
  console.log('🧪 Teste do PlantasController executado');
  res.json({ 
    success: true, 
    message: 'PlantasController funcionando!',
    timestamp: new Date().toISOString()
  });
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
});

// ✅ LISTAR PLANTAS
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /plantas] Usuário:', req.user.email);
    
    const plantas = await prisma.planta.findMany({
<<<<<<< HEAD
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ success: true, data: plantas });
  } catch (error) {
    console.error('❌ [GET /plantas] Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar plantas' });
=======
      where: { 
        userId: req.user.sub,
        ativa: true 
      },
      include: {
        marcadores: {
          where: { ativo: true }
        },
        _count: {
          select: { marcadores: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`✅ [GET /plantas] ${plantas.length} plantas encontradas`);
    res.json({ success: true, data: plantas }); // ✅ TROCAR 'plantas' por 'data'
  } catch (error) {
    console.error('❌ [GET /plantas] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar plantas', 
      error: error.message 
    });
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
  }
});

// ✅ CRIAR PLANTA
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
<<<<<<< HEAD
=======
    console.log('📤 [POST /plantas] Usuário:', req.user.email);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    console.log('📤 [POST /plantas] Body:', req.body);
    
    const { titulo, descricao } = req.body;
    
<<<<<<< HEAD
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
    
=======
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Imagem é obrigatória' });
    }
    
    const imageUrl = `/uploads/plantas/${req.file.filename}`;
    
    const planta = await prisma.planta.create({
      data: {
        titulo: titulo.trim(),
        descricao: descricao?.trim() || '',
        imageUrl,
        imagePath: req.file.path,
        fileName: req.file.filename,
        userId: req.user.sub
      },
      include: {
        marcadores: {
          where: { ativo: true }
        }
      }
    });
    
    console.log(`✅ [POST /plantas] Planta criada: ${planta.titulo}`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    res.status(201).json({
      success: true,
      message: 'Planta criada com sucesso',
      planta
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('❌ [POST /plantas] Erro:', error);
=======
    console.error('❌ [POST /plantas] Erro:', error.message);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    
    res.status(500).json({ 
<<<<<<< HEAD
      success: false, 
      message: 'Erro ao criar planta',
      error: error.message
=======
      message: 'Erro ao criar planta', 
      error: error.message 
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    });
  }
});

<<<<<<< HEAD
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
=======
// ✅ BUSCAR PLANTA POR ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.id);
    
    const planta = await prisma.planta.findFirst({
      where: { 
        id: plantaId,
        userId: req.user.sub
      },
      include: { marcadores: true }
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    });
    
    if (!planta) {
      return res.status(404).json({ success: false, message: 'Planta não encontrada' });
    }
    
<<<<<<< HEAD
=======
    res.json({ success: true, data: planta });
  } catch (error) {
    console.error('❌ [GET /plantas/:id] Erro:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao buscar planta', error: error.message });
  }
});

// ✅ EXCLUIR PLANTA  
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.id);
    
    const planta = await prisma.planta.findFirst({
      where: { id: plantaId, userId: req.user.sub }
    });
    
    if (!planta) {
      return res.status(404).json({ success: false, message: 'Planta não encontrada' });
    }
    
    // Excluir marcadores primeiro
    await prisma.marcadorPlanta.deleteMany({ where: { plantaId } });
    
    // Excluir planta
    await prisma.planta.delete({ where: { id: plantaId } });
    
    res.json({ success: true, message: 'Planta excluída com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /plantas/:id] Erro:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao excluir planta', error: error.message });
  }
});

// ✅ ADICIONAR MARCADOR
router.post('/:id/marcadores', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.id);
    const { texto, url, cor, posicaoX, posicaoY } = req.body;
    
    // Verificar se a planta existe e pertence ao usuário
    const planta = await prisma.planta.findFirst({
      where: { 
        id: plantaId,
        userId: req.user.sub 
      }
    });
    
    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }
    
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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
    
<<<<<<< HEAD
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
=======
    console.log(`✅ [POST /plantas/${plantaId}/marcadores] Marcador criado`);
    res.status(201).json({ success: true, marcador });
  } catch (error) {
    console.error('❌ [POST /plantas/:id/marcadores] Erro:', error.message);
    res.status(500).json({ message: 'Erro ao criar marcador', error: error.message });
  }
});

// ✅ ATUALIZAR MARCADOR
router.put('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);
    const { texto, url, cor, posicaoX, posicaoY } = req.body;
    
    // Verificar se o marcador existe e pertence ao usuário
    const marcador = await prisma.marcadorPlanta.findFirst({
      where: { id: marcadorId },
      include: { planta: true }
    });
    
    if (!marcador || marcador.planta.userId !== req.user.sub) {
      return res.status(404).json({ message: 'Marcador não encontrado' });
    }
    
    const marcadorAtualizado = await prisma.marcadorPlanta.update({
      where: { id: marcadorId },
      data: {
        texto,
        url: url || null,
        cor: cor || '#ef4444',
        posicaoX: parseFloat(posicaoX),
        posicaoY: parseFloat(posicaoY)
      }
    });
    
    console.log(`✅ [PUT /marcadores/${marcadorId}] Marcador atualizado`);
    res.json({ success: true, marcador: marcadorAtualizado });
  } catch (error) {
    console.error('❌ [PUT /marcadores/:id] Erro:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar marcador', error: error.message });
  }
});

// ✅ EXCLUIR MARCADOR
router.delete('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);
    
    // Verificar se o marcador existe e pertence ao usuário
    const marcador = await prisma.marcadorPlanta.findFirst({
      where: { id: marcadorId },
      include: { planta: true }
    });
    
    if (!marcador || marcador.planta.userId !== req.user.sub) {
      return res.status(404).json({ message: 'Marcador não encontrado' });
    }
    
    await prisma.marcadorPlanta.delete({
      where: { id: marcadorId }
    });
    
    console.log(`✅ [DELETE /marcadores/${marcadorId}] Marcador excluído`);
    res.json({ success: true, message: 'Marcador excluído com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /marcadores/:id] Erro:', error.message);
    res.status(500).json({ message: 'Erro ao excluir marcador', error: error.message });
  }
});

console.log('✅ [Plantas Routes] Configurado com Express');
module.exports = router;
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
