const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configuração upload de imagens para plantas
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

// ✅ LISTAR PLANTAS - ADICIONAR LOGS DETALHADOS
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('🏭 [BACKEND] ========== GET /plantas ==========');
    console.log('🏭 [BACKEND] Usuário autenticado:', req.user.email);
    console.log('🏭 [BACKEND] User ID (sub):', req.user.sub);
    console.log('🏭 [BACKEND] Iniciando busca no banco de dados...');

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

    console.log('🏭 [BACKEND] Plantas encontradas no banco:', plantas.length);
    if (plantas.length > 0) {
      console.log('🏭 [BACKEND] Primeira planta raw do banco:', plantas[0]);
    }

    // Transformar caminhos de imagem para URLs públicas
    const plantasFormatadas = plantas.map(planta => ({
      ...planta,
      imageUrl: planta.imageUrl ? `http://localhost:3001${planta.imageUrl}` : null
    }));

    console.log('🏭 [BACKEND] Plantas formatadas para envio:', plantasFormatadas.length);
    if (plantasFormatadas.length > 0) {
      console.log('🏭 [BACKEND] Primeira planta formatada:', plantasFormatadas[0]);
    }

    console.log(`✅ [BACKEND] Enviando resposta: ${plantas.length} plantas`);
    res.json(plantasFormatadas);
  } catch (error) {
    console.error('❌ [BACKEND] Erro completo em GET /plantas:', error);
    console.error('❌ [BACKEND] Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Erro ao buscar plantas', 
      error: error.message 
    });
  }
});

// ✅ BUSCAR PLANTA POR ID - CORRIGIR INCLUDE
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🔍 [GET /plantas/:id] ID:', id);

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

    // ⭐ ADICIONAR: Transformar caminho de imagem para URL pública
    const plantaFormatada = {
      ...planta,
      imageUrl: planta.imageUrl ? `http://localhost:3001${planta.imageUrl}` : null
    };

    res.json(plantaFormatada);
  } catch (error) {
    console.error('❌ [GET /plantas/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar planta', 
      error: error.message 
    });
  }
});

// ✅ CRIAR NOVA PLANTA - CORRIGIR URL DA IMAGEM
router.post('/', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    console.log('📝 [BACKEND] ========== POST /plantas ==========');
    console.log('📝 [BACKEND] Usuário:', req.user.email);
    console.log('📝 [BACKEND] User ID:', req.user.sub);
    console.log('📝 [BACKEND] Body recebido:', req.body);
    console.log('📝 [BACKEND] Arquivo recebido:', req.file ? 'SIM' : 'NÃO');
    if (req.file) {
      console.log('📝 [BACKEND] Detalhes do arquivo:', {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path
      });
    }
    
    const { titulo, descricao } = req.body;

    if (!titulo?.trim()) {
      console.warn('⚠️ [BACKEND] Título não fornecido ou vazio');
      return res.status(400).json({ message: 'Título é obrigatório' });
    }

    const plantaData = {
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      userId: req.user.sub
    };

    console.log('📝 [BACKEND] Dados da planta preparados:', plantaData);

    if (req.file) {
      plantaData.imageUrl = `/uploads/plantas/${req.file.filename}`;
      plantaData.imagePath = req.file.path;
      console.log('📝 [BACKEND] URLs de imagem adicionadas:', {
        imageUrl: plantaData.imageUrl,
        imagePath: plantaData.imagePath
      });
    }

    console.log('📝 [BACKEND] Criando planta no banco de dados...');
    const planta = await prisma.planta.create({
      data: plantaData,
      include: {
        marcadores: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    console.log('📝 [BACKEND] Planta criada no banco:', planta);

    // Transformar caminho de imagem para URL pública
    const plantaFormatada = {
      ...planta,
      imageUrl: planta.imageUrl ? `http://localhost:3001${planta.imageUrl}` : null
    };

    console.log('📝 [BACKEND] Planta formatada para resposta:', plantaFormatada);
    console.log(`✅ [BACKEND] Planta criada com sucesso: ${planta.titulo}`);
    res.status(201).json(plantaFormatada);
  } catch (error) {
    console.error('❌ [BACKEND] Erro completo em POST /plantas:', error);
    console.error('❌ [BACKEND] Stack trace:', error.stack);
    
    if (req.file) {
      console.log('🗑️ [BACKEND] Removendo arquivo por erro...');
      fs.unlink(req.file.path, err => {
        if (err) console.error('❌ [BACKEND] Erro ao remover arquivo:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Erro ao criar planta', 
      error: error.message 
    });
  }
});

// ✅ ATUALIZAR PLANTA - CORRIGIR URL DA IMAGEM
router.put('/:id', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('✏️ [PUT /plantas/:id] ID:', id);

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
      // Remover imagem anterior se existir
      if (planta.imagePath && fs.existsSync(planta.imagePath)) {
        fs.unlink(planta.imagePath, err => {
          if (err) console.error('Erro ao remover imagem anterior:', err);
        });
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

    // ⭐ ADICIONAR: Transformar caminho de imagem para URL pública
    const plantaFormatada = {
      ...plantaAtualizada,
      imageUrl: plantaAtualizada.imageUrl ? `http://localhost:3001${plantaAtualizada.imageUrl}` : null
    };

    console.log(`✅ [PUT /plantas/:id] Planta atualizada: ${plantaAtualizada.titulo}`);
    res.json(plantaFormatada);
  } catch (error) {
    console.error('❌ [PUT /plantas/:id] Erro:', error.message);
    
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Erro ao remover arquivo:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Erro ao atualizar planta', 
      error: error.message 
    });
  }
});

