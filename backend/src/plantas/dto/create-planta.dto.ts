// backend/src/plantas/dto/create-planta.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreatePlantaDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}