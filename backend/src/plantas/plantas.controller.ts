import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Req, 
  UseInterceptors, 
  UploadedFile,
  ParseIntPipe,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlantasService } from './plantas.service';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { CreateMarcadorDto } from './dto/create-marcador.dto';
import { Request } from 'express';

// ✅ INTERFACE PARA CORRIGIR req.user
interface AuthenticatedRequest extends Request {
  user: {
    userId: number;  // ✅ IGUAL AOS EQUIPAMENTOS
    email: string;
    nome: string;
    role: string;
  };
}

@Controller('api/plantas') // ✅ ROTA ÚNICA E CLARA
@UseGuards(JwtAuthGuard)
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {
    console.log('🌱 PlantasController inicializado'); // ✅ LOG PARA DEBUG
  }

  // ✅ ROTA DE TESTE PARA VERIFICAR SE ESTÁ FUNCIONANDO
  @Get('test')
  test() {
    console.log('🧪 Teste do PlantasController executado');
    return { 
      success: true, 
      message: 'PlantasController funcionando!',
      timestamp: new Date().toISOString()
    };
  }

  // ✅ LISTAR PLANTAS DO USUÁRIO
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    console.log('📋 GET /api/plantas - UserId:', req.user.userId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const plantas = await this.plantasService.findAllByUser(userId);
    return { success: true, plantas };
  }

  // ✅ BUSCAR PLANTA POR ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    console.log('🔍 GET /api/plantas/:id - PlantaId:', id, 'UserId:', req.user.userId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const planta = await this.plantasService.findOne(id, userId);
    return { success: true, planta };
  }

  // ✅ CRIAR NOVA PLANTA
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPlantaDto: CreatePlantaDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest
  ) {
    console.log('📤 POST /api/plantas - Dados:', createPlantaDto);
    console.log('📤 POST /api/plantas - Arquivo:', file ? 'Presente' : 'Ausente');
    console.log('📤 POST /api/plantas - UserId:', req.user.userId);
    
    if (!file) {
      throw new BadRequestException('Imagem é obrigatória');
    }
    
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const planta = await this.plantasService.create(createPlantaDto, file, userId);
    
    console.log('✅ Planta criada com ID:', planta.id);
    return { success: true, message: 'Planta criada com sucesso', planta };
  }

  // ✅ ATUALIZAR PLANTA
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlantaDto: UpdatePlantaDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest
  ) {
    console.log('🔄 PUT /api/plantas/:id - PlantaId:', id, 'UserId:', req.user.userId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const planta = await this.plantasService.update(id, updatePlantaDto, file, userId);
    return { success: true, message: 'Planta atualizada com sucesso', planta };
  }

  // ✅ EXCLUIR PLANTA
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    console.log('🗑️ DELETE /api/plantas/:id - PlantaId:', id, 'UserId:', req.user.userId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    await this.plantasService.remove(id, userId);
    return { success: true, message: 'Planta excluída com sucesso' };
  }

  // ✅ ADICIONAR MARCADOR
  @Post(':id/marcadores')
  async addMarcador(
    @Param('id', ParseIntPipe) plantaId: number,
    @Body() createMarcadorDto: CreateMarcadorDto,
    @Req() req: AuthenticatedRequest
  ) {
    console.log('📍 POST /api/plantas/:id/marcadores - PlantaId:', plantaId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const marcador = await this.plantasService.addMarcador(plantaId, createMarcadorDto, userId);
    return { success: true, message: 'Marcador adicionado com sucesso', marcador };
  }

  // ✅ ATUALIZAR MARCADOR
  @Put('marcadores/:marcadorId')
  async updateMarcador(
    @Param('marcadorId', ParseIntPipe) marcadorId: number,
    @Body() updateMarcadorDto: CreateMarcadorDto,
    @Req() req: AuthenticatedRequest
  ) {
    console.log('🔄 PUT /api/plantas/marcadores/:marcadorId - MarcadorId:', marcadorId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    const marcador = await this.plantasService.updateMarcador(marcadorId, updateMarcadorDto, userId);
    return { success: true, message: 'Marcador atualizado com sucesso', marcador };
  }

  // ✅ EXCLUIR MARCADOR
  @Delete('marcadores/:marcadorId')
  async removeMarcador(
    @Param('marcadorId', ParseIntPipe) marcadorId: number,
    @Req() req: AuthenticatedRequest
  ) {
    console.log('🗑️ DELETE /api/plantas/marcadores/:marcadorId - MarcadorId:', marcadorId);
    const userId = req.user.userId; // ✅ EM VEZ DE req.user.sub
    await this.plantasService.removeMarcador(marcadorId, userId);
    return { success: true, message: 'Marcador excluído com sucesso' };
  }
}
