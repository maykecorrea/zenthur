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
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
