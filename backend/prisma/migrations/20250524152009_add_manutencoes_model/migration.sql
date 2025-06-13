/*
  Warnings:

  - You are about to drop the column `dataFim` on the `Manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `prioridade` on the `Manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `responsavel` on the `Manutencao` table. All the data in the column will be lost.
  - Added the required column `criticidade` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataHora` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "criticidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aberta',
    "equipamentoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manutencao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manutencao" ("createdAt", "descricao", "equipamentoId", "id", "status", "tipo", "updatedAt", "userId") SELECT "createdAt", "descricao", "equipamentoId", "id", "status", "tipo", "updatedAt", "userId" FROM "Manutencao";
DROP TABLE "Manutencao";
ALTER TABLE "new_Manutencao" RENAME TO "Manutencao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
