/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Categoria_nome_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Categoria";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_equipamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tag" TEXT,
    "numeroSerie" TEXT,
    "fabricante" TEXT,
    "modelo" TEXT,
    "dataAquisicao" DATETIME,
    "localizacao" TEXT,
    "unidade" TEXT,
    "disciplina" TEXT,
    "detalhes" TEXT,
    "area" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'Equipamento',
    "categoriaId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "equipamentos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_equipamentos" ("area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId") SELECT "area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId" FROM "equipamentos";
DROP TABLE "equipamentos";
ALTER TABLE "new_equipamentos" RENAME TO "equipamentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_userId_key" ON "categorias"("nome", "userId");
