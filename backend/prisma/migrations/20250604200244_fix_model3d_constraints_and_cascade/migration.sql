-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("createdAt", "descricao", "id", "nome", "updatedAt", "userId") SELECT "createdAt", "descricao", "id", "nome", "updatedAt", "userId" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE UNIQUE INDEX "categorias_nome_userId_key" ON "categorias"("nome", "userId");
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
    CONSTRAINT "equipamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_equipamentos" ("area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId") SELECT "area", "categoriaId", "createdAt", "dataAquisicao", "detalhes", "disciplina", "fabricante", "id", "localizacao", "modelo", "nome", "numeroSerie", "tag", "tipo", "unidade", "updatedAt", "userId" FROM "equipamentos";
DROP TABLE "equipamentos";
ALTER TABLE "new_equipamentos" RENAME TO "equipamentos";
CREATE TABLE "new_manutencoes" (
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
    "prioridade" TEXT NOT NULL DEFAULT 'media',
    "dataPrevisao" DATETIME,
    "arquivada" BOOLEAN NOT NULL DEFAULT false,
    "equipamentoId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencoes_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "manutencoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_manutencoes" ("arquivada", "codigo", "createdAt", "criticidade", "dataHora", "dataPrevisao", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId") SELECT "arquivada", "codigo", "createdAt", "criticidade", "dataHora", "dataPrevisao", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "prioridade", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId" FROM "manutencoes";
DROP TABLE "manutencoes";
ALTER TABLE "new_manutencoes" RENAME TO "manutencoes";
CREATE UNIQUE INDEX "manutencoes_codigo_key" ON "manutencoes"("codigo");
CREATE TABLE "new_models3d" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,
    "urn" TEXT,
    "translationStatus" TEXT NOT NULL DEFAULT 'pending',
    "progress" TEXT NOT NULL DEFAULT '0%',
    "fileSize" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'uploading',
    "errorMessage" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "models3d_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_models3d" ("bucketKey", "contentType", "createdAt", "displayName", "errorMessage", "fileSize", "id", "objectId", "objectKey", "progress", "status", "translationStatus", "updatedAt", "urn", "userId") SELECT "bucketKey", "contentType", "createdAt", "displayName", "errorMessage", "fileSize", "id", "objectId", "objectKey", "progress", "status", "translationStatus", "updatedAt", "urn", "userId" FROM "models3d";
DROP TABLE "models3d";
ALTER TABLE "new_models3d" RENAME TO "models3d";
CREATE UNIQUE INDEX "models3d_objectKey_key" ON "models3d"("objectKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
