<<<<<<< HEAD
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Verificar se admin já existe
  const adminExists = await prisma.user.findFirst({
    where: { role: 'admin' }
  })

  if (adminExists) {
    console.log('✅ Admin já existe:', adminExists.email)
    return
  }

  // Criar admin
  const hashedPassword = await bcrypt.hash('coisalinda', 12)
  
  const admin = await prisma.user.create({
    data: {
      email: 'mayke@gmail.com',
      password: hashedPassword,
      nome: 'Mayke Administrador',
      role: 'admin',
      empresa: 'Zenthur',
      telefone: '(11) 99999-9999'
    }
  })

  console.log('✅ Admin criado com sucesso:', admin.email)

  // Criar categoria padrão
  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Geral',
      descricao: 'Categoria padrão para equipamentos',
      userId: admin.id
    }
  })

  console.log('✅ Categoria padrão criada:', categoria.nome)

  // Criar equipamento de exemplo
  const equipamento = await prisma.equipamento.create({
    data: {
      nome: 'Equipamento Exemplo',
      tag: 'EQ-001',
      numeroSerie: 'SN123456',
      fabricante: 'Fabricante Exemplo',
      modelo: 'Modelo X1',
      localizacao: 'Sala 101',
      unidade: 'UN-01',
      disciplina: 'Mecânica',
      area: 'Produção',
      tipo: 'Equipamento',
      categoriaId: categoria.id,
      userId: admin.id
    }
  })

  console.log('✅ Equipamento de exemplo criado:', equipamento.nome)

  console.log('🎉 Seed concluído com sucesso!')
=======
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
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
}

main()
  .catch((e) => {
<<<<<<< HEAD
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
=======
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
