const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ⭐ LISTAR TODAS AS MANUTENÇÕES
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, equipamentoId, userId, page = 1, limit = 50 } = req.query;
    
    let whereCondition = {};
    
    // Filtros opcionais
    if (status) whereCondition.status = status;
    if (equipamentoId) whereCondition.equipamentoId = parseInt(equipamentoId);
    if (userId) whereCondition.userId = parseInt(userId);
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [manutencoes, total] = await Promise.all([
      prisma.manutencao.findMany({
        where: whereCondition,
        include: {
          user: {
            select: { id: true, nome: true, email: true, telefone: true, empresa: true }
          },
          equipamento: {
            select: { id: true, tag: true, nome: true, area: true, categoria: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.manutencao.count({ where: whereCondition })
    ]);
    
    res.json({
      manutencoes,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar manutenções', 
      error: error.message 
    });
  }
});

// ⭐ CRIAR NOVA MANUTENÇÃO
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { 
      titulo, 
      descricao, 
      equipamentoId, 
      prioridade = 'media',
      dataPrevisao,
      observacoes 
    } = req.body;
    
    // Validações
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }
    
    if (!equipamentoId) {
      return res.status(400).json({ message: 'Equipamento é obrigatório' });
    }
    
    // Verificar se equipamento existe
    const equipamento = await prisma.equipamento.findUnique({
      where: { id: parseInt(equipamentoId) }
    });
    
    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    
    // Gerar código único
    const lastManutencao = await prisma.manutencao.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { codigo: true }
    });
    
    let proximoCodigo = 1;
    if (lastManutencao?.codigo) {
      const match = lastManutencao.codigo.match(/MNT(\d+)/);
      if (match) {
        proximoCodigo = parseInt(match[1]) + 1;
      }
    }
    
    const codigo = `MNT${proximoCodigo.toString().padStart(4, '0')}`;
    
    const manutencao = await prisma.manutencao.create({
      data: {
        codigo,
        titulo: titulo.trim(),
        descricao: descricao?.trim() || '',
        equipamentoId: parseInt(equipamentoId),
        userId: req.user.sub,
        prioridade,
        status: 'recebida',
        dataPrevisao: dataPrevisao ? new Date(dataPrevisao) : null,
        observacoes: observacoes?.trim() || ''
      },
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true, categoria: true }
        }
      }
    });
    
    console.log(`✅ [POST /manutencoes] Criada: ${codigo} - ${titulo}`);
    
    res.status(201).json({
      success: true,
      message: 'Manutenção criada com sucesso',
      manutencao
    });
    
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    res.status(500).json({ 
      message: 'Erro ao criar manutenção', 
      error: error.message 
    });
  }
});

// ⭐ ROTA HISTÓRICO (DEVE VIR ANTES DA /:id)
router.get('/historico', authMiddleware, async (req, res) => {
  try {
    console.log('📚 Buscando histórico de manutenções...');
    
    const manutencoesArquivadas = await prisma.manutencao.findMany({
      where: {
        status: 'arquivada'
      },
      include: {
        equipamento: true,
        user: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        dataArquivamento: 'desc'
      }
    });

    console.log(`✅ ${manutencoesArquivadas.length} manutenções arquivadas encontradas`);

    res.json({
      success: true,
      manutencoes: manutencoesArquivadas,
      total: manutencoesArquivadas.length
    });

  } catch (error) {
    console.error('❌ Erro ao buscar histórico:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// ⭐ ADICIONAR ENDPOINT DE ARQUIVAR (ANTES DA ROTA /:id)
router.patch('/:id/arquivar', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('📦 Arquivando manutenção ID:', id);

    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID inválido' 
      });
    }

    // Verificar se existe
    const manutencaoExistente = await prisma.manutencao.findUnique({
      where: { id }
    });
    
    if (!manutencaoExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Manutenção não encontrada' 
      });
    }
    
    // Arquivar
    const manutencao = await prisma.manutencao.update({
      where: { id },
      data: { 
        status: 'arquivada',
        dataArquivamento: new Date()
      }
    });
    
    console.log('✅ Manutenção arquivada:', manutencao.codigo);
    
    res.json({
      success: true,
      message: 'Manutenção arquivada com sucesso',
      manutencao
    });
    
  } catch (error) {
    console.error('❌ Erro ao arquivar:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao arquivar manutenção', 
      error: error.message 
    });
  }
});

