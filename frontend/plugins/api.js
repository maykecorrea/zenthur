import axios from 'axios'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Garanta que axios está importado corretamente
  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  // Interceptor para adicionar o token de autenticação em cada requisição
  api.interceptors.request.use(config => {
    // Usa o cliente apenas no navegador
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })
  
  // Utilize a instância api em vez do axios global
  api.interceptors.response.use(
    response => {
      console.log(`✅ API ${response.config.method} ${response.config.url}: sucesso`);
      return response;
    },
    error => {
      console.error(`❌ API Error:`, error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        // Use nuxtApp para navegação segura
        nuxtApp.$router.push('/login');
      }
      return Promise.reject(error);
    }
  );
  
  // Fornece a instância api para a aplicação
  nuxtApp.provide('api', api)
})