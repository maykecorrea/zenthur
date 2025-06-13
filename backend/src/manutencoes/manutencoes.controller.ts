import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, ParseIntPipe, Query } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('api/manutencoes')
@UseGuards(JwtAuthGuard)
export class ManutencoesController {
  constructor(private readonly manutencoesService: ManutencoesService) {}

  // ⭐ CRIAR NOVA MANUTENÇÃO
  @Post()
  async create(@Body() createManutencaoDto: any, @Req() req: RequestWithUser) {
    console.log('📥 [Controller] Criando nova manutenção:', createManutencaoDto);
    return this.manutencoesService.create(createManutencaoDto, req.user.userId);
  }

  // ⭐ BUSCAR TODAS - CORRIGIDO
  @Get()
  async findAll(@Req() req: RequestWithUser) {
    console.log('🔍 [Controller] Buscando todas as manutenções');
    return this.manutencoesService.findAll(req.user.userId, req.user.role);
  }

  // ⭐ BUSCAR POR ID - CORRIGIDO
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    console.log(`🔍 [Controller] Buscando manutenção ${id}`);
    return this.manutencoesService.findOne(id, req.user.userId, req.user.role);
  }

  // ⭐ ATUALIZAR - CORRIGIDO
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateManutencaoDto: any, 
    @Req() req: RequestWithUser
  ) {
    console.log(`🔄 [Controller] Atualizando manutenção ${id}:`, updateManutencaoDto);
    return this.manutencoesService.update(id, updateManutencaoDto, req.user.userId, req.user.role);
  }

  // ⭐ REMOVER - CORRIGIDO
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    console.log(`🗑️ [Controller] Removendo manutenção ${id}`);
    return this.manutencoesService.remove(id, req.user.userId, req.user.role);
  }

  // ⭐ ATUALIZAR STATUS
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
    @Req() req: RequestWithUser
  ) {
    console.log(`🔄 [Controller] Atualizando status da manutenção ${id} para ${status}`);
    return this.manutencoesService.updateStatus(id, status, req.user.userId, req.user.role);
  }

  // ⭐ ARQUIVAR - CORRIGIDO NOME DO MÉTODO
  @Patch(':id/arquivar')
  async arquivar(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    console.log(`📦 [Controller] Arquivando manutenção ${id}`);
    return this.manutencoesService.arquivar(id, req.user.userId, req.user.role);
  }

  // ⭐ BUSCAR POR EQUIPAMENTO
  @Get('equipamento/:equipamentoId')
  async findByEquipamento(
    @Param('equipamentoId', ParseIntPipe) equipamentoId: number,
    @Query('includeArchived') includeArchived?: string
  ) {
    console.log(`🔍 [Controller] Buscando manutenções do equipamento ${equipamentoId}`);
    const includeArchivedBool = includeArchived === 'true';
    return this.manutencoesService.findByEquipamento(equipamentoId, includeArchivedBool);
  }

  // ⭐ BUSCAR HISTÓRICO
  @Get('historico/all')
  async findHistorico(@Req() req: RequestWithUser) {
    console.log('📚 [Controller] Buscando histórico de manutenções');
    return this.manutencoesService.findHistorico(req.user.userId, req.user.role);
  }

  // ⭐ ADICIONAR TÉCNICO
  @Post(':id/tecnicos')
  async adicionarTecnico(
    @Param('id', ParseIntPipe) id: number,
    @Body() dadosTecnico: any,
    @Req() req: RequestWithUser
  ) {
    console.log('➕ [Controller] Adicionando técnico à manutenção:', id, dadosTecnico);
    return this.manutencoesService.adicionarTecnico(id, dadosTecnico, req.user.userId);
  }

  // ⭐ BUSCAR HISTÓRICO DE TÉCNICOS
  @Get(':id/historico-tecnicos')
  async getHistoricoTecnicos(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser
  ) {
    console.log('📋 [Controller] Buscando histórico de técnicos para manutenção:', id);
    return this.manutencoesService.findHistoricoTecnicos(id, req.user.userId);
  }
}