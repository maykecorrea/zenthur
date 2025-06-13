const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTables() {
  try {
    console.log('🔧 Verificando tabelas existentes...');
    
    // Verificar tabelas existentes
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`;
    console.log('📊 Tabelas encontradas:', tables.map(t => t.name));
    
    // Criar tabela Planta se não existir
    if (!tables.some(t => t.name === 'Planta')) {
      console.log('🚀 Criando tabela Planta...');
      await prisma.$executeRaw`
        CREATE TABLE "Planta" (
          "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          "titulo" TEXT NOT NULL,
          "descricao" TEXT,
          "imageUrl" TEXT,
          "imagePath" TEXT,
          "fileName" TEXT,
          "ativa" BOOLEAN NOT NULL DEFAULT true,
          "userId" INTEGER NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL,
          FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )
      `;
      console.log('✅ Tabela Planta criada com sucesso!');
    }
    
    // Criar tabela MarcadorPlanta se não existir
    if (!tables.some(t => t.name === 'MarcadorPlanta')) {
      console.log('🚀 Criando tabela MarcadorPlanta...');
      await prisma.$executeRaw`
        CREATE TABLE "MarcadorPlanta" (
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
          FOREIGN KEY ("plantaId") REFERENCES "Planta"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )
      `;
      console.log('✅ Tabela MarcadorPlanta criada com sucesso!');
    }
    
    console.log('🎉 Todas as tabelas estão criadas!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTables();
