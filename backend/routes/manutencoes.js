const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ⭐ LISTAR TODAS AS MANUTENÇÕES
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, equipamentoId, userId, page = 1, limit = 50 } = req.query;
    
<<<<<<< HEAD
    let whereCondition = { userId: req.user.sub };
=======
    let whereCondition = {};
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    // Filtros opcionais
    if (status) whereCondition.status = status;
    if (equipamentoId) whereCondition.equipamentoId = parseInt(equipamentoId);
    if (userId) whereCondition.userId = parseInt(userId);
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // ✅ CORRIGIR O INCLUDE DAS MANUTENÇÕES
    const [manutencoes, total] = await Promise.all([
      prisma.manutencao.findMany({
        where: whereCondition,
        include: {
          user: {  // ✅ USAR 'user' EM VEZ DE 'autor'
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

// ⭐ HISTÓRICO (ATUALIZADO PARA ARQUIVADAS)
router.get('/historico', authMiddleware, async (req, res) => {
  try {
    console.log('📋 Buscando histórico de manutenções arquivadas...');
    
    const filtro = req.query.filtro || '';
    
    let whereCondition = {
      userId: req.user.sub, // ⭐ FILTRAR POR USUÁRIO
      status: 'arquivada' // ⭐ APENAS ARQUIVADAS
    };
    
    if (filtro.trim()) {
      whereCondition.OR = [
        { titulo: { contains: filtro, mode: 'insensitive' } },
        { codigo: { contains: filtro, mode: 'insensitive' } },
        { descricao: { contains: filtro, mode: 'insensitive' } }
      ];
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
      orderBy: { updatedAt: 'desc' }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ Histórico encontrado: ${manutencoes.length} manutenções arquivadas`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    res.json({ 
      success: true,
      manutencoes,
      total: manutencoes.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar histórico:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
});

// ⭐ LISTAR POR EQUIPAMENTO - MOVIDO PARA ANTES DAS ROTAS COM :id
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

// ⭐ CRIAR NOVA MANUTENÇÃO
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('📥 [POST /manutencoes] Body recebido:', JSON.stringify(req.body, null, 2));
    console.log('👤 [POST /manutencoes] Usuário:', req.user.email, 'ID:', req.user.sub);
    
    const { 
      titulo, 
      descricao, 
      equipamentoId, 
      criticidade = 'media',
      tipo = 'preventiva',
      data,
      hora,
      solicitante,
      responsavel,
      observacoes,
      dataPrimeiraRevisao,
      dataProximaManutencao
    } = req.body;
    
    // ⭐ VALIDAÇÕES COMPLETAS
    if (!titulo || titulo.trim() === '') {
      console.log('❌ Validação falhou: Título obrigatório');
      return res.status(400).json({ message: 'Título é obrigatório' });
    }
    
    if (!descricao || descricao.trim() === '') {
      console.log('❌ Validação falhou: Descrição obrigatória');
      return res.status(400).json({ message: 'Descrição é obrigatória' });
    }
    
    if (!equipamentoId) {
      console.log('❌ Validação falhou: Equipamento obrigatório');
      return res.status(400).json({ message: 'Equipamento é obrigatório' });
    }
    
    if (!data || !hora) {
      console.log('❌ Validação falhou: Data e hora obrigatórias');
      return res.status(400).json({ message: 'Data e hora são obrigatórias' });
    }
    
    if (!solicitante || solicitante.trim() === '') {
      console.log('❌ Validação falhou: Solicitante obrigatório');
      return res.status(400).json({ message: 'Solicitante é obrigatório' });
    }
    
    // ⭐ VERIFICAR SE EQUIPAMENTO EXISTE E PERTENCE AO USUÁRIO
    const equipamento = await prisma.equipamento.findFirst({
      where: { 
        id: parseInt(equipamentoId),
        userId: req.user.sub
      }
    });
    
    if (!equipamento) {
      console.log('❌ Equipamento não encontrado ou sem permissão:', equipamentoId);
      return res.status(404).json({ message: 'Equipamento não encontrado ou você não tem permissão para acessá-lo' });
    }
    
    // ⭐ GERAR CÓDIGO ÚNICO
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
    
    // ⭐ COMBINAR DATA E HORA CORRETAMENTE
    const dataHora = new Date(`${data}T${hora}`);
    console.log('📅 Data/hora processada:', dataHora);
    
    // ⭐ MONTAR DADOS PARA CRIAÇÃO
    const dadosManutencao = {
      codigo,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      tipo: tipo || 'preventiva',
      equipamentoId: parseInt(equipamentoId),
      userId: req.user.sub,
      criticidade: criticidade || 'media',
      status: 'recebida',
      dataHora: dataHora,
      solicitante: solicitante.trim(),
      responsavel: responsavel?.trim() || null,
      observacoes: observacoes?.trim() || null,
      dataPrimeiraRevisao: dataPrimeiraRevisao ? new Date(dataPrimeiraRevisao) : null,
      dataProximaManutencao: dataProximaManutencao ? new Date(dataProximaManutencao) : null,
      arquivada: false
    };
    
    console.log('💾 [POST /manutencoes] Dados para criação:', JSON.stringify(dadosManutencao, null, 2));
    
    const manutencao = await prisma.manutencao.create({
      data: dadosManutencao,
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true, categoria: true }
        }
      }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ [POST /manutencoes] Manutenção criada: ${codigo} - ${titulo}`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.status(201).json({
      success: true,
      message: 'Manutenção criada com sucesso',
      manutencao
    });
    
  } catch (error) {
    console.error('❌ [POST /manutencoes] Erro completo:', error);
    res.status(500).json({ 
      message: 'Erro ao criar manutenção', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ⭐ BUSCAR MANUTENÇÃO POR ID
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

// ⭐ ATUALIZAR MANUTENÇÃO - TOTALMENTE CORRIGIDO
// ⭐ MELHORAR LOGS NA ROTA PUT (EDIÇÃO)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('\n🔄 ===== INICIANDO EDIÇÃO DE MANUTENÇÃO =====');
    console.log('📥 [PUT /manutencoes] Body recebido:', JSON.stringify(req.body, null, 2));
    console.log('👤 [PUT /manutencoes] Usuário:', req.user.email, 'ID:', req.user.sub);
    
    const id = parseInt(req.params.id);
    console.log('🆔 [PUT /manutencoes] ID da manutenção a editar:', id);
    
    const { 
      titulo, 
      descricao, 
      criticidade,
      tipo,
      dataHora,
      observacoes,
      status,
      solicitante,
      responsavel,
      dataPrimeiraRevisao,
      dataProximaManutencao,
      equipamentoId
    } = req.body;
    
    // ⭐ LOG DOS CAMPOS RECEBIDOS
    console.log('📋 [PUT /manutencoes] Campos recebidos:');
    console.log('  - titulo:', titulo);
    console.log('  - descricao:', descricao);
    console.log('  - criticidade:', criticidade);
    console.log('  - tipo:', tipo);
    console.log('  - status:', status);
    console.log('  - solicitante:', solicitante);
    console.log('  - responsavel:', responsavel);
    console.log('  - dataHora:', dataHora);
    
    // ⭐ VERIFICAR SE MANUTENÇÃO EXISTE E PERTENCE AO USUÁRIO
    const manutencaoExistente = await prisma.manutencao.findFirst({
      where: { 
        id: id,
        userId: req.user.sub
      }
    });
    
    if (!manutencaoExistente) {
      console.log('❌ [PUT /manutencoes] Manutenção não encontrada ou sem permissão');
      return res.status(404).json({ message: 'Manutenção não encontrada ou você não tem permissão para editá-la' });
    }
    
    console.log('✅ [PUT /manutencoes] Manutenção encontrada:', manutencaoExistente.codigo);
    console.log('📊 [PUT /manutencoes] Dados ANTES da edição:');
    console.log('  - criticidade atual:', manutencaoExistente.criticidade);
    console.log('  - responsável atual:', manutencaoExistente.responsavel);
    console.log('  - status atual:', manutencaoExistente.status);
    
    // ⭐ PREPARAR DADOS PARA ATUALIZAÇÃO
    const updateData = {};
    console.log('\n🔧 [PUT /manutencoes] Processando campos para atualização...');
    
    if (titulo !== undefined && titulo !== null) {
      updateData.titulo = String(titulo).trim();
      console.log('✏️ Título: ', manutencaoExistente.titulo, ' → ', updateData.titulo);
    }
    
    if (descricao !== undefined && descricao !== null) {
      updateData.descricao = String(descricao).trim();
      console.log('✏️ Descrição: ', manutencaoExistente.descricao, ' → ', updateData.descricao);
    }
    
    if (criticidade !== undefined && criticidade !== null) {
      updateData.criticidade = String(criticidade);
      console.log('🚨 CRITICIDADE: ', manutencaoExistente.criticidade, ' → ', updateData.criticidade);
    }
    
    if (tipo !== undefined && tipo !== null) {
      updateData.tipo = String(tipo);
      console.log('✏️ Tipo: ', manutencaoExistente.tipo, ' → ', updateData.tipo);
    }
    
    if (responsavel !== undefined) {
      const novoResponsavel = responsavel ? String(responsavel).trim() : null;
      updateData.responsavel = novoResponsavel;
      console.log('👨‍🔧 RESPONSÁVEL: ', manutencaoExistente.responsavel, ' → ', updateData.responsavel);
    }
    
    if (solicitante !== undefined && solicitante !== null) {
      updateData.solicitante = String(solicitante).trim();
      console.log('✏️ Solicitante: ', manutencaoExistente.solicitante, ' → ', updateData.solicitante);
    }
    
    if (observacoes !== undefined) {
      updateData.observacoes = observacoes ? String(observacoes).trim() : null;
      console.log('✏️ Observações: alteradas');
    }
    
    if (dataHora !== undefined) {
      updateData.dataHora = dataHora ? new Date(dataHora) : null;
      console.log('📅 DataHora: ', manutencaoExistente.dataHora, ' → ', updateData.dataHora);
    }
    
    if (dataPrimeiraRevisao !== undefined) {
      updateData.dataPrimeiraRevisao = dataPrimeiraRevisao ? new Date(dataPrimeiraRevisao) : null;
      console.log('✏️ Data Primeira Revisão: alterada');
    }
    
    if (dataProximaManutencao !== undefined) {
      updateData.dataProximaManutencao = dataProximaManutencao ? new Date(dataProximaManutencao) : null;
      console.log('✏️ Data Próxima Manutenção: alterada');
    }
    
    if (equipamentoId !== undefined && equipamentoId !== null) {
      const equipamento = await prisma.equipamento.findFirst({
        where: { 
          id: parseInt(equipamentoId),
          userId: req.user.sub
        }
      });
      
      if (!equipamento) {
        console.log('❌ [PUT /manutencoes] Equipamento não encontrado ou sem permissão');
        return res.status(404).json({ message: 'Equipamento não encontrado ou você não tem permissão para acessá-lo' });
      }
      
      updateData.equipamentoId = parseInt(equipamentoId);
      console.log('✏️ Equipamento: ', manutencaoExistente.equipamentoId, ' → ', updateData.equipamentoId);
    }
    
    if (status !== undefined && status !== null) {
      const statusPermitidos = ['recebida', 'analise', 'execucao', 'concluida', 'arquivada'];
      if (!statusPermitidos.includes(status)) {
        console.log('❌ [PUT /manutencoes] Status inválido:', status);
        return res.status(400).json({ message: 'Status inválido' });
      }
      updateData.status = status;
      console.log('📊 STATUS: ', manutencaoExistente.status, ' → ', updateData.status);
    }
    
    console.log('\n💾 [PUT /manutencoes] Dados FINAIS para atualização:');
    console.log(JSON.stringify(updateData, null, 2));
    
    // ⭐ VERIFICAR SE HÁ ALGO PARA ATUALIZAR
    if (Object.keys(updateData).length === 0) {
      console.log('⚠️ [PUT /manutencoes] Nenhum campo para atualizar!');
      return res.status(400).json({ message: 'Nenhum campo válido para atualizar' });
    }
    
    console.log('\n🚀 [PUT /manutencoes] Executando atualização no banco...');
    
    // ⭐ EXECUTAR ATUALIZAÇÃO
    const manutencao = await prisma.manutencao.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true, categoria: true }
        }
      }
    });
    
    console.log('\n✅ ===== MANUTENÇÃO ATUALIZADA COM SUCESSO =====');
<<<<<<< HEAD
=======
    console.log(`📋 Código: ${manutencao.codigo}`);
    console.log(`📝 Título: ${manutencao.titulo}`);
    console.log(`🚨 Criticidade FINAL: ${manutencao.criticidade}`);
    console.log(`👨‍🔧 Responsável FINAL: ${manutencao.responsavel}`);
    console.log(`📊 Status FINAL: ${manutencao.status}`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    console.log('===============================================\n');
    
    res.json({
      success: true,
      message: 'Manutenção atualizada com sucesso',
      manutencao
    });
    
  } catch (error) {
    console.log('\n❌ ===== ERRO NA EDIÇÃO =====');
    console.error('❌ [PUT /manutencoes] Erro completo:', error);
    console.log('==============================\n');
    res.status(500).json({ 
      message: 'Erro ao atualizar manutenção', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ⭐ ATUALIZAR STATUS
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    console.log('📥 [PATCH /manutencoes/status] Body recebido:', JSON.stringify(req.body, null, 2));
    
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status não informado' });
    }
    
    const statusPermitidos = ['recebida', 'analise', 'execucao', 'concluida', 'arquivada'];
    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }
    
    // ⭐ VERIFICAR PERMISSÃO
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: id,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada ou você não tem permissão para editá-la' });
    }
    
    const manutencaoAtualizada = await prisma.manutencao.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true }
        }
      }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ [PATCH /manutencoes/status] Status atualizado: ${manutencaoAtualizada.codigo} -> ${status}`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      manutencao: manutencaoAtualizada
    });
    
  } catch (error) {
    console.error('❌ [PATCH /manutencoes/status] Erro:', error);
    res.status(500).json({ 
      message: 'Erro ao atualizar status', 
      error: error.message 
    });
  }
});

// ⭐ ARQUIVAR MANUTENÇÃO
router.patch('/:id/arquivar', authMiddleware, async (req, res) => {
  try {
    console.log('📦 [PATCH /manutencoes/:id/arquivar] Iniciando arquivamento...');
    
    const id = parseInt(req.params.id);
    console.log('🆔 ID da manutenção:', id);
    
    // Verificar se existe
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: id,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({
        success: false,
        message: 'Manutenção não encontrada ou você não tem permissão'
      });
    }
    
    // Só pode arquivar se estiver concluída
    if (manutencao.status !== 'concluida') {
      return res.status(400).json({
        success: false,
        message: 'Só é possível arquivar manutenções concluídas'
      });
    }
    
    // Arquivar
    const manutencaoArquivada = await prisma.manutencao.update({
      where: { id },
      data: { 
        status: 'arquivada',
        updatedAt: new Date()
      },
      include: {
        user: {
          select: { id: true, nome: true, email: true, empresa: true }
        },
        equipamento: {
          select: { id: true, tag: true, nome: true, area: true }
        }
      }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ Manutenção ${manutencao.codigo} arquivada com sucesso`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.json({
      success: true,
      message: 'Manutenção arquivada com sucesso',
      manutencao: manutencaoArquivada
    });
    
  } catch (error) {
    console.error('❌ Erro ao arquivar manutenção:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao arquivar manutenção', 
      error: error.message 
    });
  }
});

