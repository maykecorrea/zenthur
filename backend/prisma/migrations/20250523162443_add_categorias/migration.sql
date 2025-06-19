/*
  Warnings:

  - You are about to drop the column `tipo` on the `Equipamento` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "categoriaId" INTEGER,
    CONSTRAINT "Equipamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Equipamento" ("createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "unidade", "updatedAt", "userId") SELECT "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "status", "tag", "unidade", "updatedAt", "userId" FROM "Equipamento";
DROP TABLE "Equipamento";
ALTER TABLE "new_Equipamento" RENAME TO "Equipamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
