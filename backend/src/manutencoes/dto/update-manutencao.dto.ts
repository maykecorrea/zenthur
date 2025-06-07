import { PartialType } from '@nestjs/mapped-types';
import { CreateManutencaoDto } from './create-manutencao.dto';
import { IsOptional, IsString, IsIn, IsDateString } from 'class-validator';

export class UpdateManutencaoDto extends PartialType(CreateManutencaoDto) {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  @IsIn(['corretiva', 'preventiva'])
  tipo?: string;

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @IsString()
  hora?: string;

  @IsOptional()
  @IsString()
  @IsIn(['baixa', 'media', 'alta'])
  criticidade?: string;

  @IsOptional()
  @IsString()
  @IsIn(['recebida', 'analise', 'execucao', 'concluida', 'cancelada'])
  status?: string;

  @IsOptional()
  @IsString()
  solicitante?: string;

  // NOVOS CAMPOS
  @IsOptional()
  @IsString()
  responsavel?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  // ADICIONAR ESTES CAMPOS
  @IsOptional()
  @IsString()
  dataPrimeiraRevisao?: string;

  @IsOptional()
  @IsString()
  dataProximaManutencao?: string;
}