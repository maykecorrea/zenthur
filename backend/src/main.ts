import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configuração CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Pipe de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Configuração correta para servir arquivos estáticos
  const uploadsPath = join(process.cwd(), 'uploads');
  
  // Criar diretório se não existir
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  
  // Configurar middleware estático
  app.use('/uploads', express.static(uploadsPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
      }
    }
  }));
  
  console.log('📁 Diretório de uploads:', uploadsPath);
  console.log('📁 Arquivos disponíveis:', fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath).length : 0);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Servidor NestJS rodando na porta ${port}`);
  console.log(`📡 API disponível em: http://localhost:${port}`);
  console.log(`🔧 Endpoints de manutenção:`);
  console.log(`   GET    http://localhost:${port}/api/manutencoes/test`);
  console.log(`   GET    http://localhost:${port}/api/manutencoes`);
  console.log(`   POST   http://localhost:${port}/api/manutencoes`);
}
bootstrap();