FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++ openssl

# Copiar package.json da raiz
COPY package*.json ./

# Instalar dependências da raiz
RUN npm install

# Copiar código de todos os workspaces
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY aps-simple-viewer-nodejs-develop/ ./aps-simple-viewer-nodejs-develop/

# Instalar todas as dependências
RUN npm run install:all

# Gerar Prisma Client
RUN cd backend && npx prisma generate || echo "Prisma não encontrado, continuando..."

# Build do projeto
RUN npm run build

# PORTAS CORRETAS
EXPOSE 3000 3001 8080

# Script de start
CMD ["npm", "run", "dev"]