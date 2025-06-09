FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++ openssl

# Copiar package.json files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY aps-simple-viewer-nodejs-develop/package*.json ./aps-simple-viewer-nodejs-develop/

# Instalar dependências globais
RUN npm install --production=false

# Copiar código fonte
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY aps-simple-viewer-nodejs-develop/ ./aps-simple-viewer-nodejs-develop/

# Instalar dependências de cada projeto
WORKDIR /app/backend
RUN npm install --legacy-peer-deps --force

WORKDIR /app/frontend
RUN npm install --legacy-peer-deps --force

WORKDIR /app/aps-simple-viewer-nodejs-develop
RUN npm install --legacy-peer-deps --force

# Configurar porta
EXPOSE 3000

# Voltar para diretório principal
WORKDIR /app

CMD ["npm", "start"]