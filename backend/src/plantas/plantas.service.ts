import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlantasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (this.prisma as any).planta.findMany();
  }

  async findOne(id: number) {
    return (this.prisma as any).planta.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return (this.prisma as any).planta.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return (this.prisma as any).planta.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return (this.prisma as any).planta.delete({
      where: { id },
    });
  }
}
