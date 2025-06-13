/*
  Warnings:

  - Added the required column `tipo` to the `Equipamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
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
    "tipo" TEXT NOT NULL,
    "categoriaId" INTEGER,
    CONSTRAINT "Equipamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Equipamento" ("categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "unidade", "updatedAt", "userId") SELECT "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "unidade", "updatedAt", "userId" FROM "Equipamento";
DROP TABLE "Equipamento";
ALTER TABLE "new_Equipamento" RENAME TO "Equipamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
