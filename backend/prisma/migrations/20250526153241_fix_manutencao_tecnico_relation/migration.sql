/*
  Warnings:

  - You are about to drop the `Manutencao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ManutencaoTecnico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Manutencao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ManutencaoTecnico";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "manutencoes" (
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
    "equipamentoId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencoes_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "manutencoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manutencao_tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manutencaoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER,
    "nomeTecnico" TEXT NOT NULL,
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
    CONSTRAINT "equipamentos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_equipamentos" ("area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId") SELECT "area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId" FROM "equipamentos";
DROP TABLE "equipamentos";
ALTER TABLE "new_equipamentos" RENAME TO "equipamentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "manutencoes_codigo_key" ON "manutencoes"("codigo");
