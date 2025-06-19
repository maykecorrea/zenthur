import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchService } from './search.service';
import { SearchResults, Suggestion } from './search.types';

@Controller('api/search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchGlobal(
    @Query('q') query: string, 
    @Query('type') type?: string
  ): Promise<SearchResults> {
    console.log('🔍 [SearchController] Busca global:', { query, type });
    
    if (!query || query.trim().length < 2) {
      return {
        equipamentos: [],
        manutencoes: [],
        documentos: [],
        categorias: [],
        total: 0
      };
    }

    return this.searchService.searchGlobal(query.trim(), type);
  }

  @Get('suggestions')
  async getSuggestions(@Query('q') query: string): Promise<Suggestion[]> {
    console.log('💡 [SearchController] Buscando sugestões:', query);
    
    if (!query || query.trim().length < 1) {
      return [];
    }

    return this.searchService.getSuggestions(query.trim());
  }
}