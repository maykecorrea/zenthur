/*
  Warnings:

  - You are about to drop the column `data` on the `Manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `dataProgramada` on the `Manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `equipamento` on the `Manutencao` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Made the column `equipamentoId` on table `Documento` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dataInicio` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipamentoId` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "titulo" TEXT,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "arquivo" TEXT,
    "tamanho" INTEGER,
    "equipamentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Documento_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Documento" ("arquivo", "createdAt", "equipamentoId", "id", "tipo", "titulo", "updatedAt") SELECT "arquivo", "createdAt", "equipamentoId", "id", "tipo", "titulo", "updatedAt" FROM "Documento";
DROP TABLE "Documento";
ALTER TABLE "new_Documento" RENAME TO "Documento";
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manutencao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manutencao" ("createdAt", "id", "responsavel", "status", "tipo", "updatedAt") SELECT "createdAt", "id", "responsavel", coalesce("status", 'Pendente') AS "status", "tipo", "updatedAt" FROM "Manutencao";
DROP TABLE "Manutencao";
ALTER TABLE "new_Manutencao" RENAME TO "Manutencao";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome" TEXT,
    "empresa" TEXT,
    "telefone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "empresa", "id", "nome", "password", "role", "telefone", "updatedAt") SELECT "createdAt", "email", "empresa", "id", "nome", "password", coalesce("role", 'user') AS "role", "telefone", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
