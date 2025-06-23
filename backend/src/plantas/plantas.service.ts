import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { CreateMarcadorDto } from './dto/create-marcador.dto';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class PlantasService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: number) {
    console.log('🔍 Buscando plantas do usuário:', userId);
    
    const plantas = await this.prisma.planta.findMany({
      where: { userId },
      include: {
        marcadores: true,
        _count: {
          select: { marcadores: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📋 Encontradas ${plantas.length} plantas`);
    return plantas;
  }

  async findOne(id: number, userId: number) {
    console.log('🔍 Buscando planta:', id, 'para usuário:', userId);
    
    const planta = await this.prisma.planta.findFirst({
      where: { 
        id, 
        userId 
      },
      include: {
        marcadores: {
          where: { ativo: true },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!planta) {
      throw new NotFoundException('Planta não encontrada');
    }

    return planta;
  }

  async create(createPlantaDto: CreatePlantaDto, file: Express.Multer.File, userId: number) {
    console.log('📤 Criando nova planta para usuário:', userId);
    
    // Salvar arquivo
    const uploadsDir = join(process.cwd(), 'uploads', 'plantas');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    const fileName = `planta-${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`;
    const filePath = join(uploadsDir, fileName);
    
    await fs.writeFile(filePath, file.buffer);
    
    const imageUrl = `/uploads/plantas/${fileName}`;
    
    // Criar planta no banco
    const planta = await this.prisma.planta.create({
      data: {
        titulo: createPlantaDto.titulo,
        descricao: createPlantaDto.descricao,
        imageUrl,
        imagePath: filePath,
        fileName,
        userId
      },
      include: {
        marcadores: true
      }
    });

    console.log('✅ Planta criada com ID:', planta.id);
    return planta;
  }

  async update(id: number, updatePlantaDto: UpdatePlantaDto, file: Express.Multer.File, userId: number) {
    const planta = await this.findOne(id, userId);
    
    let imageUrl = planta.imageUrl;
    let imagePath = planta.imagePath;
    let fileName = planta.fileName;
    
    // Se nova imagem foi enviada
    if (file) {
      // Excluir arquivo antigo
      if (planta.imagePath) {
        try {
          await fs.unlink(planta.imagePath);
        } catch (error) {
          console.log('⚠️ Arquivo antigo não encontrado:', error.message);
        }
      }
      
      // Salvar novo arquivo
      const uploadsDir = join(process.cwd(), 'uploads', 'plantas');
      await fs.mkdir(uploadsDir, { recursive: true });
      
      fileName = `planta-${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`;
      imagePath = join(uploadsDir, fileName);
      
      await fs.writeFile(imagePath, file.buffer);
      imageUrl = `/uploads/plantas/${fileName}`;
    }

    const plantaAtualizada = await this.prisma.planta.update({
      where: { id },
      data: {
        titulo: updatePlantaDto.titulo,
        descricao: updatePlantaDto.descricao,
        imageUrl,
        imagePath,
        fileName
      },
      include: {
        marcadores: {
          where: { ativo: true }
        }
      }
    });

    return plantaAtualizada;
  }

  async remove(id: number, userId: number) {
    const planta = await this.findOne(id, userId);
    
    // Excluir arquivo
    if (planta.imagePath) {
      try {
        await fs.unlink(planta.imagePath);
      } catch (error) {
        console.log('⚠️ Arquivo não encontrado:', error.message);
      }
    }

    await this.prisma.planta.delete({
      where: { id }
    });

    console.log('✅ Planta excluída:', id);
  }

  async addMarcador(plantaId: number, createMarcadorDto: CreateMarcadorDto, userId: number) {
    // Verificar se planta pertence ao usuário
    await this.findOne(plantaId, userId);
    
    const marcador = await this.prisma.marcadorPlanta.create({
      data: {
        texto: createMarcadorDto.texto,
        url: createMarcadorDto.url,
        cor: createMarcadorDto.cor || '#ef4444',
        posicaoX: createMarcadorDto.posicaoX,
        posicaoY: createMarcadorDto.posicaoY,
        plantaId
      }
    });

    return marcador;
  }

  async updateMarcador(marcadorId: number, updateMarcadorDto: CreateMarcadorDto, userId: number) {
    const marcador = await this.prisma.marcadorPlanta.findFirst({
      where: { id: marcadorId },
      include: { planta: true }
    });

    if (!marcador || marcador.planta.userId !== userId) {
      throw new UnauthorizedException('Marcador não encontrado ou sem permissão');
    }

    const marcadorAtualizado = await this.prisma.marcadorPlanta.update({
      where: { id: marcadorId },
      data: {
        texto: updateMarcadorDto.texto,
        url: updateMarcadorDto.url,
        cor: updateMarcadorDto.cor,
        posicaoX: updateMarcadorDto.posicaoX,
        posicaoY: updateMarcadorDto.posicaoY
      }
    });

    return marcadorAtualizado;
  }

  async removeMarcador(marcadorId: number, userId: number) {
    const marcador = await this.prisma.marcadorPlanta.findFirst({
      where: { id: marcadorId },
      include: { planta: true }
    });

    if (!marcador || marcador.planta.userId !== userId) {
      throw new UnauthorizedException('Marcador não encontrado ou sem permissão');
    }

    await this.prisma.marcadorPlanta.delete({
      where: { id: marcadorId }
    });
  }
}
