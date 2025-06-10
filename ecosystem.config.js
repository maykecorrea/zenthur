module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './backend',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
        // ✅ ADICIONAR VARIÁVEIS DE AMBIENTE
        DATABASE_URL: 'file:./dev.db',
        JWT_SECRET: 'your-secret-key-change-in-production'
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: '.output/server/index.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 3001,
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
        NITRO_PORT: 3001,
        NITRO_HOST: '0.0.0.0',
        // ✅ ADICIONAR URL DA API
        NUXT_PUBLIC_API_BASE: 'http://127.0.0.1:3002'
      },
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    },
    {
      name: 'aps-viewer',
      cwd: './aps-simple-viewer-nodejs-develop',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 8080,
        NODE_ENV: 'production',
        APS_CLIENT_ID: 'ikAxu2kojFkJZJyfVNyeuyA4ZSUdjiSYcgshGsOqKun0CXK8',
        APS_CLIENT_SECRET: 'ptAKyk2xjQzSNbtOgWcWiRhiQQKp9OrJlQ3rNlMKYqkCkAJeGkyOd9fEU0RBTebC',
        APS_BUCKET: 'zenthur-test-models'
      },
      error_file: './logs/aps-err.log',
      out_file: './logs/aps-out.log',
      log_file: './logs/aps-combined.log',
      time: true
    }
  ]
}