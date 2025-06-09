module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './backend',
      script: 'server.js',
      env: {
        PORT: 3002,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'frontend', 
      cwd: './frontend',
      script: 'node',
      args: '.output/server/index.mjs',
      env: {
        PORT: 3001,
        HOST: '0.0.0.0',
        NODE_ENV: 'production'
      }
    },
    {
      name: 'aps-viewer',
      cwd: './aps-simple-viewer-nodejs-develop', 
      script: 'server.js',
      env: {
        PORT: 8080,
        NODE_ENV: 'production'
      }
    }
  ]
}