export interface SearchResults {
  equipamentos: any[];
  manutencoes: any[];
  documentos: any[];
  categorias: any[];
  total: number;
}

export interface Suggestion {
  type: string;
  title: string;
  subtitle: string;
  icon: string;
}