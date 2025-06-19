const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// ⭐ CONFIGURAÇÃO DE UPLOAD PARA DOCUMENTOS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/documentos');
    
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `doc-${uniqueSuffix}${extension}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    // Tipos de arquivo permitidos
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  }
});

// ⭐ LISTAR TODOS OS DOCUMENTOS
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /documentos] Usuário:', req.user.email);
    
    const { equipamentoId } = req.query;
    
    let whereCondition = {
      userId: req.user.sub
    };
    
    if (equipamentoId) {
      whereCondition.equipamentoId = parseInt(equipamentoId);
    }
    
    const documentos = await prisma.documento.findMany({
      where: whereCondition,
      include: {
        equipamento: {
          select: { 
            id: true, 
            nome: true, 
            tag: true,
            area: true,
            disciplina: true
          }
        },
        user: {
          select: { id: true, nome: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('🔍 [DEBUG] Total documentos do banco:', documentos.length);
    
    if (documentos.length > 0) {
      const primeiro = documentos[0];
      console.log('🔍 [DEBUG] Primeiro documento raw do banco:');
      console.log('  - id:', primeiro.id);
      console.log('  - titulo:', primeiro.titulo);
      console.log('  - nome:', primeiro.nome);
      console.log('  - tipo:', primeiro.tipo);
      console.log('  - equipamentoId:', primeiro.equipamentoId);
      console.log('  - equipamento objeto:', primeiro.equipamento);
      console.log('  - equipamento.nome:', primeiro.equipamento?.nome);
      console.log('  - equipamento.tag:', primeiro.equipamento?.tag);
    }

    // ⭐ MAPEAMENTO SIMPLES E CLARO
    const documentosFormatados = documentos.map(doc => {
      
      // ✅ MAPEAR CAMPOS BÁSICOS
      const equipamentoNome = doc.equipamento?.nome || doc.equipamento?.tag || 'Sem equipamento';
      
      const resultado = {
        // ✅ MANTER TODOS OS CAMPOS ORIGINAIS
        ...doc,
        
        // ✅ ADICIONAR CAMPOS ESPERADOS PELO FRONTEND
        description: doc.titulo || doc.nome || 'Sem título',
        type: doc.tipo || 'manual',
        asset: equipamentoNome,
        area: {
          code: doc.equipamento?.area || 'N/A',
          name: doc.equipamento?.area || 'Não definida'
        },
        discipline: doc.equipamento?.disciplina || 'N/A',
        revision: doc.revisao || '0',
        version: doc.versao || 1,
        code: `DOC-${doc.id.toString().padStart(4, '0')}`
      };
      
      console.log(`🔍 [DEBUG] Documento ${doc.id} mapeado:`, {
        titulo: doc.titulo,
        nome: doc.nome,
        tipo: doc.tipo,
        equipamentoOriginal: doc.equipamento,
        equipamentoNome: equipamentoNome,
        description: resultado.description,
        type: resultado.type,
        asset: resultado.asset
      });
      
      return resultado;
    });

    console.log(`✅ [GET /documentos] ${documentosFormatados.length} documentos formatados`);
    
    res.json(documentosFormatados);
    
  } catch (error) {
    console.error('❌ [GET /documentos] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar documentos', 
      error: error.message 
    });
  }
});

// ⭐ BUSCAR DOCUMENTO POR ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🔍 [GET /documentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    const documento = await prisma.documento.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      },
      include: {
        equipamento: {
          select: { id: true, nome: true, tag: true }
        },
        user: {
          select: { id: true, nome: true, email: true }
        }
      }
    });

    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }

    console.log(`✅ [GET /documentos/:id] Documento encontrado: ${documento.nome}`);
    
    res.json(documento);
  } catch (error) {
    console.error('❌ [GET /documentos/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar documento', 
      error: error.message 
    });
  }
});

// ⭐ FAZER UPLOAD DE DOCUMENTO
router.post('/upload', authMiddleware, upload.single('arquivo'), async (req, res) => {
  try {
    console.log('📤 [POST /documentos/upload] Início do upload');
    console.log('📤 [POST /documentos/upload] Body:', req.body);
    console.log('📤 [POST /documentos/upload] File:', req.file ? req.file.originalname : 'Nenhum arquivo');
    
    // ⭐ EXTRAIR CAMPOS DO BODY
    const { titulo, tipo, descricao, equipamentoId, versao, revisao } = req.body;
    
    // Validações
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ message: 'Título do documento é obrigatório' });
    }

    if (!equipamentoId) {
      return res.status(400).json({ message: 'Equipamento é obrigatório' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo é obrigatório para upload' });
    }

    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id: parseInt(equipamentoId),
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      // ⭐ REMOVER ARQUIVO SE EQUIPAMENTO NÃO ENCONTRADO
      try {
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Erro ao remover arquivo:', unlinkError);
      }
      return res.status(404).json({ message: 'Equipamento não encontrado ou não autorizado' });
    }

    // ⭐ CRIAR DOCUMENTO COM CAMPOS CORRETOS DO SCHEMA
    const documento = await prisma.documento.create({
      data: {
        nome: titulo.trim(),
        titulo: titulo.trim(),
        tipo: tipo || 'manual',
        descricao: descricao?.trim() || '',
        versao: parseInt(versao || '1'),
        revisao: revisao || '0',
        
        // ✅ CAMPOS CORRETOS CONFORME SCHEMA PRISMA:
        arquivo: req.file.path,                              // String - caminho completo
        fileName: req.file.originalname,                     // String - nome original
        pdfFileName: req.file.filename,                      // String - nome gerado
        tamanho: req.file.size,                             // Int - tamanho em bytes
        url: `/uploads/documentos/${req.file.filename}`,     // String - URL de acesso
        
        userId: req.user.sub,
        equipamentoId: parseInt(equipamentoId)
      },
      include: {
        equipamento: {
          select: { id: true, nome: true, tag: true }
        },
        user: {
          select: { id: true, nome: true, email: true }
        }
      }
    });

    console.log(`✅ [POST /documentos/upload] Documento criado: ${documento.id} - ${documento.titulo}`);
    console.log(`📁 [POST /documentos/upload] Arquivo salvo: ${req.file.path}`);
    
    res.status(201).json({
      success: true,
      message: 'Documento enviado com sucesso',
      documento
    });
    
  } catch (error) {
    console.error('❌ [POST /documentos/upload] Erro:', error.message);
    console.error('❌ [POST /documentos/upload] Stack:', error.stack);
    
    // ⭐ REMOVER ARQUIVO EM CASO DE ERRO
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path);
        console.log('🗑️ Arquivo removido após erro:', req.file.path);
      } catch (unlinkError) {
        console.error('Erro ao remover arquivo:', unlinkError);
      }
    }
    
    res.status(500).json({ 
      message: 'Erro ao fazer upload do documento', 
      error: error.message 
    });
  }
});

// ⭐ CRIAR DOCUMENTO SEM ARQUIVO (CORRIGIR TAMBÉM)
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('📄 [POST /documentos] Criando documento SEM arquivo');
    console.log('📄 [POST /documentos] Body:', req.body);
    
    const { titulo, tipo, equipamentoId, versao, revisao, descricao } = req.body;

    // Validações básicas
    if (!titulo?.trim()) {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }

    if (!equipamentoId) {
      return res.status(400).json({ message: 'Equipamento é obrigatório' });
    }

    // Verificar se equipamento pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id: parseInt(equipamentoId),
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado ou não autorizado' });
    }

    // ⭐ CRIAR DOCUMENTO SEM ARQUIVO - CAMPOS CORRETOS
    const documento = await prisma.documento.create({
      data: {
        nome: titulo.trim(),
        titulo: titulo.trim(),
        tipo: tipo || 'manual',
        descricao: descricao?.trim() || '',
        versao: parseInt(versao || '1'),
        revisao: revisao || '0',
        
        // ✅ CAMPOS DE ARQUIVO COMO NULL:
        arquivo: null,
        fileName: null,
        pdfFileName: null,
        tamanho: null,
        url: null,
        
        userId: req.user.sub,
        equipamentoId: parseInt(equipamentoId)
      },
      include: {
        equipamento: {
          select: { id: true, nome: true, tag: true }
        }
      }
    });

    console.log(`✅ [POST /documentos] Documento criado: ${documento.id} para equipamento: ${equipamento.nome}`);
    
    res.status(201).json({
      success: true,
      message: 'Documento criado com sucesso',
      documento
    });
    
  } catch (error) {
    console.error('❌ [POST /documentos] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao criar documento', 
      error: error.message 
    });
  }
});

// ⭐ ATUALIZAR DOCUMENTO
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('📝 [PUT /documentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    // Verificar se documento existe e pertence ao usuário
    const documentoExistente = await prisma.documento.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      }
    });

    if (!documentoExistente) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }

    const { nome, descricao, equipamentoId } = req.body;

    // Preparar dados para atualização
    const dadosAtualizacao = {};

    if (nome !== undefined) dadosAtualizacao.nome = nome.trim();
    if (descricao !== undefined) dadosAtualizacao.descricao = descricao?.trim() || '';

    // Verificar equipamento se fornecido
    if (equipamentoId !== undefined) {
      if (equipamentoId && equipamentoId !== '' && equipamentoId !== 'null') {
        const equipamento = await prisma.equipamento.findFirst({
          where: { 
            id: parseInt(equipamentoId),
            userId: req.user.sub 
          }
        });

        if (!equipamento) {
          return res.status(404).json({ message: 'Equipamento não encontrado' });
        }

        dadosAtualizacao.equipamentoId = parseInt(equipamentoId);
      } else {
        dadosAtualizacao.equipamentoId = null;
      }
    }

    // Atualizar documento
    const documento = await prisma.documento.update({
      where: { id },
      data: dadosAtualizacao,
      include: {
        equipamento: {
          select: { id: true, nome: true, tag: true }
        }
      }
    });

    console.log(`✅ [PUT /documentos/:id] Documento atualizado: ${documento.nome}`);
    
    res.json({
      success: true,
      message: 'Documento atualizado com sucesso',
      documento
    });
    
  } catch (error) {
    console.error('❌ [PUT /documentos/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao atualizar documento', 
      error: error.message 
    });
  }
});

// ⭐ EXCLUIR DOCUMENTO
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('🗑️ [DELETE /documentos/:id] ID:', id, 'Usuário:', req.user.email);
    
    // Buscar documento
    const documento = await prisma.documento.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      }
    });

    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }

    // Excluir registro do banco
    await prisma.documento.delete({
      where: { id }
    });

    // ✅ EXCLUIR ARQUIVO FÍSICO USANDO CAMPO CORRETO
    if (documento.arquivo && fs.existsSync(documento.arquivo)) {
      try {
        await fs.promises.unlink(documento.arquivo);
        console.log('✅ Arquivo físico removido:', documento.arquivo);
      } catch (err) {
        console.error('Erro ao remover arquivo físico:', err);
      }
    }

    console.log(`✅ [DELETE /documentos/:id] Documento excluído: ${documento.nome}`);
    
    res.json({
      success: true,
      message: 'Documento excluído com sucesso'
    });
    
  } catch (error) {
    console.error('❌ [DELETE /documentos/:id] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao excluir documento', 
      error: error.message 
    });
  }
});

// ⭐ DOWNLOAD DO DOCUMENTO
router.get('/:id/download', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('⬇️ [GET /documentos/:id/download] ID:', id, 'Usuário:', req.user.email);
    
    // Buscar documento
    const documento = await prisma.documento.findFirst({
      where: { 
        id,
        userId: req.user.sub 
      }
    });

    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }

    // ✅ VERIFICAR ARQUIVO USANDO CAMPO CORRETO
    if (!documento.arquivo || !fs.existsSync(documento.arquivo)) {
      return res.status(404).json({ message: 'Arquivo não encontrado no servidor' });
    }

    console.log(`✅ [GET /documentos/:id/download] Download iniciado: ${documento.fileName}`);
    
    // ✅ FAZER DOWNLOAD COM CAMPOS CORRETOS
    res.download(documento.arquivo, documento.fileName, (err) => {
      if (err) {
        console.error('Erro no download:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Erro ao fazer download do arquivo' });
        }
      }
    });
    
  } catch (error) {
    console.error('❌ [GET /documentos/:id/download] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao fazer download do documento', 
      error: error.message 
    });
  }
});

// ⭐ BUSCAR DOCUMENTOS POR EQUIPAMENTO (CORRIGIDO)
router.get('/equipamento/:equipamentoId', authMiddleware, async (req, res) => {
  try {
    const equipamentoId = parseInt(req.params.equipamentoId);
    console.log('📄 [GET /documentos/equipamento/:equipamentoId] ID:', equipamentoId);
    
    // Verificar se equipamento existe e pertence ao usuário
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id: equipamentoId,
        userId: req.user.sub 
      }
    });

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    const documentos = await prisma.documento.findMany({
      where: { 
        equipamentoId,
        userId: req.user.sub 
      },
      include: {
        user: {
          select: { id: true, nome: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`✅ [GET /documentos/equipamento/:equipamentoId] ${documentos.length} documentos encontrados`);
    
    res.json(documentos);
  } catch (error) {
    console.error('❌ [GET /documentos/equipamento/:equipamentoId] Erro:', error.message);
    res.status(500).json({ 
      message: 'Erro ao buscar documentos do equipamento', 
      error: error.message 
    });
  }
});

console.log('✅ [Documentos Routes] Configurado com upload/download');
module.exports = router;