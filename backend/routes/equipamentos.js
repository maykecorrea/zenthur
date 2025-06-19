const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// CONFIGURAÇÃO UPLOAD DE IMAGENS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/equipamentos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `equip-${uniqueSuffix}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo não suportado. Envie apenas imagens (JPG, PNG, GIF).'), false);
    }
  }
});

// LISTAR TODOS OS EQUIPAMENTOS
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('🔍 [GET /equipamentos] Usuário:', req.user.email);
    
    const equipamentos = await prisma.equipamento.findMany({
      where: { 
        userId: req.user.sub
      },
      include: {
        categoria: true
      },
      orderBy: { 
        nome: 'asc' 
      }
    });
    
    console.log(`✅ [GET /equipamentos] ${equipamentos.length} equipamentos encontrados`);
    res.json(equipamentos);
  } catch (error) {
    console.error('❌ [GET /equipamentos] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar equipamentos', 
      error: error.message 
    });
  }
});

// DETALHES DE UM EQUIPAMENTO
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🔍 [GET /equipamentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      },
      include: {
        categoria: true
      }
    });
    
    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    
    console.log(`✅ [GET /equipamentos/:id] Equipamento encontrado: ${equipamento.nome}`);
    res.json(equipamento);
  } catch (error) {
    console.error('❌ [GET /equipamentos/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar equipamento', 
      error: error.message 
    });
  }
});

// CRIAR EQUIPAMENTO
router.post('/', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    console.log('➕ [POST /equipamentos] Usuário:', req.user.email);
    console.log('➕ [POST /equipamentos] Body:', req.body);
    
    const { 
      nome, tag, numeroSerie, fabricante, modelo, dataAquisicao, 
      localizacao, area, unidade, disciplina, detalhes, categoriaId 
    } = req.body;
    
    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome do equipamento é obrigatório' });
    }
    
    // Preparar dados para criação
    const equipamentoData = {
      nome: nome.trim(),
      userId: req.user.sub,
      tag: tag || null,
      numeroSerie: numeroSerie || null,
      fabricante: fabricante || null,
      modelo: modelo || null,
      localizacao: localizacao || null,
      area: area || null,
      unidade: unidade || null,
      disciplina: disciplina || null,
      detalhes: detalhes || null
    };
    
    // Tratar data de aquisição
    if (dataAquisicao) {
      equipamentoData.dataAquisicao = new Date(dataAquisicao);
    }
    
    // Tratar categoria (se informada)
    if (categoriaId && categoriaId !== 'null') {
      equipamentoData.categoriaId = parseInt(categoriaId);
    }
    
    // Se tiver imagem no upload
    if (req.file) {
      equipamentoData.imagem = req.file.path;
    }

    // Criar equipamento
    const equipamento = await prisma.equipamento.create({
      data: equipamentoData,
      include: {
        categoria: true
      }
    });

    console.log(`✅ [POST /equipamentos] Equipamento criado: ${equipamento.nome}`);
    res.status(201).json(equipamento);
  } catch (error) {
    console.error('❌ [POST /equipamentos] Erro:', error);
    // Remover arquivo enviado em caso de erro
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Erro ao remover arquivo:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Erro ao criar equipamento', 
      error: error.message 
    });
  }
});

// ATUALIZAR EQUIPAMENTO
router.put('/:id', authMiddleware, upload.single('imagem'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('✏️ [PUT /equipamentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamentoExistente = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      }
    });

    if (!equipamentoExistente) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    const { 
      nome, tag, numeroSerie, fabricante, modelo, dataAquisicao, 
      localizacao, area, unidade, disciplina, detalhes, categoriaId 
    } = req.body;
    
    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome do equipamento é obrigatório' });
    }

    // Preparar dados para atualização
    const equipamentoData = {
      nome: nome.trim(),
      tag: tag || null,
      numeroSerie: numeroSerie || null,
      fabricante: fabricante || null,
      modelo: modelo || null,
      localizacao: localizacao || null,
      area: area || null,
      unidade: unidade || null,
      disciplina: disciplina || null,
      detalhes: detalhes || null
    };
    
    // Tratar data de aquisição
    if (dataAquisicao) {
      equipamentoData.dataAquisicao = new Date(dataAquisicao);
    }
    
    // Tratar categoria (se informada)
    if (categoriaId && categoriaId !== 'null') {
      equipamentoData.categoriaId = parseInt(categoriaId);
    } else {
      equipamentoData.categoriaId = null;
    }
    
    // Se tiver imagem no upload
    if (req.file) {
      equipamentoData.imagem = req.file.path;
      
      // Remover imagem anterior se existir
      if (equipamentoExistente.imagem && fs.existsSync(equipamentoExistente.imagem)) {
        fs.unlink(equipamentoExistente.imagem, err => {
          if (err) console.error('Erro ao remover imagem anterior:', err);
        });
      }
    }

    // Atualizar equipamento
    const equipamento = await prisma.equipamento.update({
      where: { id },
      data: equipamentoData,
      include: {
        categoria: true
      }
    });

    console.log(`✅ [PUT /equipamentos/:id] Equipamento atualizado: ${equipamento.nome}`);
    res.json(equipamento);
  } catch (error) {
    console.error('❌ [PUT /equipamentos/:id] Erro:', error.message);
    
    // Remover arquivo enviado em caso de erro
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Erro ao remover arquivo:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Erro ao atualizar equipamento', 
      error: error.message 
    });
  }
});

