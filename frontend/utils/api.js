import { useAuthStore } from '~/stores/auth';

// Usar a URL do runtime config
const { $config } = useNuxtApp();
const BASE_URL = $config.public.apiBase;

console.log('🔗 API Base URL:', BASE_URL);

// Função para fazer requisições HTTP
export const apiRequest = async (url, options = {}) => {
  try {
    // Obter token do localStorage
    let token = null;
    if (process.client) {
      token = localStorage.getItem('auth-token');
    }

    if (!token) {
      console.warn('⚠️ Nenhum token de autenticação encontrado');
    }

    const config = {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    // Para FormData, não definir Content-Type
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type'] && options.method !== 'GET') {
      config.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${url}`, config);
    
    console.log(`📡 API ${options.method || 'GET'} ${url}: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.text();
      let parsedError;
      
      try {
        parsedError = JSON.parse(errorData);
      } catch (e) {
        parsedError = { message: errorData };
      }
      
      throw new Error(JSON.stringify(parsedError));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Erro na API:', error);
    throw error;
  }
};