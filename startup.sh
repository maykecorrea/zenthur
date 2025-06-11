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

# ✅ INICIAR PM2 EM BACKGROUND E AGUARDAR
echo "🚀 Iniciando aplicações com PM2..."
cd /app
pm2-runtime start ecosystem.config.js --env production &
PM2_PID=$!

# ✅ AGUARDAR APLICAÇÕES INICIAREM
echo "⏳ Aguardando aplicações iniciarem..."
sleep 20

# ✅ VERIFICAR SE BACKEND ESTÁ RESPONDENDO
echo "🔍 Testando backend..."
for i in {1..10}; do
    if curl -f http://127.0.0.1:3002/api/healthcheck/ping > /dev/null 2>&1; then
        echo "✅ Backend respondendo na tentativa $i"
        break
    else
        echo "⏳ Backend não responde - tentativa $i/10"
        sleep 3
    fi
done

echo "🎯 Sistema iniciado - aguardando requisições..."

# ✅ MANTER PROCESSO PRINCIPAL VIVO
wait $PM2_PID