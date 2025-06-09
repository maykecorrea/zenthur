import { Module } from '@nestjs/common';
import { PlantasController } from './plantas.controller';
import { PlantasService } from './plantas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlantasController],
  providers: [PlantasService],
  exports: [PlantasService]
})
export class PlantasModule {
  constructor() {
    console.log('🌱 PlantasModule carregado com sucesso!');
  }
}
