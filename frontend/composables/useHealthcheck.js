export const useHealthcheck = () => {
  const config = useRuntimeConfig()
  
  const checkBackendHealth = async () => {
    try {
      const response = await $fetch('/api/healthcheck/health', {
        baseURL: config.public.apiBase,
        timeout: 5000
      })
      return response
    } catch (error) {
      console.error('❌ Backend healthcheck failed:', error)
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
        services: {},
        responseTime: 0,
        uptime: 0
      }
    }
  }
  
  const checkServices = async () => {
    const results = {
      backend: await checkBackendHealth(),
      frontend: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        url: process.client ? window.location.origin : 'N/A'
      }
    }
    
    return results
  }
  
  return {
    checkBackendHealth,
    checkServices
  }
}