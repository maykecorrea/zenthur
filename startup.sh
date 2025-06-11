#!/bin/bash
set -e

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
sleep 3

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

# ✅ INICIAR PM2 SEM EXEC (para não bloquear)
pm2-runtime start ecosystem.config.js --env production &
PM2_PID=$!

# ✅ AGUARDAR APLICAÇÕES INICIAREM (MAIS TEMPO)
echo "⏳ Aguardando aplicações iniciarem..."
sleep 30

# ✅ VERIFICAR SE APLICAÇÕES ESTÃO RODANDO
echo "🔍 Verificando status das aplicações..."

# Verificar PM2
if ! ps -p $PM2_PID > /dev/null 2>&1; then
    echo "❌ PM2 falhou ao iniciar"
    exit 1
fi

# ✅ VERIFICAR SE BACKEND ESTÁ RESPONDENDO
echo "🔍 Testando backend..."
for i in {1..15}; do
    if curl -f http://127.0.0.1:3002/api/healthcheck/ping > /dev/null 2>&1; then
        echo "✅ Backend respondendo na tentativa $i"
        break
    else
        echo "⏳ Backend não responde - tentativa $i/15"
        sleep 2
    fi
    
    if [ $i -eq 15 ]; then
        echo "❌ Backend não respondeu após 15 tentativas"
        echo "📋 Verificando logs do PM2..."
        pm2 logs --nostream || echo "Sem logs PM2"
        # Continuar mesmo assim (não falhar o healthcheck)
    fi
done

# ✅ VERIFICAR SE FRONTEND ESTÁ RESPONDENDO
echo "🔍 Testando frontend..."
for i in {1..10}; do
    if curl -f http://127.0.0.1:3001 > /dev/null 2>&1; then
        echo "✅ Frontend respondendo na tentativa $i"
        break
    else
        echo "⏳ Frontend não responde - tentativa $i/10"
        sleep 2
    fi
done

echo "🎯 Sistema iniciado - aguardando requisições..."
echo "📊 Status dos serviços:"
echo "  - NGINX: ✅ Rodando (PID: $NGINX_PID)"
echo "  - PM2: ✅ Rodando (PID: $PM2_PID)"
echo "  - Backend: http://127.0.0.1:3002"
echo "  - Frontend: http://127.0.0.1:3001"
echo "  - APS: http://127.0.0.1:8080"

# ✅ MANTER PROCESSO PRINCIPAL VIVO
wait $PM2_PID