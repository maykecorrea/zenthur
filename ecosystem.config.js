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
        NODE_ENV: 'production'
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'node',
      args: '.output/server/index.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 3001,
        HOST: '0.0.0.0',
        NODE_ENV: 'production'
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
        NODE_ENV: 'production'
      },
      error_file: './logs/aps-err.log',
      out_file: './logs/aps-out.log',
      log_file: './logs/aps-combined.log',
      time: true
    }
  ]
}