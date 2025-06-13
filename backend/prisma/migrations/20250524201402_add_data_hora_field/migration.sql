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
    "equipamentoId" INTEGER NOT NULL,
    "solicitante" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manutencao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manutencao" ("createdAt", "criticidade", "dataHora", "descricao", "equipamentoId", "id", "status", "tipo", "titulo", "updatedAt", "userId") SELECT "createdAt", "criticidade", "dataHora", "descricao", "equipamentoId", "id", "status", "tipo", "titulo", "updatedAt", "userId" FROM "Manutencao";
DROP TABLE "Manutencao";
ALTER TABLE "new_Manutencao" RENAME TO "Manutencao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
