FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema (conforme docs Alpine)
RUN apk add --no-cache python3 make g++ openssl nginx curl wget net-tools bash

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

# ✅ COPIAR STARTUP.SH AO INVÉS DE CRIAR INLINE
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Verificar script
RUN ls -la /app/startup.sh
RUN head -10 /app/startup.sh

# Expor porta
EXPOSE 3000

# ✅ HEALTHCHECK com TIMEOUT MAIOR - aplicações precisam de tempo para iniciar
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/healthcheck/ping || exit 1

# Entrypoint
ENTRYPOINT ["/bin/bash", "/app/startup.sh"]