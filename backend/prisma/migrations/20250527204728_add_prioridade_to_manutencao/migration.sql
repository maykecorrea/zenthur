-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "equipamentoId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "manutencoes_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "equipamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "manutencoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manutencoes" ("codigo", "createdAt", "criticidade", "dataHora", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId") SELECT "codigo", "createdAt", "criticidade", "dataHora", "dataPrimeiraRevisao", "dataProximaManutencao", "descricao", "equipamentoId", "id", "observacoes", "responsavel", "solicitante", "status", "tipo", "titulo", "updatedAt", "userId" FROM "manutencoes";
DROP TABLE "manutencoes";
ALTER TABLE "new_manutencoes" RENAME TO "manutencoes";
CREATE UNIQUE INDEX "manutencoes_codigo_key" ON "manutencoes"("codigo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
