import axios from 'axios'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  // Interceptor para adicionar o token de autenticação
  api.interceptors.request.use(config => {
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })
  
  // Melhorar tratamento de erros
  api.interceptors.response.use(
    response => {
      console.log(`✅ API ${response.config.method} ${response.config.url}: sucesso`);
      return response;
    },
    async error => {
      console.error(`❌ API Error:`, error.response?.data || error.message);
      
      if (error.response && error.response.status === 401) {
        console.log('🔄 Token expirado, fazendo logout...');
        
        // Limpar dados de autenticação
        if (process.client) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
        }
        
        // Redirecionar para login
        await nuxtApp.runWithContext(() => navigateTo('/'));
      }
      
      return Promise.reject(error);
    }
  );
  
  nuxtApp.provide('api', api)
})