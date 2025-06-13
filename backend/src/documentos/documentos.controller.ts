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
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentosService } from './documentos.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
    sub?: number;  // ⭐ ADICIONAR sub para compatibilidade
    id?: number;   // ⭐ ADICIONAR id para compatibilidade
  };
}

@Controller('api/documentos')
@UseGuards(JwtAuthGuard)
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    // ⭐ FUNÇÃO AUXILIAR PARA OBTER userId
    const userId = this.getUserId(req);
    return this.documentosService.findAll(userId);
  }

  @Get('equipamento/:equipamentoId')
  async findByEquipamento(@Param('equipamentoId') equipamentoId: string, @Req() req: RequestWithUser) {
    console.log('🔍 Buscando documentos para equipamento:', equipamentoId);
    const userId = this.getUserId(req);
    return this.documentosService.findByEquipamento(+equipamentoId, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.documentosService.findOne(+id, userId);
  }

  @Post()
  async create(@Body() createDocumentoDto: any, @Req() req: RequestWithUser) {
    try {
      console.log('📄 Controller - POST /api/documentos');
      console.log('📄 Body recebido:', createDocumentoDto);
      
      const userId = this.getUserId(req);
      console.log('📄 UserID extraído:', userId);
      
      if (!userId) {
        throw new UnauthorizedException('Usuário não autenticado');
      }

      // ⭐ PASSAR userId CORRETAMENTE
      const resultado = await this.documentosService.create(createDocumentoDto, userId);
      console.log('✅ Documento criado:', resultado);
      return resultado;
      
    } catch (error) {
      console.error('❌ Controller - Erro no POST:', error);
      throw error;
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('arquivo', {  // ⭐ MUDAR de 'file' para 'arquivo'
    storage: diskStorage({
      destination: './uploads/documentos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `documento-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      // ⭐ FILTRO PARA APENAS PDFs
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Apenas arquivos PDF são permitidos'), false);
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Req() req: RequestWithUser) {
    try {
      console.log('📤 Controller - POST /api/documentos/upload');
      console.log('📤 Arquivo recebido:', file?.originalname);
      console.log('📤 Body recebido:', body);
      
      const userId = this.getUserId(req);
      
      if (!userId) {
        throw new UnauthorizedException('Usuário não autenticado');
      }

      if (!file) {
        throw new Error('Nenhum arquivo foi enviado');
      }

      // ⭐ PASSAR userId CORRETAMENTE
      const resultado = await this.documentosService.createWithFile(file, body, userId);
      console.log('✅ Documento com arquivo criado:', resultado);
      return resultado;
      
    } catch (error) {
      console.error('❌ Controller - Erro no upload:', error);
      throw error;
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('arquivo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDocumentoDto: any,
    @Req() req: RequestWithUser
  ) {
    const userId = this.getUserId(req);
    return this.documentosService.update(+id, file, updateDocumentoDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.documentosService.remove(+id, userId);
  }

  @Get(':id/versions')
  async findVersions(@Param('id') id: string) {
    return this.documentosService.findVersions(+id);
  }

  // ⭐ FUNÇÃO AUXILIAR PARA EXTRAIR userId
  private getUserId(req: RequestWithUser): number {
    // Tentar diferentes propriedades onde o userId pode estar
    const userId = req.user?.userId || req.user?.sub || req.user?.id;
    
    if (!userId) {
      console.error('❌ Nenhum userId encontrado no token. User object:', req.user);
      throw new UnauthorizedException('Token inválido - userId não encontrado');
    }
    
    return Number(userId);
  }
}
