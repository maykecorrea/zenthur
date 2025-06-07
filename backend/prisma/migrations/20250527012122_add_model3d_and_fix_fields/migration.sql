/*
  Warnings:

  - You are about to drop the column `nomeTecnico` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - Added the required column `tecnicoNome` to the `manutencao_tecnicos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "models_3d" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,
    "urn" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'uploading',
    "translationStatus" TEXT NOT NULL DEFAULT 'pending',
    "progress" TEXT NOT NULL DEFAULT '0%',
    "thumbnail" TEXT,
    "metadata" TEXT,
    "manifest" TEXT,
    "errorMessage" TEXT,
    "userId" INTEGER NOT NULL,
    "equipamentoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "models_3d_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "models_3d_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_manutencao_tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manutencaoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER,
    "tecnicoNome" TEXT NOT NULL,
    "statusAnterior" TEXT,
    "statusAtual" TEXT,
    "observacoes" TEXT,
    "dataAtribuicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinalizacao" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencao_tecnicos_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "manutencoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "manutencao_tecnicos_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_manutencao_tecnicos" ("ativo", "createdAt", "dataAtribuicao", "dataFinalizacao", "id", "manutencaoId", "observacoes", "statusAnterior", "statusAtual", "tecnicoId", "updatedAt") SELECT "ativo", "createdAt", "dataAtribuicao", "dataFinalizacao", "id", "manutencaoId", "observacoes", "statusAnterior", "statusAtual", "tecnicoId", "updatedAt" FROM "manutencao_tecnicos";
DROP TABLE "manutencao_tecnicos";
ALTER TABLE "new_manutencao_tecnicos" RENAME TO "manutencao_tecnicos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "models_3d_objectId_key" ON "models_3d"("objectId");

-- CreateIndex
CREATE UNIQUE INDEX "models_3d_urn_key" ON "models_3d"("urn");
