
pm2-runtime start ecosystem.config.js &


echo "Aguardando serviços iniciarem..."
sleep 10


echo "Verificando serviços..."
pm2 list

echo "Iniciando nginx..."
nginx -g 'daemon off;'