-- CreateTable
CREATE TABLE "Manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "equipamento" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataProgramada" DATETIME,
    "responsavel" TEXT,
    "status" TEXT DEFAULT 'Pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
