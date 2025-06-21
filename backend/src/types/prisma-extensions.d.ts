import { Prisma } from '@prisma/client';

declare global {
  namespace PrismaTypes {
    type EquipamentoWithRelations = Prisma.EquipamentoGetPayload<{
      include: {
        user: true;
        documentos: true;
      }
    }>;
  }
}

// Estender os tipos do Prisma
declare module '@prisma/client' {
  interface Equipamento {
    userId: number;
    user?: User;
  }

  interface Manutencao {
    userId: number;
    user?: User;
  }

  namespace Prisma {
    interface EquipamentoInclude {
      user?: boolean | { select?: any };
    }
    
    interface ManutencaoInclude {
      user?: boolean | { select?: any };
    }
    
    interface EquipamentoWhereInput {
      userId?: number | NumberFilter<any>;
    }
    
    interface ManutencaoWhereInput {
      userId?: number | NumberFilter<any>;
    }
  }
}

export {};
