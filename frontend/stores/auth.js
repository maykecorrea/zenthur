<<<<<<< HEAD
=======
// Este arquivo gerencia o estado de autenticação do usuário

>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    userRole: (state) => state.user?.role || null
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        console.log('🔐 Fazendo login:', credentials.email);
        
<<<<<<< HEAD
        const config = useRuntimeConfig();
        let baseURL = config.public.apiBase;
        
        if (!baseURL || baseURL === '' || process.env.NODE_ENV === 'production') {
          baseURL = '';
        }
        
=======
        // ✅ CORREÇÃO: Detectar ambiente corretamente
        const config = useRuntimeConfig();
        let baseURL = config.public.apiBase;
        
        // ✅ SE VAZIO OU PRODUÇÃO, USAR URL RELATIVA
        if (!baseURL || baseURL === '' || process.env.NODE_ENV === 'production') {
          baseURL = '';  // URL relativa
        }
        
        console.log('🔗 Base URL para login:', baseURL || 'URL relativa');
        
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
          baseURL: baseURL
        });

        console.log('📡 Resposta do login:', response);

        if (response.success) {
          this.token = response.token;
          this.user = response.user;
          this.isAuthenticated = true;
          
<<<<<<< HEAD
=======
          // Salvar no localStorage
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
          if (process.client) {
            localStorage.setItem('auth-token', response.token);
            localStorage.setItem('user-data', JSON.stringify(response.user));
          }

<<<<<<< HEAD
          console.log('✅ Login sucesso - Role:', response.user.role);
=======
          console.log('✅ Token extraído:', response.token.substring(0, 20) + '...');
          console.log('User role:', response.user.role);
          console.log('User data:', response.user);
          
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
          return true;
        }

        throw new Error(response.message || 'Login failed');
        
      } catch (error) {
        console.error('❌ Erro de login:', error);
        this.error = error.message;
        this.logout();
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
<<<<<<< HEAD
      console.log('🚪 Fazendo logout...');
      
=======
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      
      if (process.client) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
<<<<<<< HEAD
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        localStorage.clear();
      }
      
      console.log('✅ Logout concluído');
    },

    checkAuth() {
=======
      }
    },

    async initializeAuth() {
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      if (process.client) {
        const token = localStorage.getItem('auth-token');
        const userData = localStorage.getItem('user-data');
        
        if (token && userData) {
<<<<<<< HEAD
          try {
            this.token = token;
            this.user = JSON.parse(userData);
            this.isAuthenticated = true;
            return true;
          } catch (error) {
            this.logout();
            return false;
          }
        }
      }
      return false;
    },

    async initializeAuth() {
      if (process.client) {
        this.checkAuth();
      }
    }
  }
});
=======
          this.token = token;
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;
        }
      }
    }
  }
});
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
