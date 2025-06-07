import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// ⭐ IMPORTS DOS MÓDULOS (apenas os que existem)
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

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    
    // ⭐ MÓDULOS PRINCIPAIS
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
    console.log('✅ ForgeModule - Autodesk Forge');
    console.log('✅ Models3dModule - Modelos 3D');
  }
}