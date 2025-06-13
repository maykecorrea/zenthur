const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    // Listar todos os usuários
    const users = await prisma.user.findMany();
    console.log("Usuários encontrados:", JSON.stringify(users, null, 2));
    
    // Testar autenticação simulada
    console.log("\nTentando autenticar ze@gmail.com:");
    const user = await prisma.user.findUnique({
      where: { email: 'ze@gmail.com' }
    });
    console.log("Usuário encontrado:", user);
    
  } catch (error) {
    console.error("Erro:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
