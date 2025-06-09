FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema + nginx
RUN apk add --no-cache python3 make g++ openssl nginx

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
RUN npx prisma generate || echo "Prisma generation failed"

# Frontend - instalar + build
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps --force
RUN npm run build || echo "Frontend build failed"

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

# Usar script de startup
CMD ["/app/startup.sh"]