import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Usar o mesmo algoritmo de hash que sua aplicação usa (bcrypt)
  const hashedPassword = await bcrypt.hash('coisalinda', 10);
  
  // Criação do usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'mayke@gmail.com' },
    update: {},
    create: {
      email: 'mayke@gmail.com',
      nome: 'Administrador',
      password: hashedPassword, // AQUI está a correção - usar o hash, não o texto da senha
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
