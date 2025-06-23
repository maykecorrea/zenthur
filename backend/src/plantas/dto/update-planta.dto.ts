// backend/src/plantas/dto/update-planta.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantaDto } from './create-planta.dto';

export class UpdatePlantaDto extends PartialType(CreatePlantaDto) {}