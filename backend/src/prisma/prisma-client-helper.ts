import { PrismaService } from './prisma.service';

export function getPrismaClient(prismaService: PrismaService) {
  return prismaService as unknown as {
    equipamento: any;
    documento: any;
    categoria: any;
    manutencao: any;
    versaodocumento: any;
    user: any;
    manutencaoTecnico: any; // <- Adicionar esta linha
  };
}