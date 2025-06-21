-- Primeiro adiciona a coluna como NULLABLE
ALTER TABLE "Categoria" ADD COLUMN "userId" INTEGER;

-- Atualiza os registros existentes para um ID de usuário válido
UPDATE "Categoria" SET "userId" = 1 WHERE "userId" IS NULL;

-- Agora torna a coluna NOT NULL
PRAGMA foreign_keys=off;
CREATE TABLE "new_Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Categoria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("id", "nome", "descricao", "userId", "createdAt", "updatedAt") 
  SELECT "id", "nome", "descricao", "userId", "createdAt", "updatedAt" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
PRAGMA foreign_keys=on;
