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

    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
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

export default api;
export const apiRequest = api.request.bind(api);
export const useApi = api.get.bind(api);
