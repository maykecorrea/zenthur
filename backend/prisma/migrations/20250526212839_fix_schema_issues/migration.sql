/*
  Warnings:

  - Made the column `titulo` on table `documentos` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_documentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "nome" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'manual',
    "descricao" TEXT,
    "arquivo" TEXT,
    "url" TEXT,
    "fileName" TEXT,
    "pdfFileName" TEXT,
    "tamanho" INTEGER,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "revisao" TEXT,
    "equipamentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documentos_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_documentos" ("arquivo", "createdAt", "descricao", "equipamentoId", "id", "nome", "revisao", "tamanho", "tipo", "titulo", "updatedAt", "url", "versao") SELECT "arquivo", "createdAt", "descricao", "equipamentoId", "id", "nome", "revisao", "tamanho", coalesce("tipo", 'manual') AS "tipo", "titulo", "updatedAt", "url", "versao" FROM "documentos";
DROP TABLE "documentos";
ALTER TABLE "new_documentos" RENAME TO "documentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
