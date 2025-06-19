import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateManutencaoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['corretiva', 'preventiva'])
  tipo: string;

  @IsString()
  @IsNotEmpty()
  data: string; // formato YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  hora: string; // formato HH:MM

  @IsString()
  @IsNotEmpty()
  @IsIn(['baixa', 'media', 'alta'])
  criticidade: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  equipamentoId: number;

  @IsOptional()
  @IsString()
  solicitante?: string;
}