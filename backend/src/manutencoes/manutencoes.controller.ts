import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards, Req, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateManutencaoDto, UpdateManutencaoDto } from './dto';
import { Request } from 'express';

// Interface para tipagem do objeto Request com user
interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('api/manutencoes')  // Não 'api/manutencoes'! O prefixo 'api/' é adicionado automaticamente
@UseGuards(JwtAuthGuard)
export class ManutencoesController {
  constructor(private readonly manutencoesService: ManutencoesService) {}

  @Post()
  async create(@Body() createManutencaoDto: CreateManutencaoDto, @Req() req: RequestWithUser) {
    return this.manutencoesService.create(createManutencaoDto, req.user.userId);
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    console.log('Buscando manutenções para usuário:', req.user.userId);
    return this.manutencoesService.findAll(req.user.userId, req.user.role);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.manutencoesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateManutencaoDto: UpdateManutencaoDto,
    @Req() req: RequestWithUser,
  ) {
    return this.manutencoesService.update(id, updateManutencaoDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.manutencoesService.remove(id, req.user.userId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: RequestWithUser
  ) {
    console.log(`Atualizando manutenção ${id} para status ${status}`);
    return this.manutencoesService.updateStatus(+id, status, req.user.userId, req.user.role);
  }

  @Post(':id/arquivar')
  async arquivarManutencao(@Param('id') id: string) {
    try {
      console.log(`Arquivando manutenção ${id}`); // Log para depuração
      const manutencao = await this.manutencoesService.arquivarManutencao(parseInt(id));
      return {
        message: 'Manutenção arquivada com sucesso',
        manutencao
      };
    } catch (error) {
      console.error('Erro ao arquivar manutenção:', error); // Log detalhado do erro
      throw new HttpException(
        error.message || 'Erro ao arquivar manutenção', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('equipamento/:equipamentoId')
  async findByEquipamento(
    @Param('equipamentoId') equipamentoId: string,
    @Query('includeArchived') includeArchived: string
  ) {
    const includeArchivedBool = includeArchived === 'true';
    return this.manutencoesService.findByEquipamento(parseInt(equipamentoId), includeArchivedBool);
  }

  @Get('historico')
  async getHistorico(@Req() req: RequestWithUser, @Query('filtro') filtro?: string) {
    console.log('Buscando histórico de manutenções');
    return this.manutencoesService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id/historico-tecnicos')
  async getHistoricoTecnicos(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.manutencoesService.findHistoricoTecnicos(id, req.user.userId);
  }

  // Adicione este método para depuração
  @Get('debug/test')
  async testConnection() {
    return {
      status: 'API funcionando',
      timestamp: new Date().toISOString()
    };
  }
}
