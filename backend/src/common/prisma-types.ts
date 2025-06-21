// Tipos que estão sendo usados no documentos.service.ts

export interface EquipamentoWithUser {
  id: number;
  tag: string;
  nome: string;
  area?: string;
  userId: number;
  user?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface DocumentoWithVersion {
  id: number;
  titulo: string;
  tipo?: string;
  tamanho?: number;
  equipamentoId: number;
  versao: number;
  revisao?: string;
  descricao?: string;
  nome?: string;
  url?: string;
  arquivo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
