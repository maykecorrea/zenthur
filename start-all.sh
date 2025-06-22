#!/bin/bash

# Cores para logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Zenthur Full Stack...${NC}"

# Parar processos antigos
echo -e "${RED}⏹️  Parando processos existentes...${NC}"
pkill -f "node.*server" || true
pkill -f "node.*index.mjs" || true
pkill -f "nuxt" || true
sleep 2

# Função para liberar porta
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Porta $1 ainda em uso. Liberando...${NC}"
        fuser -k $1/tcp || true
        sleep 2
    fi
}

# Liberar portas usadas
check_port 4000
check_port 4001
check_port 8080

# Instalar dependências se necessário
for dir in backend frontend aps-simple-viewer-nodejs-develop; do
    if [ -d "$dir" ]; then
        if [ ! -d "$dir/node_modules" ]; then
            echo -e "${BLUE}📦 Instalando dependências em $dir...${NC}"
            (cd $dir && npm install --legacy-peer-deps)
        fi
    fi
done

# Executar migrações do banco (Prisma)
echo -e "${BLUE}🗄️  Executando migrações do banco...${NC}"
cd backend && npx prisma db push && cd ..

# Criar diretório de logs se não existir
mkdir -p logs

# Iniciar Backend (porta 4001)
echo -e "${GREEN}🔧 Iniciando Backend na porta 4001...${NC}"
cd backend
nohup npm start > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

sleep 3

# Iniciar APS Viewer (porta 8080)
echo -e "${GREEN}🎨 Iniciando APS Viewer na porta 8080...${NC}"
cd aps-simple-viewer-nodejs-develop
nohup npm start > ../logs/aps.log 2>&1 &
APS_PID=$!
cd ..

sleep 3

# Iniciar Frontend (porta 4000)
echo -e "${GREEN}🌐 Iniciando Frontend na porta 4000...${NC}"
cd frontend
nohup npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Salvar PIDs para controle
echo $BACKEND_PID > logs/backend.pid
echo $APS_PID > logs/aps.pid
echo $FRONTEND_PID > logs/frontend.pid

echo -e "${GREEN}✅ Todos os serviços iniciados!${NC}"
echo -e "${BLUE}📊 Serviços ativos:"
echo -e "   🌐 Frontend: porta 4000 (PID: $FRONTEND_PID)"
echo -e "   🔧 Backend:  porta 4001 (PID: $BACKEND_PID)"
echo -e "   🎨 APS:      porta 8080 (PID: $APS_PID)"
echo -e "${GREEN}🎉 Deploy concluído com sucesso!${NC}"