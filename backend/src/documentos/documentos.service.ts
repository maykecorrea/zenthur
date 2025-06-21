import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class DocumentosService {
  private readonly logger = new Logger(DocumentosService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    try {
      this.logger.log(`Buscando documentos para o usuário ${userId}`);
      
      const userEquipamentos = await this.prisma.equipamento.findMany({
        where: { userId: userId },
        select: { id: true }
      });
      
      const equipamentoIds = userEquipamentos.map(equip => equip.id);
      
      const documentos = await this.prisma.documento.findMany({
        where: {
          equipamentoId: {
            in: equipamentoIds
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });
      
      this.logger.log(`Recuperados ${documentos.length} documentos`);
      return documentos;
    } catch (error) {
      this.logger.error(`Erro ao buscar documentos: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Falha ao buscar documentos');
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const documento = await this.prisma.documento.findUnique({
        where: { id }
      });
      
      if (!documento) {
        throw new NotFoundException('Documento não encontrado');
      }
      
      const equipamento = await this.prisma.equipamento.findUnique({
        where: { 
          id: documento.equipamentoId,
          userId: userId
        }
      });
      
      if (!equipamento) {
        this.logger.warn(`Acesso não autorizado ao documento ${id} pelo usuário ${userId}`);
        throw new ForbiddenException('Você não tem permissão para acessar este documento');
      }
      
      return documento;
    } catch (error) {
      throw error;
    }
  }

  async create(data: any, userId: number) {
    try {
      console.log('📄 Service - create - Dados recebidos:', data);
      console.log('📄 Service - create - UserId:', userId);

      // Validações básicas
      if (!data.titulo && !data.nome) {
        throw new Error('Título ou nome é obrigatório');
      }

      if (!data.equipamentoId) {
        throw new Error('ID do equipamento é obrigatório');
      }

      // Converter equipamentoId para número
      const equipamentoId = parseInt(data.equipamentoId.toString(), 10);
      
      if (isNaN(equipamentoId)) {
        throw new Error('ID do equipamento inválido');
      }

      // Verificar se equipamento existe E pertence ao usuário
      const equipamento = await this.prisma.equipamento.findUnique({
        where: { id: equipamentoId }
      });

      if (!equipamento) {
        throw new NotFoundException('Equipamento não encontrado');
      }

      if (equipamento.userId !== userId) {
        throw new ForbiddenException('Você não tem permissão para adicionar documentos a este equipamento');
      }

      const documentoData = {
        nome: data.nome?.toString() || data.titulo?.toString() || 'Documento',
        titulo: data.titulo?.toString() || data.nome?.toString() || 'Documento',
        tipo: data.tipo?.toString() || 'manual',
        descricao: data.descricao?.toString() || '',
        arquivo: data.arquivo?.toString() || '',
        url: data.url?.toString() || '',
        tamanho: data.tamanho ? parseInt(data.tamanho.toString(), 10) : null,
        revisao: data.revisao?.toString() || '0',
        versao: parseInt(data.versao?.toString() || '1', 10),
        equipamentoId: equipamentoId,
        userId: userId
      };

      console.log('📄 Dados preparados para criação:', documentoData);

      const documento = await this.prisma.documento.create({
        data: documentoData,
        include: {
          equipamento: {
            select: {
              nome: true,
              tag: true
            }
          }
        }
      });

      console.log('✅ Documento criado com ID:', documento.id);
      return documento;

    } catch (error) {
      console.error('❌ Service - Erro:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message || 'Erro interno do servidor');
    }
  }

  async createWithFile(file: any, documentoData: any, userId: number) {
    try {
      console.log('📄 Service - createWithFile - Arquivo:', file?.originalname);
      console.log('📄 Service - createWithFile - Dados:', documentoData);
      console.log('📄 Service - createWithFile - UserId:', userId);

      if (!file) {
        throw new Error('Arquivo é obrigatório');
      }

      if (documentoData.equipamentoId && typeof documentoData.equipamentoId === 'string') {
        documentoData.equipamentoId = parseInt(documentoData.equipamentoId, 10);
      }
      
      const equipamento = await this.prisma.equipamento.findUnique({
        where: {
          id: documentoData.equipamentoId
        }
      });

      if (!equipamento) {
        this.logger.warn(`Equipamento não encontrado: ID ${documentoData.equipamentoId}`);
        throw new NotFoundException('Equipamento não encontrado');
      }

      if (equipamento.userId !== userId) {
        this.logger.warn(`Tentativa de acesso não autorizado: Usuário ${userId} tentando acessar equipamento pertencente ao usuário ${equipamento.userId}`);
        throw new ForbiddenException('Você não tem permissão para adicionar documentos a este equipamento');
      }

      const existingDoc = await this.prisma.documento.findFirst({
        where: {
          titulo: documentoData.titulo,
          equipamentoId: documentoData.equipamentoId
        },
        orderBy: {
          versao: 'desc'
        }
      });

      const versao = existingDoc ? existingDoc.versao + 1 : 1;

      const data = {
        titulo: documentoData.titulo || file.originalname,
        tipo: documentoData.tipo || file.mimetype,
        tamanho: documentoData.tamanho 
          ? parseInt(documentoData.tamanho) 
          : file.size,
        equipamentoId: documentoData.equipamentoId,
        userId: userId,
        versao,
        revisao: documentoData.revisao || '0',
        descricao: documentoData.descricao || '',
        nome: documentoData.nome || documentoData.titulo || file.originalname,
        url: documentoData.url || file.filename,
        arquivo: documentoData.arquivo || file.filename
      };

      console.log('📄 Dados preparados para criação com arquivo:', data);

      const documento = await this.prisma.documento.create({ 
        data,
        include: {
          equipamento: {
            select: {
              nome: true,
              tag: true
            }
          }
        }
      });

      console.log('✅ Documento com arquivo criado com ID:', documento.id);
      return documento;

    } catch (error) {
      this.logger.error(`Erro ao criar documento: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Ocorreu um erro ao processar sua solicitação');
    }
  }

  async findByEquipamento(equipamentoId: number, userId: number) {
    try {
      console.log('🔍 Service - Buscando documentos equipamento:', equipamentoId, 'usuário:', userId);
      
      const documentos = await this.prisma.documento.findMany({
        where: { 
          equipamentoId,
          equipamento: {
            userId
          }
        },
        include: {
          equipamento: {
            select: {
              nome: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      console.log('✅ Service - Encontrados', documentos.length, 'documentos');
      return documentos;
    } catch (error) {
      console.error('❌ Service - Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      const documento = await this.prisma.documento.findUnique({
        where: { id },
        include: { equipamento: true }
      });

      if (!documento) {
        this.logger.warn(`Tentativa de remover documento inexistente: ID ${id}`);
        throw new NotFoundException(`Documento com ID ${id} não encontrado`);
      }

      // ⭐ VERIFICAR PERMISSÃO
      if (documento.equipamento.userId !== userId) {
        throw new ForbiddenException('Você não tem permissão para remover este documento');
      }

      const doc = documento as any;
      const arquivoPath = doc.arquivo || doc.url || null;
      
      if (arquivoPath) {
        // ⭐ USAR join CORRETAMENTE
        const filePath = join(process.cwd(), 'uploads', 'documentos', arquivoPath);
        try {
          // ⭐ USAR fs CORRETAMENTE
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            this.logger.log(`Arquivo físico excluído com sucesso: ${filePath}`);
          }
        } catch (error) {
          this.logger.error(`Erro ao excluir arquivo físico: ${filePath}`, error.stack);
        }
      }

      const result = await this.prisma.documento.delete({
        where: { id }
      });
      
      this.logger.log(`Documento excluído com sucesso: ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao remover documento ${id}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao remover documento');
    }
  }

  // ⭐ FUNÇÃO UPDATE CORRIGIDA COM IMPORTS
  async update(id: number, file: any, documentoData: any, userId: number) {
    try {
      const documento = await this.prisma.documento.findUnique({
        where: { id },
        include: { equipamento: true }
      });

      if (!documento) {
        throw new NotFoundException(`Documento com ID ${id} não encontrado`);
      }

      if (documento.equipamento.userId !== userId) {
        throw new ForbiddenException('Você não tem permissão para editar este documento');
      }

      const updateData: any = {
        titulo: documentoData.titulo,
        tipo: documentoData.tipo,
        descricao: documentoData.descricao || (documento as any).descricao || '',
        revisao: documentoData.revisao || (documento as any).revisao || '',
        versao: documento.versao + 1
      };

      if (file) {
        updateData.arquivo = file.filename;
        updateData.url = `http://localhost:4001/uploads/documentos/${file.filename}`;
        updateData.tamanho = file.size;
      }

      const documentoAtualizado = await this.prisma.documento.update({
        where: { id },
        data: updateData
      });

      return documentoAtualizado;
    } catch (error) {
      // ⭐ LIMPEZA DE ARQUIVO COM unlink CORRETO
      if (file && file.filename) {
        try {
          await unlink(join(process.cwd(), 'uploads', 'documentos', file.filename));
        } catch (unlinkError) {
          this.logger.error(`Erro ao excluir arquivo: ${unlinkError.message}`);
        }
      }

      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error(`Erro ao atualizar documento: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erro ao atualizar documento');
    }
  }

  async findVersions(documentoId: number) {
    try {
      const documentos = await this.prisma.documento.findMany({
        where: {
          OR: [
            { id: documentoId },
            { equipamentoId: documentoId }
          ]
        },
        orderBy: {
          versao: 'desc'
        }
      });
      
      return documentos;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar histórico de versões');
    }
  }
}
