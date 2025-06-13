import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EquipamentosService } from './equipamentos.service';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('api/equipamentos')
@UseGuards(JwtAuthGuard)
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    console.log('📋 Buscando equipamentos para usuário:', req.user.userId);
    return this.equipamentosService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    console.log('🔍 Buscando equipamento ID:', id, 'para usuário:', req.user.userId);
    return this.equipamentosService.findOne(+id, req.user.userId);
  }

  @Post()
  async create(@Body() createEquipamentoDto: any, @Req() req: RequestWithUser) {
    console.log('📝 Dados recebidos no controller:', createEquipamentoDto);
    console.log('👤 Usuário autenticado:', req.user);
    
    try {
      // ⭐ VALIDAÇÃO BÁSICA
      if (!createEquipamentoDto.nome || createEquipamentoDto.nome.trim() === '') {
        throw new Error('Nome do equipamento é obrigatório');
      }

      // ⭐ MONTAR OBJETO DE DADOS LIMPO
      const dadosEquipamento: any = {
        nome: createEquipamentoDto.nome.trim(),
        userId: req.user.userId
      };

      // ⭐ ADICIONAR CAMPOS OPCIONAIS APENAS SE EXISTIREM
      const camposOpcionais = [
        'tag', 'numeroSerie', 'fabricante', 'modelo', 
        'localizacao', 'unidade', 'disciplina', 'detalhes', 'area'
      ];

      camposOpcionais.forEach(campo => {
        if (createEquipamentoDto[campo] && createEquipamentoDto[campo].trim() !== '') {
          dadosEquipamento[campo] = createEquipamentoDto[campo].trim();
        }
      });

      // ⭐ TRATAR TIPO
      if (createEquipamentoDto.tipo && createEquipamentoDto.tipo.trim() !== '') {
        dadosEquipamento.tipo = createEquipamentoDto.tipo.trim();
      } else {
        dadosEquipamento.tipo = 'Equipamento'; // Valor padrão
      }

      // ⭐ TRATAR CATEGORIA ID
      if (createEquipamentoDto.categoriaId && 
          createEquipamentoDto.categoriaId !== '' && 
          createEquipamentoDto.categoriaId !== 'null' &&
          createEquipamentoDto.categoriaId !== null) {
        try {
          const categoriaId = parseInt(createEquipamentoDto.categoriaId);
          if (!isNaN(categoriaId) && categoriaId > 0) {
            dadosEquipamento.categoriaId = categoriaId;
          }
        } catch (error) {
          console.log('⚠️ Erro ao converter categoriaId, ignorando:', error.message);
        }
      }

      // ⭐ TRATAR DATA DE AQUISIÇÃO
      if (createEquipamentoDto.dataAquisicao && createEquipamentoDto.dataAquisicao !== '') {
        try {
          dadosEquipamento.dataAquisicao = new Date(createEquipamentoDto.dataAquisicao);
        } catch (error) {
          console.log('⚠️ Erro ao processar data, ignorando:', error.message);
        }
      }

      console.log('📤 Dados processados para criação:', dadosEquipamento);

      // ⭐ CRIAR EQUIPAMENTO
      const resultado = await this.equipamentosService.create(dadosEquipamento);
      console.log('✅ Equipamento criado com sucesso:', resultado.id);
      
      return resultado;
    } catch (error) {
      console.log('❌ Erro no controller ao criar equipamento:', error.message);
      console.log('🔍 Stack trace:', error.stack);
      
      // ⭐ TRATAR DIFERENTES TIPOS DE ERRO
      if (error.message.includes('Unique constraint')) {
        throw new Error('Já existe um equipamento com esses dados');
      } else if (error.message.includes('Foreign key constraint')) {
        throw new Error('Categoria selecionada não existe');
      } else {
        throw new Error(`Erro ao criar equipamento: ${error.message}`);
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEquipamentoDto: any, @Req() req: RequestWithUser) {
    console.log('📝 Atualizando equipamento ID:', id, 'para usuário:', req.user.userId);
    return this.equipamentosService.update(+id, updateEquipamentoDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    console.log('🗑️ Removendo equipamento ID:', id, 'para usuário:', req.user.userId);
    return this.equipamentosService.remove(+id, req.user.userId);
  }
}
