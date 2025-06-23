#!/bin/bash
set -e  # Parar script em caso de erro

# Cores para logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Zenthur Full Stack...${NC}"

# Função para liberar porta
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Porta $1 em uso. Liberando...${NC}"
        fuser -k $1/tcp || true
        sleep 2
    fi
}

# Liberar portas necessárias
check_port 4000
check_port 4001
check_port 8080

# Parar APENAS os processos deste ecossistema
echo -e "${RED}⏹️  Parando processos do Zenthur...${NC}"
pm2 delete ecosystem.config.js || true

# Instalar dependências se necessário
for dir in backend frontend aps-simple-viewer-nodejs-develop; do
    if [ -d "$dir" ]; then
        if [ ! -d "$dir/node_modules" ]; then
            echo -e "${BLUE}📦 Instalando dependências em $dir...${NC}"
            (cd $dir && npm install --legacy-peer-deps)
        else
            echo -e "${GREEN}✓ Dependências em $dir já instaladas${NC}"
        fi
    fi
done

# Executar migrações do banco (Prisma)
echo -e "${BLUE}🗄️  Executando migrações do banco...${NC}"
cd backend
npx prisma migrate deploy
cd ..

# Iniciar serviços via PM2
echo -e "${GREEN}🚀 Iniciando serviços com PM2...${NC}"
pm2 start ecosystem.config.js

# Salvar configuração PM2
pm2 save

echo -e "${GREEN}✅ Todos os serviços iniciados!${NC}"
echo -e "${BLUE}📊 Serviços ativos:"
pm2 list --name "zenthur*"
echo -e "${GREEN}🌐 Acesse: https://my.zenthur.com${NC}"
echo -e "${BLUE}📝 Ver logs: pm2 logs${NC}"