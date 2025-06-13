/*
  Warnings:

  - You are about to drop the `models_3d` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tecnicoId` on the `manutencao_tecnicos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "models_3d_urn_key";

-- DropIndex
DROP INDEX "models_3d_objectId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "models_3d";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "models3d" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,
    "urn" TEXT,
    "translationStatus" TEXT NOT NULL DEFAULT 'pending',
    "progress" TEXT NOT NULL DEFAULT '0%',
    "fileSize" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'uploading',
    "errorMessage" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "models3d_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_manutencao_tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manutencaoId" INTEGER NOT NULL,
    "tecnicoNome" TEXT NOT NULL,
    "statusAnterior" TEXT,
    "statusAtual" TEXT,
    "observacoes" TEXT,
    "dataAtribuicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinalizacao" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "relatorioTecnico" TEXT,
    "horasTrabalho" REAL,
    "materiaisUsados" TEXT,
    CONSTRAINT "manutencao_tecnicos_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "manutencoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_manutencao_tecnicos" ("ativo", "createdAt", "dataAtribuicao", "dataFinalizacao", "id", "manutencaoId", "observacoes", "statusAnterior", "statusAtual", "tecnicoNome", "updatedAt") SELECT "ativo", "createdAt", "dataAtribuicao", "dataFinalizacao", "id", "manutencaoId", "observacoes", "statusAnterior", "statusAtual", "tecnicoNome", "updatedAt" FROM "manutencao_tecnicos";
DROP TABLE "manutencao_tecnicos";
ALTER TABLE "new_manutencao_tecnicos" RENAME TO "manutencao_tecnicos";
CREATE TABLE "new_manutencoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrimeiraRevisao" DATETIME,
    "dataProximaManutencao" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'recebida',
    "criticidade" TEXT,
    "tipo" TEXT,
    "solicitante" TEXT,
    "responsavel" TEXT,
    "observacoes" TEXT,
    "prioridade" TEXT NOT NULL DEFAULT 'media',
    "dataPrevisao" DATETIME,
    "arquivada" BOOLEAN NOT NULL DEFAULT false,
    "equipamentoId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencoes_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "manutencoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manutencoes" ("codigo", "createdAt", "criticidade", "dataHora", "dataPrevisao", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId") SELECT "codigo", "createdAt", "criticidade", "dataHora", "dataPrevisao", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId" FROM "manutencoes";
DROP TABLE "manutencoes";
ALTER TABLE "new_manutencoes" RENAME TO "manutencoes";
CREATE UNIQUE INDEX "manutencoes_codigo_key" ON "manutencoes"("codigo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "models3d_objectId_key" ON "models3d"("objectId");
