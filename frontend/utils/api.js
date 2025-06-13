<<<<<<< HEAD
const getApiBase = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return '';
  }
  return process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002';
};

const api = {
  async request(endpoint, options = {}) {
    const API_BASE = getApiBase();
    
    if (!endpoint.startsWith('/api/')) {
      endpoint = `/api${endpoint}`;
    }
    
    const url = API_BASE ? `${API_BASE}${endpoint}` : endpoint;
    
    console.log(`📡 API ${options.method || 'GET'} ${endpoint}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV}, URL: ${url}`);
    
=======
import { useAuthStore } from '~/stores/auth';

// Usar apenas process.env para funcionar no build
const API_BASE = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3002';

const api = {
  // Função base para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    // Obter token do localStorage
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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

<<<<<<< HEAD
=======
    // Para FormData, não definir Content-Type
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
<<<<<<< HEAD
=======
      console.log(`📡 API ${options.method || 'GET'} ${endpoint}`);
      
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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

<<<<<<< HEAD
=======
  // Métodos específicos
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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

<<<<<<< HEAD
export default api;
export const apiRequest = api.request.bind(api);
export const useApi = api.get.bind(api);
=======
// ✅ EXPORT DEFAULT OBRIGATÓRIO
export default api;

// Manter compatibilidade com código existente
export const apiRequest = api.request.bind(api);
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
