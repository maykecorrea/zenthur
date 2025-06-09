// backend/src/plantas/dto/create-marcador.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMarcadorDto {
  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  cor?: string = '#ef4444';

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  posicaoX: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  posicaoY: number;
}