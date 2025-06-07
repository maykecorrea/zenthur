import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchGlobal(
    @Query('q') query: string,
    @Query('type') type?: string
  ) {
    console.log('🔍 [SearchController] Busca recebida:', { query, type });
    
    if (!query || query.trim().length < 2) {
      return {
        equipamentos: [],
        manutencoes: [],
        categorias: [],
        documentos: [],
        total: 0
      };
    }

    try {
      const results = await this.searchService.searchGlobal(query.trim(), type);
      console.log('✅ [SearchController] Resultados enviados:', {
        equipamentos: results.equipamentos.length,
        manutencoes: results.manutencoes.length,
        categorias: results.categorias.length,
        total: results.total
      });
      
      return results;
    } catch (error) {
      console.error('❌ [SearchController] Erro na busca:', error);
      throw error;
    }
  }

  @Get('suggestions')
  async getSuggestions(@Query('q') query: string) {
    console.log('💡 [SearchController] Sugestões solicitadas:', query);
    
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const suggestions = await this.searchService.getSuggestions(query.trim());
      console.log('✅ [SearchController] Sugestões enviadas:', suggestions.length);
      return suggestions;
    } catch (error) {
      console.error('❌ [SearchController] Erro nas sugestões:', error);
      return [];
    }
  }
}