// Excluir planta (mantida igual)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🗑️ [DELETE /plantas/:id] ID:', id);

    const planta = await prisma.planta.findFirst({
      where: { id, userId: req.user.sub }
    });

    if (!planta) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    // Remover imagem física se existir
    if (planta.imagePath && fs.existsSync(planta.imagePath)) {
      fs.unlink(planta.imagePath, err => {
        if (err) console.error('Erro ao remover imagem:', err);
      });
    }

    await prisma.planta.delete({
      where: { id }
    });

    console.log(`✅ [DELETE /plantas/:id] Planta excluída: ${planta.titulo}`);
    res.json({ message: 'Planta excluída com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /plantas/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao excluir planta', 
      error: error.message 
    });
  }
});

// ⭐ ROTAS PARA MARCADORES (mantidas iguais - estão corretas)

// Adicionar marcador
router.post('/:id/marcadores', authMiddleware, async (req, res) => {
  try {
    const plantaId = parseInt(req.params.id);
    console.log('📌 [BACKEND] ========== POST /plantas/:id/marcadores ==========');
    console.log('📌 [BACKEND] Planta ID:', plantaId);
    console.log('📌 [BACKEND] Usuário:', req.user.email);
    console.log('📌 [BACKEND] Dados do marcador recebidos:', req.body);

    const planta = await prisma.planta.findFirst({
      where: { id: plantaId, userId: req.user.sub }
    });

    if (!planta) {
      console.warn('⚠️ [BACKEND] Planta não encontrada ou não pertence ao usuário');
      return res.status(404).json({ message: 'Planta não encontrada' });
    }

    console.log('📌 [BACKEND] Planta encontrada:', planta.titulo);

    const { titulo, descricao, posicaoX, posicaoY, tipo, cor, equipamentoId } = req.body;

    if (!titulo?.trim()) {
      console.warn('⚠️ [BACKEND] Título do marcador não fornecido');
      return res.status(400).json({ message: 'Título do marcador é obrigatório' });
    }

    const marcadorData = {
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      posicaoX: parseFloat(posicaoX),
      posicaoY: parseFloat(posicaoY),
      tipo: tipo || 'equipamento',
      cor: cor || '#ef4444',
      plantaId
    };

    if (equipamentoId) {
      marcadorData.equipamentoId = parseInt(equipamentoId);
    }

    console.log('📌 [BACKEND] Dados do marcador preparados:', marcadorData);

    const marcador = await prisma.marcador.create({
      data: marcadorData
    });

    console.log('📌 [BACKEND] Marcador criado no banco:', marcador);
    console.log(`✅ [BACKEND] Marcador criado com sucesso: ${marcador.titulo}`);
    res.status(201).json(marcador);
  } catch (error) {
    console.error('❌ [BACKEND] Erro completo em POST /plantas/:id/marcadores:', error);
    console.error('❌ [BACKEND] Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Erro ao criar marcador', 
      error: error.message 
    });
  }
});

// Atualizar marcador
router.put('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);
    console.log('✏️ [PUT /plantas/marcadores/:marcadorId] ID:', marcadorId);

    const marcador = await prisma.marcador.findFirst({
      where: { 
        id: marcadorId,
        planta: { userId: req.user.sub }
      }
    });

    if (!marcador) {
      return res.status(404).json({ message: 'Marcador não encontrado' });
    }

    const { titulo, descricao, posicaoX, posicaoY, tipo, cor, equipamentoId } = req.body;
    const updateData = {};

    if (titulo !== undefined) updateData.titulo = titulo.trim();
    if (descricao !== undefined) updateData.descricao = descricao?.trim() || '';
    if (posicaoX !== undefined) updateData.posicaoX = parseFloat(posicaoX);
    if (posicaoY !== undefined) updateData.posicaoY = parseFloat(posicaoY);
    if (tipo !== undefined) updateData.tipo = tipo;
    if (cor !== undefined) updateData.cor = cor;
    if (equipamentoId !== undefined) {
      updateData.equipamentoId = equipamentoId ? parseInt(equipamentoId) : null;
    }

    const marcadorAtualizado = await prisma.marcador.update({
      where: { id: marcadorId },
      data: updateData
    });

    console.log(`✅ [PUT /plantas/marcadores/:marcadorId] Marcador atualizado: ${marcadorAtualizado.titulo}`);
    res.json(marcadorAtualizado);
  } catch (error) {
    console.error('❌ [PUT /plantas/marcadores/:marcadorId] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao atualizar marcador', 
      error: error.message 
    });
  }
});

// Excluir marcador
router.delete('/marcadores/:marcadorId', authMiddleware, async (req, res) => {
  try {
    const marcadorId = parseInt(req.params.marcadorId);
    console.log('🗑️ [DELETE /plantas/marcadores/:marcadorId] ID:', marcadorId);

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

    console.log(`✅ [DELETE /plantas/marcadores/:marcadorId] Marcador excluído`);
    res.json({ message: 'Marcador excluído com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /plantas/marcadores/:marcadorId] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao excluir marcador', 
      error: error.message 
    });
  }
});

console.log('✅ [Plantas Routes] Configurado com upload e marcadores');
module.exports = router;