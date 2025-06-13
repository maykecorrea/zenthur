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
        
        const config = useRuntimeConfig();
        let baseURL = config.public.apiBase;
        
        if (!baseURL || baseURL === '' || process.env.NODE_ENV === 'production') {
          baseURL = '';
        }
        
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
          
          if (process.client) {
            localStorage.setItem('auth-token', response.token);
            localStorage.setItem('user-data', JSON.stringify(response.user));
          }

          console.log('✅ Login sucesso - Role:', response.user.role);
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
      console.log('🚪 Fazendo logout...');
      
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      
      if (process.client) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        localStorage.clear();
      }
      
      console.log('✅ Logout concluído');
    },

    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth-token');
        const userData = localStorage.getItem('user-data');
        
        if (token && userData) {
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
