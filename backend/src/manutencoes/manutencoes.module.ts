import { Module } from '@nestjs/common';
import { ManutencoesController } from './manutencoes.controller';
import { ManutencoesService } from './manutencoes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ManutencoesController],
  providers: [ManutencoesService],
  exports: [ManutencoesService]
})
export class ManutencoesModule {}
