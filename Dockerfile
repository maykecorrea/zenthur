FROM node:20-alpine

WORKDIR /app

# ✅ INSTALAR PACOTES CORRETOS PARA ALPINE
RUN apk add --no-cache python3 make g++ openssl nginx curl net-tools bash

# Instalar PM2 globalmente
RUN npm install -g pm2

# ✅ CRIAR DIRETÓRIOS NGINX NECESSÁRIOS
RUN mkdir -p /app/logs /var/log/nginx /var/cache/nginx /var/lib/nginx /run/nginx

# Copiar arquivos de configuração
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY aps-simple-viewer-nodejs-develop/package*.json ./aps-simple-viewer-nodejs-develop/

# Instalar dependências root
RUN npm install --production=false

# Copiar código fonte
COPY . .

# Backend - instalar + gerar Prisma
WORKDIR /app/backend
RUN npm install --legacy-peer-deps --force
RUN npx prisma generate

# Frontend - build
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps --force --include=dev
ENV NUXT_PUBLIC_API_BASE=http://127.0.0.1:3002
ENV NODE_ENV=production
RUN rm -rf .nuxt .output node_modules/.cache
RUN npm run build
RUN test -f .output/server/index.mjs || (echo "ERROR: Frontend build failed" && exit 1)

# APS - instalar
WORKDIR /app/aps-simple-viewer-nodejs-develop
RUN npm install --legacy-peer-deps --force

# Voltar para raiz
WORKDIR /app

# ✅ CONFIGURAR NGINX E TESTAR
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

# ✅ CRIAR STARTUP.SH DIRETAMENTE COM BASH CORRETO
RUN cat > /app/startup.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 Iniciando Zenthur System..."

# ✅ TESTAR NGINX PRIMEIRO
echo "🔧 Testando configuração do NGINX..."
nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Erro na configuração do NGINX"
    exit 1
fi

# ✅ CRIAR DIRETÓRIOS NECESSÁRIOS PARA NGINX
mkdir -p /var/log/nginx
mkdir -p /var/cache/nginx
mkdir -p /run/nginx

# ✅ INICIAR NGINX EM BACKGROUND COM PID
echo "🌐 Iniciando NGINX..."
nginx -g "daemon off;" &
NGINX_PID=$!
echo "✅ NGINX iniciado (PID: $NGINX_PID)"

# ✅ AGUARDAR NGINX INICIALIZAR COMPLETAMENTE
sleep 5

# ✅ VERIFICAR SE NGINX ESTÁ REALMENTE RODANDO
if ! pgrep nginx > /dev/null; then
    echo "❌ NGINX falhou ao iniciar"
    echo "📋 Logs do NGINX:"
    cat /var/log/nginx/error.log 2>/dev/null || echo "Nenhum log encontrado"
    exit 1
fi

echo "✅ NGINX rodando corretamente"

# ✅ TESTAR SE PORTA 3000 ESTÁ ESCUTANDO (usando net-tools)
if ! netstat -tuln | grep :3000 > /dev/null 2>&1; then
    echo "⚠️ Porta 3000 não está escutando ainda"
    echo "📋 Portas ativas:"
    netstat -tuln | head -10
fi

# ✅ INICIAR PM2 EM FOREGROUND
echo "🚀 Iniciando aplicações com PM2..."
cd /app
exec pm2-runtime start ecosystem.config.js --env production
EOF

# ✅ TORNAR EXECUTÁVEL E VERIFICAR
RUN chmod +x /app/startup.sh
RUN ls -la /app/startup.sh
RUN head -5 /app/startup.sh

# Expor porta
EXPOSE 3000

# ✅ HEALTHCHECK SIMPLES
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD curl -f http://localhost:3000/healthcheck/ping || exit 1

# ✅ USAR ENTRYPOINT PARA FORÇAR EXECUÇÃO
ENTRYPOINT ["/bin/bash", "/app/startup.sh"]