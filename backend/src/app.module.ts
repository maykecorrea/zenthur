import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import * as multer from 'multer';

// ⭐ IMPORTS DOS MÓDULOS
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ManutencoesModule } from './manutencoes/manutencoes.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { DocumentosModule } from './documentos/documentos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SearchModule } from './search/search.module';
import { FilesModule } from './files/files.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PlantasModule } from './plantas/plantas.module'; // ✅ IMPORT CRÍTICO

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    
    // ✅ CONFIGURAÇÃO MULTER GLOBAL
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
    
    PrismaModule,
    AuthModule,
    UsersModule,
    ManutencoesModule,
    EquipamentosModule,
    DocumentosModule,
    DashboardModule,
    CategoriasModule,
    SearchModule,
    FilesModule,
    AppointmentsModule,
    PlantasModule, // ✅ MÓDULO PLANTAS ADICIONADO
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('🎯 AppModule inicializado com sucesso!');
    console.log('🌱 PlantasModule carregado');
  }
}