/*
  Warnings:

  - You are about to drop the `Planta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Planta";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "arquivo" TEXT NOT NULL,
    "equipamentoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Documento_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Documento" ("arquivo", "createdAt", "equipamentoId", "id", "tipo", "titulo", "updatedAt") SELECT "arquivo", "createdAt", "equipamentoId", "id", "tipo", "titulo", "updatedAt" FROM "Documento";
DROP TABLE "Documento";
ALTER TABLE "new_Documento" RENAME TO "Documento";
CREATE TABLE "new_Equipamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "numeroSerie" TEXT,
    "fabricante" TEXT,
    "modelo" TEXT,
    "dataAquisicao" DATETIME,
    "localizacao" TEXT,
    "unidade" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "disciplina" TEXT,
    "detalhes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Equipamento" ("createdAt", "dataAquisicao", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tipo", "updatedAt") SELECT "createdAt", "dataAquisicao", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", coalesce("status", 'Ativo') AS "status", "tipo", "updatedAt" FROM "Equipamento";
DROP TABLE "Equipamento";
ALTER TABLE "new_Equipamento" RENAME TO "Equipamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
