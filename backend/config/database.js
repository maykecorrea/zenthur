const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

console.log('✅ [Database] Prisma Client configurado');

// Função para inicializar conexão
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ [Database] Conectado ao banco de dados');
    return true;
  } catch (error) {
    console.error('❌ [Database] Erro na conexão:', error);
    throw error;
  }
};

// Função para desconectar
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ [Database] Desconectado do banco de dados');
  } catch (error) {
    console.error('❌ [Database] Erro ao desconectar:', error);
  }
};

// Exportar o cliente Prisma
module.exports = prisma;
module.exports.connectDB = connectDB;
module.exports.disconnectDB = disconnectDB;