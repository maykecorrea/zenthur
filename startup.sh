echo "🚀 Iniciando Zenthur System..."

# ✅ TESTAR NGINX PRIMEIRO
echo "🔧 Testando configuração do NGINX..."
nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Erro na configuração do NGINX"
    exit 1
fi

# ✅ INICIAR NGINX EM BACKGROUND
echo "🌐 Iniciando NGINX..."
nginx -g "daemon off;" &
echo "✅ NGINX iniciado em background"

# ✅ AGUARDAR NGINX INICIALIZAR
sleep 3

# ✅ INICIAR PM2 EM FOREGROUND (para ver logs)
echo "🚀 Iniciando aplicações com PM2..."
cd /app
exec pm2-runtime start ecosystem.config.js --env production