// EXCLUIR EQUIPAMENTO
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🗑️ [DELETE /equipamentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      },
      include: {
        _count: {
          select: { 
            manutencoes: true,
            documentos: true
          }
        }
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    // Verificar dependências
    const dependenciasMsg = [];
    
    if (equipamento._count.manutencoes > 0) {
      dependenciasMsg.push(`${equipamento._count.manutencoes} manutenção(ões)`);
    }
    
    if (equipamento._count.documentos > 0) {
      dependenciasMsg.push(`${equipamento._count.documentos} documento(s)`);
    }
    
    if (dependenciasMsg.length > 0) {
      return res.status(400).json({
        message: `Não é possível excluir o equipamento pois ele possui: ${dependenciasMsg.join(' e ')}`
      });
    }

    // Remover imagem se existir
    if (equipamento.imagem && fs.existsSync(equipamento.imagem)) {
      fs.unlink(equipamento.imagem, err => {
        if (err) console.error('Erro ao remover imagem:', err);
      });
    }

    // Excluir equipamento
    await prisma.equipamento.delete({
      where: { id }
    });

    console.log(`✅ [DELETE /equipamentos/:id] Equipamento excluído: ${equipamento.nome}`);
    res.json({ message: 'Equipamento excluído com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE /equipamentos/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao excluir equipamento', 
      error: error.message 
    });
  }
});

// BUSCAR DOCUMENTOS DE UM EQUIPAMENTO
router.get('/:id/documentos', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('📄 [GET /equipamentos/:id/documentos] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    
    // Buscar documentos
    const documentos = await prisma.documento.findMany({
      where: { 
        equipamentoId: id,
        userId: req.user.sub  // Garantir que só vê documentos do usuário
      },
      orderBy: { 
        createdAt: 'desc' 
      }
    });
    
    console.log(`✅ [GET /equipamentos/:id/documentos] ${documentos.length} documentos encontrados`);
    res.json(documentos);
  } catch (error) {
    console.error('❌ [GET /equipamentos/:id/documentos] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar documentos', 
      error: error.message 
    });
  }
});

// BUSCAR MANUTENÇÕES DE UM EQUIPAMENTO
router.get('/:id/manutencoes', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🔧 [GET /equipamentos/:id/manutencoes] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    
    // Buscar manutenções
    const manutencoes = await prisma.manutencao.findMany({
      where: { 
        equipamentoId: id,
        userId: req.user.sub  // Garantir que só vê manutenções do usuário
      },
      orderBy: { 
        dataHora: 'desc' 
      }
    });
    
    console.log(`✅ [GET /equipamentos/:id/manutencoes] ${manutencoes.length} manutenções encontradas`);
    res.json(manutencoes);
  } catch (error) {
    console.error('❌ [GET /equipamentos/:id/manutencoes] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar manutenções', 
      error: error.message 
    });
  }
});

// ADICIONAR DOCUMENTO AO EQUIPAMENTO
router.post('/:id/documentos', authMiddleware, upload.single('arquivo'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('📄 [POST /equipamentos/:id/documentos] ID:', id, 'Usuário:', req.user.email);
    
    const { titulo, tipo, descricao } = req.body;
    
    // Validação
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ message: 'Título do documento é obrigatório' });
    }
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id, 
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    // Preparar dados do documento
    const documentoData = {
      titulo: titulo.trim(),
      tipo: tipo || 'manual',
      descricao: descricao || null,
      equipamentoId: id,
      userId: req.user.sub
    };
    
    // Se tiver arquivo
    if (req.file) {
      documentoData.arquivo = req.file.path;
      documentoData.fileName = req.file.originalname;
    }
    
    // Criar documento
    const documento = await prisma.documento.create({
      data: documentoData
    });
    
    console.log(`✅ [POST /equipamentos/:id/documentos] Documento criado: ${documento.titulo}`);
    res.status(201).json(documento);
  } catch (error) {
    console.error('❌ [POST /equipamentos/:id/documentos] Erro:', error.message);
    
    // Remover arquivo enviado em caso de erro
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Erro ao remover arquivo:', err);
      });
    }
    
    res.status(500).json({ 
      message: 'Erro ao adicionar documento', 
      error: error.message 
    });
  }
});

console.log('✅ [Equipamentos Routes] Configurado com Prisma');
module.exports = router;