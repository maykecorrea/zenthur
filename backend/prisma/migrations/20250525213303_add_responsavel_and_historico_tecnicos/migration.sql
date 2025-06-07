-- AlterTable
ALTER TABLE "Manutencao" ADD COLUMN "dataConclusao" DATETIME;
ALTER TABLE "Manutencao" ADD COLUMN "dataInicioExecucao" DATETIME;
ALTER TABLE "Manutencao" ADD COLUMN "observacoes" TEXT;
ALTER TABLE "Manutencao" ADD COLUMN "responsavel" TEXT;
ALTER TABLE "Manutencao" ADD COLUMN "tempoExecucao" INTEGER;

-- CreateTable
CREATE TABLE "ManutencaoTecnico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manutencaoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER,
    "nomeTenico" TEXT NOT NULL,
    "statusAnterior" TEXT,
    "statusAtual" TEXT,
    "observacoes" TEXT,
    "dataAtribuicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinalizacao" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ManutencaoTecnico_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ManutencaoTecnico_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
