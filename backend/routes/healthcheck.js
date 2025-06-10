const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Healthcheck completo
router.get('/health', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const checks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {}
    };

    // 1. Verificar Database
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.services.database = {
        status: 'healthy',
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      checks.services.database = {
        status: 'unhealthy',
        error: error.message,
        responseTime: Date.now() - startTime
      };
      checks.status = 'degraded';
    }

    // 2. Verificar JWT Secret
    checks.services.auth = {
      status: process.env.JWT_SECRET ? 'healthy' : 'unhealthy',
      configured: !!process.env.JWT_SECRET
    };

    if (!process.env.JWT_SECRET) {
      checks.status = 'degraded';
    }

    // 3. Verificar APS Credentials (se configurado)
    if (process.env.APS_CLIENT_ID && process.env.APS_CLIENT_SECRET) {
      checks.services.aps = {
        status: 'configured',
        clientId: !!process.env.APS_CLIENT_ID,
        clientSecret: !!process.env.APS_CLIENT_SECRET
      };
    }

    // 4. Response Time Total
    checks.responseTime = Date.now() - startTime;

    // Status HTTP baseado na saúde geral
    const httpStatus = checks.status === 'healthy' ? 200 : 
                      checks.status === 'degraded' ? 207 : 503;

    res.status(httpStatus).json(checks);

  } catch (error) {
    console.error('❌ Healthcheck failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      responseTime: Date.now() - startTime
    });
  }
});

// Healthcheck simples (apenas status)
router.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Readiness check (pronto para receber tráfego)
router.get('/ready', async (req, res) => {
  try {
    // Verificar se DB está acessível
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Liveness check (processo está vivo)
router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    pid: process.pid,
    uptime: process.uptime()
  });
});

module.exports = router;