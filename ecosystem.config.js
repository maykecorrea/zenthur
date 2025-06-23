module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./frontend",
      script: "npm",
      args: "start",
      env: {
        NITRO_HOST: "127.0.0.1",
        NITRO_PORT: 4000,
        NODE_ENV: "production"
      }
    },
    {
      name: "backend",
      cwd: "./backend", 
      script: "npm",
      args: "start",
      env: {
        PORT: 4001, // Garantindo porta fixa
        NODE_ENV: "production"
      }
    },
    {
      name: "aps-viewer",
      cwd: "./aps-simple-viewer-nodejs-develop",
      script: "npm",
      args: "start",
      env: {
        PORT: 8080, // Garantindo porta fixa
        NODE_ENV: "production"
      }
    }
  ]
};