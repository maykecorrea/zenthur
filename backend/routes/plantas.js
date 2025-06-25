const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configuração upload de imagens para plantas (com proteção contra Path Injection)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/plantas');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname || '').toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      ext = '.jpg';
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `planta-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato não suportado. Use JPG, PNG, GIF ou WebP.'), false);
    }
  }
});

const baseUrl = 'https://zenthur.com:4001';

// LISTAR PLANTAS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const plantas = await prisma.planta.findMany({
      where: { userId: req.user.sub },
      include: {
        marcadores: {
          orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: { marcadores: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const plantasFormatadas = plantas.map(planta => ({
      ...planta,
      imageUrl: planta.imageUrl ? `${baseUrl}${planta.imageUrl}` : null
    }));

    res.json(plantasFormatadas);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar plantas', 
      error: error.message 
    });
  }
});

// BUSCAR PLANTA POR ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const planta = await prisma.planta.findFirst({
      where: { id, userId: req.user.sub },
      include: {
        marcadores: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    const plantaFormatada = {
      ...planta,
      imageUrl: planta.imageUrl ? `${baseUrl}${planta.imageUrl}` : null
    };

    res.json(plantaFormatada);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar planta', 
      error: error.message 
    });
  }
});

// CRIAR NOVA PLANTA
router.post('/', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo?.trim()) {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }

    const plantaData = {
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      userId: req.user.sub
    };

    if (req.file) {
      plantaData.imageUrl = `/uploads/plantas/${req.file.filename}`;
      plantaData.imagePath = req.file.path;
    }

    const planta = await prisma.planta.create({
      data: plantaData,
      include: {
        marcadores: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    const plantaFormatada = {
      ...planta,
      imageUrl: planta.imageUrl ? `${baseUrl}${planta.imageUrl}` : null
    };

    res.status(201).json(plantaFormatada);
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).json({ 
      message: 'Erro ao criar planta', 
      error: error.message 
    });
  }
});

// ATUALIZAR PLANTA
router.put('/:id', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const planta = await prisma.planta.findFirst({
      where: { id, userId: req.user.sub }
    });

    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    const { titulo, descricao } = req.body;
    const updateData = {};

    if (titulo !== undefined) updateData.titulo = titulo.trim();
    if (descricao !== undefined) updateData.descricao = descricao?.trim() || '';

    if (req.file) {
      if (planta.imagePath && fs.existsSync(planta.imagePath)) {
        fs.unlink(planta.imagePath, () => {});
      }
      updateData.imageUrl = `/uploads/plantas/${req.file.filename}`;
      updateData.imagePath = req.file.path;
    }

    const plantaAtualizada = await prisma.planta.update({
      where: { id },
      data: updateData,
      include: {
        marcadores: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    const plantaFormatada = {
      ...plantaAtualizada,
      imageUrl: plantaAtualizada.imageUrl ? `${baseUrl}${plantaAtualizada.imageUrl}` : null
    };

    res.json(plantaFormatada);
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).json({ 
      message: 'Erro ao atualizar planta', 
      error: error.message 
    });
  }
});

// EXCLUIR PLANTA
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const planta = await prisma.planta.findFirst({
      where: { id, userId: req.user.sub }
    });

    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    if (planta.imagePath && fs.existsSync(planta.imagePath)) {
      fs.unlink(planta.imagePath, () => {});
    }

    await prisma.planta.delete({
      where: { id }
    });

    res.json({ message: 'Planta excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao excluir planta', 
      error: error.message 
    });
  }
});

// ADICIONAR MARCADOR
router.post('/:id/marcadores', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.id);

    const planta = await prisma.planta.findFirst({
      where: { id: plantaId, userId: req.user.sub }
    });

    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    const { texto, descricao, posicaoX, posicaoY, tipo, cor, equipamentoId, url } = req.body;

    if (!texto?.trim()) {
      return res.status(400).json({ message: 'Texto do marcador é obrigatório' });
    }

    const marcadorData = {
      texto: texto.trim(),
      descricao: descricao?.trim() || '',
      posicaoX: parseFloat(posicaoX),
      posicaoY: parseFloat(posicaoY),
      tipo: tipo || 'equipamento',
      cor: cor || '#ef4444',
      plantaId,
      url: url ? url.trim() : null
    };

    if (equipamentoId) {
      marcadorData.equipamentoId = parseInt(equipamentoId);
    }

    const marcador = await prisma.marcador.create({
      data: marcadorData
    });

    res.status(201).json(marcador);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao criar marcador', 
      error: error.message 
    });
  }
});

// ATUALIZAR MARCADOR
router.put('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);

    const marcador = await prisma.marcador.findFirst({
      where: { 
        id: marcadorId,
        planta: { userId: req.user.sub }
      }
    });

    if (!marcador) {
      return res.status(404).json({ message: 'Marcador não encontrado' });
    }

    const { texto, descricao, posicaoX, posicaoY, tipo, cor, equipamentoId, url } = req.body;
    const updateData = {};

    if (texto !== undefined) updateData.texto = texto.trim();
    if (descricao !== undefined) updateData.descricao = descricao?.trim() || '';
    if (posicaoX !== undefined) updateData.posicaoX = parseFloat(posicaoX);
    if (posicaoY !== undefined) updateData.posicaoY = parseFloat(posicaoY);
    if (tipo !== undefined) updateData.tipo = tipo;
    if (cor !== undefined) updateData.cor = cor;
    if (url !== undefined) updateData.url = url ? url.trim() : null;
    if (equipamentoId !== undefined) {
      updateData.equipamentoId = equipamentoId ? parseInt(equipamentoId) : null;
    }

    const marcadorAtualizado = await prisma.marcador.update({
      where: { id: marcadorId },
      data: updateData
    });

    res.json(marcadorAtualizado);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao atualizar marcador', 
      error: error.message 
    });
  }
});

// EXCLUIR MARCADOR
router.delete('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);

    const marcador = await prisma.marcador.findFirst({
      where: { 
        id: marcadorId,
        planta: { userId: req.user.sub }
      }
    });

    if (!marcador) {
      return res.status(404).json({ message: 'Marcador não encontrado' });
    }

    await prisma.marcador.delete({
      where: { id: marcadorId }
    });

    res.json({ message: 'Marcador excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao excluir marcador', 
      error: error.message 
    });
  }
});

module.exports = router;
