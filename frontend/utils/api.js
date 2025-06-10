import { useAuthStore } from '~/stores/auth';

// Usar a URL do runtime config
const { $config } = useNuxtApp();
const BASE_URL = $config.public.apiBase;

console.log('🔗 API Base URL:', BASE_URL);

const API_BASE = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002';

const api = {
  // Função base para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    // Obter token do localStorage
    let token = null;
    if (process.client) {
      token = localStorage.getItem('auth-token');
    }

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    // Para FormData, não definir Content-Type
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      console.log(`📡 API ${options.method || 'GET'} ${endpoint}`);
      
      const response = await fetch(url, config);
      
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

      return await response.json();
    } catch (error) {
      console.error('❌ Erro na API:', error);
      throw error;
    }
  },

  // Métodos específicos
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  async post(endpoint, data = {}, options = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body
    });
  },

  async put(endpoint, data = {}, options = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body
    });
  },

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
};

// ✅ EXPORT DEFAULT OBRIGATÓRIO
export default api;

// Manter compatibilidade com código existente
export const apiRequest = api.request.bind(api);