// ⭐ ATUALIZAR STATUS
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status não informado' });
    }
    
    const statusPermitidos = ['recebida', 'analise', 'execucao', 'concluida', 'arquivada'];
    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }
    
    const manutencao = await prisma.manutencao.findUnique({
      where: { id }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    const manutencaoAtualizada = await prisma.manutencao.update({
      where: { id },
      data: { status }
    });
    
    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      manutencao: manutencaoAtualizada
    });
    
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ 
      message: 'Erro ao atualizar status', 
      error: error.message 
    });
  }
});

// ⭐ LISTAR POR EQUIPAMENTO
router.get('/equipamento/:equipamentoId', authMiddleware, async (req, res) => {
  try {
    const equipamentoId = parseInt(req.params.equipamentoId);
    const includeArchived = req.query.includeArchived === 'true';
    
    const whereCondition = { equipamentoId };
    
    if (!includeArchived) {
      whereCondition.status = {
        not: 'arquivada'
      };
    }
    
    const manutencoes = await prisma.manutencao.findMany({
      where: whereCondition,
      include: {
        user: {
          select: { id: true, nome: true, email: true, telefone: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções do equipamento:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar manutenções do equipamento', 
      error: error.message 
    });
  }
});

// ⭐ ADICIONAR ENDPOINT ESPECÍFICO PARA PREVENTIVAS (ANTES DA ROTA /:id)
router.get('/preventivas', authMiddleware, async (req, res) => {
  try {
    console.log('🔧 Buscando manutenções preventivas...');
    
    const preventivas = await prisma.manutencao.findMany({
      where: {
        OR: [
          { 
            tipo: { 
              not: null,
              contains: 'preventiva'
            } 
          },
          { 
            tipo: { 
              not: null,
              contains: 'Preventiva'
            } 
          },
          { 
            tipo: { 
              not: null,
              contains: 'PREVENTIVA'
            } 
          },
          { titulo: { contains: 'preventiva' } },
          { titulo: { contains: 'Preventiva' } },
          { titulo: { contains: 'preventivo' } },
          { titulo: { contains: 'Preventivo' } },
          { descricao: { contains: 'preventiva' } },
          { descricao: { contains: 'Preventiva' } },
          { descricao: { contains: 'preventivo' } },
          { descricao: { contains: 'Preventivo' } }
        ],
        status: { not: 'arquivada' }
      },
      include: {
        user: { 
          select: { id: true, nome: true, email: true } 
        },
        equipamento: { 
          select: { 
            id: true, 
            tag: true, 
            nome: true, 
            area: true, 
            tipo: true 
          } 
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`✅ ${preventivas.length} manutenções preventivas encontradas`);
    
    res.json({
      success: true,
      manutencoes: preventivas,
      total: preventivas.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar preventivas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar manutenções preventivas',
      error: error.message
    });
  }
});

// ⭐ BUSCAR MANUTENÇÃO POR ID (DEVE VIR DEPOIS)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const manutencao = await prisma.manutencao.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, nome: true, email: true, telefone: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true, categoria: true }
        }
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    res.json(manutencao);
  } catch (error) {
    console.error('Erro ao buscar manutenção:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar manutenção', 
      error: error.message 
    });
  }
});

// ⭐ ADICIONAR ESTA NOVA ROTA ANTES DA ROTA PUT /:id
router.put('/:id/reagendar', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { 
      dataProximaManutencao,
      dataPrimeiraRevisao,
      observacoes 
    } = req.body;

    console.log('📅 Reagendando manutenção:', {
      id,
      dataProximaManutencao,
      dataPrimeiraRevisao,
      observacoes
    });

    // Verificar se a manutenção existe
    const manutencaoExistente = await prisma.manutencao.findUnique({
      where: { id }
    });

    if (!manutencaoExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Manutenção não encontrada' 
      });
    }

    // Validar datas
    if (dataProximaManutencao) {
      const novaData = new Date(dataProximaManutencao);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (novaData < hoje) {
        return res.status(400).json({
          success: false,
          message: 'A data da próxima manutenção deve ser posterior à data atual'
        });
      }
    }

    // Preparar dados para atualização
    const updateData = {
      updatedAt: new Date()
    };

    if (dataProximaManutencao) {
      updateData.dataProximaManutencao = new Date(dataProximaManutencao);
    }

    if (dataPrimeiraRevisao) {
      updateData.dataPrimeiraRevisao = new Date(dataPrimeiraRevisao);
    }

    if (observacoes !== undefined) {
      updateData.observacoes = observacoes.trim();
    }

    // Atualizar no banco
    const manutencaoAtualizada = await prisma.manutencao.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, nome: true, email: true }
        },
        equipamento: {
          select: { 
            id: true, 
            tag: true, 
            nome: true, 
            area: true, 
            tipo: true 
          }
        }
      }
    });

    console.log('✅ Manutenção reagendada:', manutencaoAtualizada.codigo);

    res.json({
      success: true,
      message: 'Manutenção reagendada com sucesso',
      manutencao: manutencaoAtualizada
    });

  } catch (error) {
    console.error('❌ Erro ao reagendar manutenção:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// ⭐ ATUALIZAR A ROTA PUT /:id EXISTENTE PARA INCLUIR CAMPOS DE DATA
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { 
      titulo, 
      descricao, 
      prioridade, 
      dataPrevisao, 
      observacoes,
      status,
      dataProximaManutencao,  // ← ADICIONADO
      dataPrimeiraRevisao     // ← ADICIONADO
    } = req.body;
    
    // Verificar se existe
    const manutencaoExistente = await prisma.manutencao.findUnique({
      where: { id }
    });
    
    if (!manutencaoExistente) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    // Preparar dados para atualização
    const updateData = {};
    
    if (titulo !== undefined) updateData.titulo = titulo.trim();
    if (descricao !== undefined) updateData.descricao = descricao.trim();
    if (prioridade !== undefined) updateData.prioridade = prioridade;
    if (observacoes !== undefined) updateData.observacoes = observacoes.trim();
    if (dataPrevisao !== undefined) {
      updateData.dataPrevisao = dataPrevisao ? new Date(dataPrevisao) : null;
    }
    
    // ⭐ ADICIONADOS CAMPOS DE REAGENDAMENTO
    if (dataProximaManutencao !== undefined) {
      updateData.dataProximaManutencao = dataProximaManutencao ? new Date(dataProximaManutencao) : null;
    }
    
    if (dataPrimeiraRevisao !== undefined) {
      updateData.dataPrimeiraRevisao = dataPrimeiraRevisao ? new Date(dataPrimeiraRevisao) : null;
    }
    
    if (status !== undefined) {
      const statusPermitidos = ['recebida', 'analise', 'execucao', 'concluida', 'arquivada'];
      if (!statusPermitidos.includes(status)) {
        return res.status(400).json({ message: 'Status inválido' });
      }
      updateData.status = status;
    }
    
    const manutencao = await prisma.manutencao.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true }
        }
      }
    });
    
    res.json({
      success: true,
      message: 'Manutenção atualizada com sucesso',
      manutencao
    });
    
  } catch (error) {
    console.error('Erro ao atualizar manutenção:', error);
    res.status(500).json({ 
      message: 'Erro ao atualizar manutenção', 
      error: error.message 
    });
  }
});

// ⭐ DELETAR MANUTENÇÃO
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Verificar se existe
    const manutencao = await prisma.manutencao.findUnique({
      where: { id }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    await prisma.manutencao.delete({
      where: { id }
    });
    
    res.json({
      success: true,
      message: 'Manutenção excluída com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao deletar manutenção:', error);
    res.status(500).json({ 
      message: 'Erro ao deletar manutenção', 
      error: error.message 
    });
  }
});

console.log('✅ [Manutencoes Routes] Configurado com CRUD completo + Reagendamento');
module.exports = router;
