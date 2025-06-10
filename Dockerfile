FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema + nginx + curl
RUN apk add --no-cache python3 make g++ openssl nginx curl

# Instalar PM2 globalmente
RUN npm install -g pm2

# Criar diretório de logs
RUN mkdir -p /app/logs

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

# Frontend - INSTALAÇÃO COMPLETA
WORKDIR /app/frontend
# ✅ INSTALAR DEPENDÊNCIAS COM devDependencies INCLUÍDAS
RUN npm install --legacy-peer-deps --force --include=dev
# ✅ DEFINIR VARIÁVEIS DE AMBIENTE ANTES DO BUILD
ENV NUXT_PUBLIC_API_BASE=http://127.0.0.1:3002
ENV NODE_ENV=production
# ✅ LIMPAR CACHE E BUILDAR
RUN rm -rf .nuxt .output node_modules/.cache
RUN npm run build

# Verificar se build foi bem-sucedido
RUN test -f .output/server/index.mjs || (echo "ERROR: Frontend build failed - .output/server/index.mjs not found" && exit 1)

# APS - instalar
WORKDIR /app/aps-simple-viewer-nodejs-develop
RUN npm install --legacy-peer-deps --force

# Voltar para raiz
WORKDIR /app

# Configurar nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Script de startup
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Expor apenas porta principal
EXPOSE 3000

# ✅ HEALTHCHECK com tempo maior para inicialização
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/healthcheck/ping || exit 1

# Usar script de startup
CMD ["/app/startup.sh"]