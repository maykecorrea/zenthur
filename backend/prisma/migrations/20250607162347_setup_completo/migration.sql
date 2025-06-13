/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models3d` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `descricao` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `pdfFileName` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `tamanho` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `versao` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `dataAquisicao` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `detalhes` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `unidade` on the `equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `dataAtribuicao` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `dataFinalizacao` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `horasTrabalho` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `materiaisUsados` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `relatorioTecnico` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `statusAnterior` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `statusAtual` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `tecnicoNome` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `manutencao_tecnicos` table. All the data in the column will be lost.
  - You are about to drop the column `arquivada` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `criticidade` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `dataHora` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `dataPrevisao` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `dataPrimeiraRevisao` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `dataProximaManutencao` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `responsavel` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `solicitante` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `manutencoes` table. All the data in the column will be lost.
  - Made the column `nome` on table `documentos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tecnicoId` to the `manutencao_tecnicos` table without a default value. This is not possible if the table is not empty.
  - Made the column `tipo` on table `manutencoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "models3d_objectKey_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "models3d";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
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

-- CreateTable
CREATE TABLE "plantas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "imageUrl" TEXT NOT NULL,
    "imagePath" TEXT,
    "fileName" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "plantas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "marcadores_plantas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "url" TEXT,
    "cor" TEXT NOT NULL DEFAULT '#ef4444',
    "posicaoX" REAL NOT NULL,
    "posicaoY" REAL NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "plantaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "marcadores_plantas_plantaId_fkey" FOREIGN KEY ("plantaId") REFERENCES "plantas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("createdAt", "id", "nome", "updatedAt", "userId") SELECT "createdAt", "id", "nome", "updatedAt", "userId" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_documentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "titulo" TEXT,
    "arquivo" TEXT,
    "tipoArquivo" TEXT,
    "tamanhoArquivo" INTEGER,
    "caminhoArquivo" TEXT,
    "revisao" TEXT,
    "equipamentoId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documentos_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_documentos" ("arquivo", "createdAt", "descricao", "equipamentoId", "id", "nome", "revisao", "titulo", "updatedAt", "userId") SELECT "arquivo", "createdAt", "descricao", "equipamentoId", "id", "nome", "revisao", "titulo", "updatedAt", "userId" FROM "documentos";
DROP TABLE "documentos";
ALTER TABLE "new_documentos" RENAME TO "documentos";
CREATE TABLE "new_equipamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "modelo" TEXT,
    "fabricante" TEXT,
    "numeroSerie" TEXT,
    "localizacao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "equipamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_equipamentos" ("createdAt", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "updatedAt", "userId") SELECT "createdAt", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "updatedAt", "userId" FROM "equipamentos";
DROP TABLE "equipamentos";
ALTER TABLE "new_equipamentos" RENAME TO "equipamentos";
CREATE TABLE "new_manutencao_tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manutencaoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "manutencao_tecnicos_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "manutencoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_manutencao_tecnicos" ("createdAt", "id", "manutencaoId") SELECT "createdAt", "id", "manutencaoId" FROM "manutencao_tecnicos";
DROP TABLE "manutencao_tecnicos";
ALTER TABLE "new_manutencao_tecnicos" RENAME TO "manutencao_tecnicos";
CREATE TABLE "new_manutencoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "prioridade" TEXT NOT NULL DEFAULT 'media',
    "dataInicio" DATETIME,
    "dataFim" DATETIME,
    "observacoes" TEXT,
    "equipamentoId" INTEGER,
    "responsavelId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencoes_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "manutencoes_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_manutencoes" ("createdAt", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "status", "tipo", "titulo", "updatedAt") SELECT "createdAt", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "status", "tipo", "titulo", "updatedAt" FROM "manutencoes";
DROP TABLE "manutencoes";
ALTER TABLE "new_manutencoes" RENAME TO "manutencoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