// ⭐ DELETAR MANUTENÇÃO
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // ⭐ VERIFICAR PERMISSÃO
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: id,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada ou você não tem permissão para excluí-la' });
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

// ⭐ ADICIONAR TÉCNICO À MANUTENÇÃO
router.post('/:id/tecnicos', authMiddleware, async (req, res) => {
  try {
    console.log('👨‍🔧 [POST /manutencoes/:id/tecnicos] Adicionando técnico...');
    
    const manutencaoId = parseInt(req.params.id);
    const { 
      tecnicoNome, 
      observacoes, 
      relatorioTecnico,
      horasTrabalho,
      materiaisUsados 
    } = req.body;
    
    if (!tecnicoNome || tecnicoNome.trim() === '') {
      return res.status(400).json({ message: 'Nome do técnico é obrigatório' });
    }
    
    // Verificar se a manutenção existe e pertence ao usuário
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: manutencaoId,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    // Desativar o técnico atual (se houver)
    await prisma.manutencaoTecnico.updateMany({
      where: { 
        manutencaoId: manutencaoId,
        ativo: true
      },
      data: { 
        ativo: false,
        dataFinalizacao: new Date()
      }
    });
    
    // Adicionar novo técnico
    const novoTecnico = await prisma.manutencaoTecnico.create({
      data: {
        manutencaoId: manutencaoId,
        tecnicoNome: tecnicoNome.trim(),
        statusAnterior: manutencao.status,
        statusAtual: manutencao.status,
        observacoes: observacoes?.trim() || null,
        relatorioTecnico: relatorioTecnico?.trim() || null,
        horasTrabalho: horasTrabalho ? parseFloat(horasTrabalho) : null,
        materiaisUsados: materiaisUsados?.trim() || null,
        ativo: true,
        dataAtribuicao: new Date()
      }
    });
    
    // Atualizar responsável atual na manutenção
    await prisma.manutencao.update({
      where: { id: manutencaoId },
      data: { responsavel: tecnicoNome.trim() }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ Técnico ${tecnicoNome} adicionado à manutenção ${manutencaoId}`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.json({
      success: true,
      message: 'Técnico adicionado com sucesso',
      tecnico: novoTecnico
    });
    
  } catch (error) {
    console.error('❌ Erro ao adicionar técnico:', error);
    res.status(500).json({ 
      message: 'Erro ao adicionar técnico', 
      error: error.message 
    });
  }
});

// ⭐ BUSCAR HISTÓRICO DE TÉCNICOS
router.get('/:id/historico-tecnicos', authMiddleware, async (req, res) => {
  try {
    console.log('📋 [GET /manutencoes/:id/historico-tecnicos] Buscando histórico...');
    
    const manutencaoId = parseInt(req.params.id);
    
    // Verificar se a manutenção existe e pertence ao usuário
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: manutencaoId,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    // Buscar histórico de técnicos
    const historicoTecnicos = await prisma.manutencaoTecnico.findMany({
      where: { manutencaoId: manutencaoId },
      orderBy: { dataAtribuicao: 'desc' }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ Encontrados ${historicoTecnicos.length} registros no histórico`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.json({
      success: true,
      historico: historicoTecnicos,
      total: historicoTecnicos.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar histórico de técnicos:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar histórico', 
      error: error.message 
    });
  }
});

// ⭐ ATUALIZAR RELATÓRIO TÉCNICO
router.put('/:id/tecnicos/:tecnicoId', authMiddleware, async (req, res) => {
  try {
    console.log('📝 [PUT /manutencoes/:id/tecnicos/:tecnicoId] Atualizando relatório...');
    
    const manutencaoId = parseInt(req.params.id);
    const tecnicoId = parseInt(req.params.tecnicoId);
    const { 
      relatorioTecnico, 
      observacoes, 
      horasTrabalho,
      materiaisUsados,
      statusAtual 
    } = req.body;
    
    // Verificar se a manutenção existe e pertence ao usuário
    const manutencao = await prisma.manutencao.findFirst({
      where: { 
        id: manutencaoId,
        userId: req.user.sub
      }
    });
    
    if (!manutencao) {
      return res.status(404).json({ message: 'Manutenção não encontrada' });
    }
    
    // Verificar se o registro do técnico existe
    const tecnicoExistente = await prisma.manutencaoTecnico.findFirst({
      where: { 
        id: tecnicoId,
        manutencaoId: manutencaoId
      }
    });
    
    if (!tecnicoExistente) {
      return res.status(404).json({ message: 'Registro do técnico não encontrado' });
    }
    
    // Atualizar o registro do técnico
    const tecnicoAtualizado = await prisma.manutencaoTecnico.update({
      where: { id: tecnicoId },
      data: {
        relatorioTecnico: relatorioTecnico?.trim() || null,
        observacoes: observacoes?.trim() || null,
        horasTrabalho: horasTrabalho ? parseFloat(horasTrabalho) : null,
        materiaisUsados: materiaisUsados?.trim() || null,
        statusAtual: statusAtual || tecnicoExistente.statusAtual,
        updatedAt: new Date()
      }
    });
    
<<<<<<< HEAD
=======
    console.log(`✅ Relatório do técnico ${tecnicoId} atualizado`);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    
    res.json({
      success: true,
      message: 'Relatório atualizado com sucesso',
      tecnico: tecnicoAtualizado
    });
    
  } catch (error) {
    console.error('❌ Erro ao atualizar relatório:', error);
    res.status(500).json({ 
      message: 'Erro ao atualizar relatório', 
      error: error.message 
    });
  }
});

console.log('✅ [Manutencoes Routes] Configurado com CRUD completo');
module.exports = router;