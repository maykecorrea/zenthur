FROM node:20-alpine

WORKDIR /app

# ✅ INSTALAR PACOTES CORRETOS PARA ALPINE
RUN apk add --no-cache python3 make g++ openssl nginx curl net-tools

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

# ✅ VERIFICAR SE STARTUP.SH EXISTE E TEM CONTEÚDO
RUN ls -la /app/startup.sh && cat /app/startup.sh

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

# ✅ VERIFICAR NOVAMENTE STARTUP.SH E DAR PERMISSÕES
RUN ls -la /app/ | grep startup
RUN chmod +x /app/startup.sh
RUN ls -la /app/startup.sh

# Expor porta
EXPOSE 3000

# ✅ HEALTHCHECK SIMPLES
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD curl -f http://localhost:3000/healthcheck/ping || exit 1

# ✅ USAR CAMINHO ABSOLUTO PARA GARANTIR
CMD ["/app/startup.sh"]