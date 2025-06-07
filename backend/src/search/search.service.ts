import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchResults, Suggestion } from './search.types';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchGlobal(query: string, type?: string): Promise<SearchResults> {
    console.log('🔍 [SearchService] Executando busca global:', { query, type });
    
    let results: SearchResults = {
      equipamentos: [],
      manutencoes: [],
      documentos: [],
      categorias: [],
      total: 0
    };

    try {
      // ⭐ BUSCAR EQUIPAMENTOS - CAMPOS CORRETOS
      if (!type || type === 'equipamentos' || type === 'todos') {
        results.equipamentos = await this.prisma.equipamento.findMany({
          where: {
            OR: [
              { nome: { contains: query } },
              { tag: { contains: query } },
              { fabricante: { contains: query } },
              { modelo: { contains: query } },
              { localizacao: { contains: query } },
              { numeroSerie: { contains: query } },
              { area: { contains: query } },
              { unidade: { contains: query } },
              { disciplina: { contains: query } }
            ]
          },
          include: {
            categoria: true,
            _count: {
              select: { 
                manutencoes: true,
                documentos: true 
              }
            }
          },
          take: 10
        });
      }

      // ⭐ BUSCAR MANUTENÇÕES - CAMPOS CORRETOS
      if (!type || type === 'manutencoes' || type === 'todos') {
        results.manutencoes = await this.prisma.manutencao.findMany({
          where: {
            OR: [
              { titulo: { contains: query } },
              { descricao: { contains: query } },
              { observacoes: { contains: query } },
              { codigo: { contains: query } },
              { solicitante: { contains: query } },
              { responsavel: { contains: query } },
              { equipamento: { nome: { contains: query } } },
              { equipamento: { tag: { contains: query } } }
            ]
          },
          include: {
            equipamento: {
              select: { id: true, nome: true, tag: true }
            },
            user: {
              select: { id: true, nome: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        });
      }

      // ⭐ BUSCAR CATEGORIAS - CAMPOS CORRETOS
      if (!type || type === 'categorias' || type === 'todos') {
        results.categorias = await this.prisma.categoria.findMany({
          where: {
            OR: [
              { nome: { contains: query } },
              { descricao: { contains: query } }
            ]
          },
          include: {
            equipamentos: {
              select: { id: true, nome: true, tag: true },
              take: 3
            },
            _count: {
              select: { equipamentos: true }
            }
          },
          take: 5
        });
      }

      // ⭐ BUSCAR DOCUMENTOS - ADICIONADO
      if (!type || type === 'documentos' || type === 'todos') {
        results.documentos = await this.prisma.documento.findMany({
          where: {
            OR: [
              { titulo: { contains: query } },
              { nome: { contains: query } },
              { descricao: { contains: query } },
              { tipo: { contains: query } },
              { equipamento: { nome: { contains: query } } }
            ]
          },
          include: {
            equipamento: {
              select: { id: true, nome: true, tag: true }
            },
            user: {
              select: { id: true, nome: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        });
      }

      // ⭐ CALCULAR TOTAL
      results.total = results.equipamentos.length + 
                    results.manutencoes.length + 
                    results.categorias.length +
                    results.documentos.length;

      console.log('✅ [SearchService] Busca concluída:', {
        equipamentos: results.equipamentos.length,
        manutencoes: results.manutencoes.length,
        categorias: results.categorias.length,
        documentos: results.documentos.length,
        total: results.total
      });

      return results;

    } catch (error) {
      console.error('❌ [SearchService] Erro na busca:', error);
      throw error;
    }
  }

  async getSuggestions(query: string): Promise<Suggestion[]> {
    console.log('💡 [SearchService] Gerando sugestões para:', query);
    
    try {
      const suggestions: Suggestion[] = [];

      // ⭐ SUGESTÕES DE EQUIPAMENTOS - CAMPOS CORRETOS
      const equipamentos = await this.prisma.equipamento.findMany({
        where: {
          OR: [
            { nome: { contains: query } },
            { tag: { contains: query } },
            { fabricante: { contains: query } }
          ]
        },
        select: { 
          id: true, 
          nome: true, 
          tag: true, 
          categoria: { select: { nome: true } } 
        },
        take: 3
      });

      equipamentos.forEach(eq => {
        suggestions.push({
          type: 'equipamento',
          title: eq.nome,
          subtitle: `${eq.tag || 'Sem TAG'} - ${eq.categoria?.nome || 'Sem categoria'}`,
          icon: 'cog'
        });
      });

      // ⭐ SUGESTÕES DE MANUTENÇÕES - CAMPOS CORRETOS
      const manutencoes = await this.prisma.manutencao.findMany({
        where: {
          OR: [
            { titulo: { contains: query } },
            { codigo: { contains: query } }
          ]
        },
        select: { 
          id: true, 
          titulo: true, 
          codigo: true,
          status: true, 
          equipamento: { select: { nome: true } } 
        },
        take: 3
      });

      manutencoes.forEach(m => {
        suggestions.push({
          type: 'manutencao',
          title: m.titulo,
          subtitle: `${m.codigo} - ${m.equipamento?.nome || 'Equipamento'} - ${m.status}`,
          icon: 'wrench'
        });
      });

      // ⭐ SUGESTÕES DE CATEGORIAS
      const categorias = await this.prisma.categoria.findMany({
        where: {
          nome: { contains: query }
        },
        select: { 
          id: true, 
          nome: true,
          _count: { select: { equipamentos: true } }
        },
        take: 2
      });

      categorias.forEach(c => {
        suggestions.push({
          type: 'categoria',
          title: c.nome,
          subtitle: `${c._count.equipamentos} equipamento(s)`,
          icon: 'folder'
        });
      });

      console.log('✅ [SearchService] Sugestões geradas:', suggestions.length);
      return suggestions.slice(0, 6); // Máximo 6 sugestões

    } catch (error) {
      console.error('❌ [SearchService] Erro ao gerar sugestões:', error);
      return [];
    }
  }
}