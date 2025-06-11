#!/bin/bash

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

# ✅ TESTAR SE PORTA 3000 ESTÁ ESCUTANDO
if ! netstat -tuln | grep :3000 > /dev/null 2>&1; then
    echo "⚠️ Porta 3000 não está escutando"
    echo "📋 Portas ativas:"
    netstat -tuln
fi

# ✅ INICIAR PM2 EM FOREGROUND
echo "🚀 Iniciando aplicações com PM2..."
cd /app
exec pm2-runtime start ecosystem.config.js --env production