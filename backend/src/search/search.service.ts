import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchResults, Suggestion } from './search.types';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchGlobal(query: string, type?: string): Promise<SearchResults> {
    try {
      console.log('🔍 [SearchService] Iniciando busca:', { query, type });

      const results: SearchResults = {
        equipamentos: [],
        manutencoes: [],
        documentos: [],
        categorias: [],
        total: 0
      };

      // ⭐ BUSCAR EQUIPAMENTOS
      if (!type || type === 'equipamentos') {
        try {
          results.equipamentos = await this.prisma.equipamento.findMany({
            where: {
              OR: [
                { nome: { contains: query } },
                { modelo: { contains: query } },
                { numeroSerie: { contains: query } },
                { fabricante: { contains: query } },
                { localizacao: { contains: query } }
              ]
            },
            include: {
              categoria: true,
              user: {
                select: { nome: true, email: true }
              }
            },
            take: 10
          });
        } catch (error) {
          console.error('❌ Erro ao buscar equipamentos:', error);
          results.equipamentos = [];
        }
      }

      // ⭐ BUSCAR MANUTENÇÕES
      if (!type || type === 'manutencoes') {
        try {
          results.manutencoes = await this.prisma.manutencao.findMany({
            where: {
              OR: [
                { titulo: { contains: query } },
                { descricao: { contains: query } },
                { solicitante: { contains: query } },
                { observacoes: { contains: query } }
              ]
            },
            include: {
              equipamento: {
                select: { nome: true, modelo: true }
              }
            },
            orderBy: { dataHora: 'desc' },
            take: 10
          });
        } catch (error) {
          console.error('❌ Erro ao buscar manutenções:', error);
          results.manutencoes = [];
        }
      }

      // ⭐ BUSCAR DOCUMENTOS
      if (!type || type === 'documentos') {
        try {
          results.documentos = await this.prisma.documento.findMany({
            where: {
              OR: [
                { titulo: { contains: query } },
                { descricao: { contains: query } },
                { tipo: { contains: query } }
              ]
            },
            include: {
              equipamento: {
                select: { nome: true, modelo: true }
              }
            },
            take: 10
          });
        } catch (error) {
          console.error('❌ Erro ao buscar documentos:', error);
          results.documentos = [];
        }
      }

      // ⭐ BUSCAR CATEGORIAS
      if (!type || type === 'categorias') {
        try {
          results.categorias = await this.prisma.categoria.findMany({
            where: {
              OR: [
                { nome: { contains: query } },
                { descricao: { contains: query } }
              ]
            },
            include: {
              _count: {
                select: { equipamentos: true }
              }
            },
            take: 5
          });
        } catch (error) {
          console.error('❌ Erro ao buscar categorias:', error);
          results.categorias = [];
        }
      }

      // Calcular total
      results.total = results.equipamentos.length + 
                    results.manutencoes.length + 
                    results.documentos.length + 
                    results.categorias.length;

      console.log('✅ [SearchService] Busca concluída:', {
        equipamentos: results.equipamentos.length,
        manutencoes: results.manutencoes.length,
        documentos: results.documentos.length,
        categorias: results.categorias.length,
        total: results.total
      });

      return results;

    } catch (error) {
      console.error('❌ [SearchService] Erro na busca:', error);
      return {
        equipamentos: [],
        manutencoes: [],
        documentos: [],
        categorias: [],
        total: 0
      };
    }
  }

  async getSuggestions(query: string): Promise<Suggestion[]> {
    try {
      const suggestions: Suggestion[] = [];

      if (!query || query.length < 1) {
        return suggestions;
      }

      // Sugestões de equipamentos
      try {
        const equipamentos = await this.prisma.equipamento.findMany({
          where: {
            OR: [
              { nome: { contains: query } },
              { modelo: { contains: query } },
              { fabricante: { contains: query } }
            ]
          },
          select: { nome: true, modelo: true, fabricante: true },
          take: 5
        });

        equipamentos.forEach(eq => {
          suggestions.push({
            type: 'equipamento',
            title: eq.nome,
            subtitle: `${eq.modelo || ''} - ${eq.fabricante || ''}`,
            icon: 'cog'
          });
        });
      } catch (error) {
        console.error('❌ Erro ao buscar sugestões de equipamentos:', error);
      }

      // Sugestões de manutenções
      try {
        const manutencoes = await this.prisma.manutencao.findMany({
          where: {
            titulo: { contains: query }
          },
          select: { titulo: true, status: true },
          take: 3
        });

        manutencoes.forEach(man => {
          suggestions.push({
            type: 'manutencao',
            title: man.titulo,
            subtitle: `Status: ${man.status}`,
            icon: 'wrench'
          });
        });
      } catch (error) {
        console.error('❌ Erro ao buscar sugestões de manutenções:', error);
      }

      return suggestions.slice(0, 8);

    } catch (error) {
      console.error('❌ [SearchService] Erro ao buscar sugestões:', error);
      return [];
    }
  }
}
