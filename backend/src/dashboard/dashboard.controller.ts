import { Controller, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    sub?: number;
    email: string;
    role?: string;
  };
}

@Controller('api/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  private readonly logger = new Logger('DashboardController');
  
  constructor(private readonly dashboardService: DashboardService) {
    console.log('🔔 DashboardController foi carregado');
  }

  // Endpoint de teste simples para verificar se o controller está registrado
  @Get('test')
  test() {
    this.logger.log('🔍 Teste de endpoint dashboard');
    return { message: 'Dashboard API is working!', timestamp: new Date().toISOString() };
  }

  @Get('estatisticas')
  async getEstatisticas(@Req() req: RequestWithUser) {
    this.logger.log('📊 GET /api/dashboard/estatisticas chamado');
    
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new Error('UserId não encontrado no token');
    }
    
    const result = await this.dashboardService.getEstatisticas(userId);
    return result;
  }

  @Get('tendencias')
  async getTendencias(@Req() req: RequestWithUser) {
    this.logger.log('📈 GET /api/dashboard/tendencias chamado');
    
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new Error('UserId não encontrado no token');
    }
    
    const result = await this.dashboardService.getTendencias(userId);
    return result;
  }

  @Get('atividade-recente')
  async getAtividadeRecente(@Req() req: RequestWithUser) {
    this.logger.log('🕒 GET /api/dashboard/atividade-recente chamado');
    
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new Error('UserId não encontrado no token');
    }
    
    const result = await this.dashboardService.getAtividadeRecente(userId);
    return result;
  }
}
