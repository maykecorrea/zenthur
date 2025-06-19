import { useAuthStore } from '~/stores/auth';

const BASE_URL = 'http://localhost:3001/api';

// Função para fazer requisições HTTP
const request = async (url, options = {}) => {
  try {
    // Obter token diretamente do localStorage para evitar problemas composable fora de setup()
    let token = null;
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
    }
    
    // Fallback para o store se estiver disponível no contexto
    if (!token) {
      try {
        const authStore = useAuthStore();
        // Verificar diferentes formatos possíveis do token
        token = authStore.token || 
                (typeof authStore.getToken === 'function' ? authStore.getToken() : null);
      } catch (storeError) {
        console.warn('🔑 Erro ao acessar authStore, usando localStorage direto');
      }
    }

    if (token) {
      console.log('🔑 Token usado na requisição:', token.substring(0, 20) + '...');
    } else {
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
    console.error(`❌ Erro na requisição ${options.method || 'GET'} ${url}:`, error);
    throw error;
  }
};

// Métodos HTTP
const api = {
  get: (url) => request(url, { method: 'GET' }),
  
  post: (url, data) => {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return request(url, { 
      method: 'POST', 
      body 
    });
  },
  
  put: (url, data) => {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return request(url, { 
      method: 'PUT', 
      body 
    });
  },
  
  delete: (url) => request(url, { method: 'DELETE' }),

  // Upload direto
  directUpload: async (url, formData) => {
    try {
      // Usar o mesmo método de obter token para consistência
      let token = null;
      
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('auth_token');
      }
      
      if (!token) {
        try {
          const authStore = useAuthStore();
          token = authStore.token || 
                 (typeof authStore.getToken === 'function' ? authStore.getToken() : null);
        } catch (storeError) {
          console.warn('🔑 Erro ao acessar authStore, usando localStorage direto');
        }
      }
      
      console.log('📤 Direct upload para:', url);

      const config = {
        method: 'POST',
        body: formData,
        headers: {}
      };

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}${url}`, config);

      console.log(`📤 Upload response: ${response.status}`);

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
      console.log('✅ Upload realizado com sucesso');
      return data;

    } catch (error) {
      console.error('❌ Erro no direct upload:', error);
      throw error;
    }
  }
};

export default api;