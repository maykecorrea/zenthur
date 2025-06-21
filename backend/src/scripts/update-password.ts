import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function updatePassword() {
  const prisma = new PrismaClient();
  
  try {
    // Gera o hash para a senha '123456' 
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Atualiza a senha do usuário administrador
    const user = await prisma.user.update({
      where: { email: '1@gmail.com' },
      data: { password: hashedPassword }
    });
    
    console.log('Senha atualizada com sucesso para:', user.email);
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();
