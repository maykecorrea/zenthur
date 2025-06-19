import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  async deleteFile(filename: string): Promise<void> {
    try {
      await fs.unlink(join(process.cwd(), 'uploads', filename));
    } catch (error) {
      console.error(`Erro ao excluir arquivo: ${error.message}`);
    }
  }
}
