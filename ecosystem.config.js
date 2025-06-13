module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/server.js',
      cwd: '/app',
      instances: 1,
      exec_mode: 'fork', // ← MUDANÇA AQUI
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: '/app/logs/backend-error.log',
      out_file: '/app/logs/backend-out.log',
      log_file: '/app/logs/backend.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 2000
    },
    {
      name: 'frontend',
      script: './.output/server/index.mjs',
      cwd: '/app/frontend',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3001,
        PORT: 3001
      },
      error_file: '/app/logs/frontend-error.log',
      out_file: '/app/logs/frontend-out.log',
      log_file: '/app/logs/frontend.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 2000
    },
    {
      name: 'aps-viewer',
      script: 'npx',
      args: 'http-server dist -p 8080 --cors -c-1',
      cwd: '/app/aps-viewer',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/app/logs/aps-viewer-error.log',
      out_file: '/app/logs/aps-viewer-out.log',
      log_file: '/app/logs/aps-viewer.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 2000
    }
  ]
};
