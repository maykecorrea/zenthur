import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-test')
  async testDbConnection() {
    try {
      // Teste simples para verificar a conexão
      const count = await this.prisma.user.count();
      
      return { 
        status: 'success', 
        message: 'Conexão com o banco de dados funcionando!',
        data: { count } 
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: 'Erro ao conectar ao banco de dados', 
        error: error.message 
      };
    }
  }
}
