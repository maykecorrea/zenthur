import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEquipamentoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  area?: string; // Este campo deve existir

  @IsOptional()
  @IsString()
  numeroSerie?: string;

  @IsOptional()
  @IsString()
  fabricante?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  dataAquisicao?: string; // ⭐ MANTER COMO STRING

  @IsOptional()
  @IsString()
  localizacao?: string;

  @IsOptional()
  @IsString()
  unidade?: string;

  @IsOptional()
  @IsString()
  disciplina?: string;

  @IsOptional()
  @IsString()
  detalhes?: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsString()
  tipo: string;

  @IsOptional()
  categoriaId?: number; // ⭐ OPCIONAL
}
