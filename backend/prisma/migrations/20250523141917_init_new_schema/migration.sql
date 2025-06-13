/*
  Warnings:

  - You are about to drop the column `nome` on the `Documento` table. All the data in the column will be lost.
  - Made the column `arquivo` on table `Documento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titulo` on table `Documento` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Equipamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "arquivo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tamanho" INTEGER,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "equipamentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Documento_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Documento" ("arquivo", "createdAt", "equipamentoId", "id", "tamanho", "tipo", "titulo", "updatedAt", "url") SELECT "arquivo", "createdAt", "equipamentoId", "id", "tamanho", "tipo", "titulo", "updatedAt", "url" FROM "Documento";
DROP TABLE "Documento";
ALTER TABLE "new_Documento" RENAME TO "Documento";
CREATE TABLE "new_Equipamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tag" TEXT,
    "numeroSerie" TEXT,
    "fabricante" TEXT,
    "modelo" TEXT,
    "dataAquisicao" DATETIME,
    "localizacao" TEXT,
    "unidade" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "disciplina" TEXT,
    "detalhes" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Equipamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipamento" ("createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "tipo", "unidade", "updatedAt") SELECT "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "tipo", "unidade", "updatedAt" FROM "Equipamento";
DROP TABLE "Equipamento";
ALTER TABLE "new_Equipamento" RENAME TO "Equipamento";
CREATE TABLE "new_Manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "descricao" TEXT NOT NULL,
    "responsavel" TEXT,
    "prioridade" TEXT,
    "equipamentoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manutencao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manutencao" ("createdAt", "dataFim", "dataInicio", "descricao", "equipamentoId", "id", "prioridade", "responsavel", "status", "tipo", "updatedAt") SELECT "createdAt", "dataFim", "dataInicio", "descricao", "equipamentoId", "id", "prioridade", "responsavel", "status", "tipo", "updatedAt" FROM "Manutencao";
DROP TABLE "Manutencao";
ALTER TABLE "new_Manutencao" RENAME TO "Manutencao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
