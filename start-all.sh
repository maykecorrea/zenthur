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
check_port 3000
check_port 3001
check_port 8080

# Executar migrações do banco (se necessário)
echo -e "${BLUE}🗄️  Executando migrações do banco...${NC}"
cd backend && npx prisma db push && cd ..

# Iniciar Backend (porta 3001)
echo -e "${GREEN}🔧 Iniciando Backend na porta 3001...${NC}"
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

# Iniciar Frontend (porta 3000)
echo -e "${GREEN}🌐 Iniciando Frontend na porta 3000...${NC}"
cd frontend
nohup npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Criar diretório de logs se não existir
mkdir -p logs

# Salvar PIDs para futuro controle
echo $BACKEND_PID > logs/backend.pid
echo $APS_PID > logs/aps.pid
echo $FRONTEND_PID > logs/frontend.pid

# Aguardar todos os serviços iniciarem
sleep 5

echo -e "${GREEN}✅ Todos os serviços iniciados!${NC}"
echo -e "${BLUE}📊 Serviços iniciados:${NC}"
echo -e "✅ Frontend na porta 3000 (PID: $FRONTEND_PID)"
echo -e "✅ Backend na porta 3001 (PID: $BACKEND_PID)"  
echo -e "✅ APS Viewer na porta 8080 (PID: $APS_PID)"

echo -e "${GREEN}🎉 Deploy concluído com sucesso!${NC}"
