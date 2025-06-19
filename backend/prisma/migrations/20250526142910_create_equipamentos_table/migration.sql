/*
  Warnings:

  - You are about to drop the `Documento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Documento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Equipamento";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "equipamentos" (
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
    "tipo" TEXT NOT NULL,
    "categoriaId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "equipamentos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT,
    "arquivo" TEXT NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "equipamentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documentos_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "criticidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'recebida',
    "codigo" TEXT,
    "dataHora" DATETIME NOT NULL,
    "responsavel" TEXT,
    "observacoes" TEXT,
    "dataInicioExecucao" DATETIME,
    "dataConclusao" DATETIME,
    "tempoExecucao" INTEGER,
    "equipamentoId" INTEGER NOT NULL,
    "solicitante" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manutencao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manutencao" ("codigo", "createdAt", "criticidade", "dataConclusao", "dataHora", "dataInicioExecucao", "descricao", "equipamentoId", "id", "observacoes", "responsavel", "solicitante", "status", "tempoExecucao", "tipo", "titulo", "updatedAt", "userId") SELECT "codigo", "createdAt", "criticidade", "dataConclusao", "dataHora", "dataInicioExecucao", "descricao", "equipamentoId", "id", "observacoes", "responsavel", "solicitante", "status", "tempoExecucao", "tipo", "titulo", "updatedAt", "userId" FROM "Manutencao";
DROP TABLE "Manutencao";
ALTER TABLE "new_Manutencao" RENAME TO "Manutencao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
