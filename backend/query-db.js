const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Exemplo: buscar todos os usuários
  const users = await prisma.user.findMany();
  console.log(JSON.stringify(users, null, 2));
  
  // Exemplo: buscar todos os equipamentos
  const equipamentos = await prisma.equipamento.findMany();
  console.log(JSON.stringify(equipamentos, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
