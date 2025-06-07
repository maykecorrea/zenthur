/*
  Warnings:

  - A unique constraint covering the columns `[nome,userId]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Categoria_nome_key";

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_userId_key" ON "Categoria"("nome", "userId");
