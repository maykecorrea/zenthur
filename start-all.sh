#!/bin/bash

# Cores para logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Zenthur Full Stack...${NC}"

# Parar processos existentes
echo -e "${RED}⏹️  Parando processos existentes...${NC}"
pkill -f "node.*server" || true
pkill -f "node.*index.mjs" || true
sleep 2

# Função para verificar se porta está livre
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Porta $1 ainda em uso${NC}"
        fuser -k $1/tcp || true
        sleep 2
    fi
}

# Verificar e liberar portas
check_port 4000
check_port 4001
check_port 8080

# Executar migrações do banco (se necessário)
echo -e "${BLUE}🗄️  Executando migrações do banco...${NC}"
cd backend && npx prisma db push && cd ..

# Iniciar Backend (porta 4001)
echo -e "${GREEN}🔧 Iniciando Backend na porta 4001...${NC}"
cd backend
nohup npm start > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
sleep 3

# Iniciar APS Viewer (porta 8080)
echo -e "${GREEN}🎨 Iniciando APS Viewer na porta 8080...${NC}"
cd aps-simple-viewer-nodejs-develop
nohup npm start > ../logs/aps.log 2>&1 &
APS_PID=$!
cd ..

# Aguardar APS inicializar
sleep 3

# Iniciar Frontend (porta 4000)
echo -e "${GREEN}🌐 Iniciando Frontend na porta 4000...${NC}"
cd frontend
nohup npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Criar diretório de logs se não existir
mkdir -p logs

# Salvar PIDs para futuro controle
echo $BACKEND_PID > logs/backend.pid
echo $APS_PID >