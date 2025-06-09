FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++ openssl

# Copiar arquivos de configuração primeiro (para cache do Docker)
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY aps-simple-viewer-nodejs-develop/package*.json ./aps-simple-viewer-nodejs-develop/

# Instalar dependências raiz (concurrently e rimraf)
RUN npm install --only=dev

# Copiar código fonte
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY aps-simple-viewer-nodejs-develop/ ./aps-simple-viewer-nodejs-develop/

# Instalar dependências de cada projeto
WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install

WORKDIR /app/aps-simple-viewer-nodejs-develop
RUN npm install

# Gerar Prisma Client
WORKDIR /app/backend
RUN npx prisma generate

# Voltar para raiz
WORKDIR /app

# Expor portas
EXPOSE 3000 5000 8080

# Comando para iniciar todos os serviços
CMD ["npm", "start"]