FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema + nginx
RUN apk add --no-cache python3 make g++ openssl nginx

# Instalar PM2 globalmente
RUN npm install -g pm2

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

# Expor apenas porta principal
EXPOSE 3000

# Rodar PM2 + Nginx
CMD ["sh", "-c", "nginx && pm2-runtime start ecosystem.config.js"]