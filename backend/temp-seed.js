const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // ou bcrypt, dependendo do que estiver instalado

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('coisalinda', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'mayke@gmail.com' },
    update: {},
    create: {
      email: 'mayke@gmail.com',
      nome: 'Administrador',
      password: hashedPassword,
      role: 'admin',
      empresa: 'Sua Empresa',
      telefone: '(00) 0000-0000'
    },
  });
  
  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
