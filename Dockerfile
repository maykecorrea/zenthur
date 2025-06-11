FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema (conforme docs Alpine)
RUN apk add --no-cache python3 make g++ openssl nginx curl net-tools bash

# Instalar PM2 globalmente (conforme docs PM2)
RUN npm install -g pm2

# Criar diretórios necessários
RUN mkdir -p /app/logs /var/log/nginx /var/cache/nginx /var/lib/nginx /run/nginx

# Copiar arquivos de configuração primeiro (Docker best practices)
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
RUN npm install --legacy-peer_deps --force --include=dev
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

# Configurar nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

# Criar startup script (conforme Docker docs)
RUN printf '#!/bin/bash\n\
set -e\n\
\n\
echo "🚀 Iniciando Zenthur System..."\n\
\n\
echo "🔧 Testando configuração do NGINX..."\n\
nginx -t\n\
if [ $? -ne 0 ]; then\n\
    echo "❌ Erro na configuração do NGINX"\n\
    exit 1\n\
fi\n\
\n\
mkdir -p /var/log/nginx\n\
mkdir -p /var/cache/nginx\n\
mkdir -p /run/nginx\n\
\n\
echo "🌐 Iniciando NGINX..."\n\
nginx -g "daemon off;" &\n\
NGINX_PID=$!\n\
echo "✅ NGINX iniciado (PID: $NGINX_PID)"\n\
\n\
sleep 5\n\
\n\
if ! pgrep nginx > /dev/null; then\n\
    echo "❌ NGINX falhou ao iniciar"\n\
    echo "📋 Logs do NGINX:"\n\
    cat /var/log/nginx/error.log 2>/dev/null || echo "Nenhum log encontrado"\n\
    exit 1\n\
fi\n\
\n\
echo "✅ NGINX rodando corretamente"\n\
\n\
echo "🚀 Iniciando aplicações com PM2..."\n\
cd /app\n\
exec pm2-runtime start ecosystem.config.js --env production\n' > /app/startup.sh

# Tornar executável
RUN chmod +x /app/startup.sh

# Verificar script
RUN ls -la /app/startup.sh
RUN head -5 /app/startup.sh

# Expor porta
EXPOSE 3000

# ✅ HEALTHCHECK com TIMEOUT MAIOR - aplicações precisam de tempo para iniciar
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/healthcheck/ping || exit 1

# Entrypoint
ENTRYPOINT ["/bin/bash", "/app/startup.sh"]