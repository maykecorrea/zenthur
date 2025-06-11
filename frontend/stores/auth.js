// Este arquivo gerencia o estado de autenticação do usuário

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
        
        // ✅ CORREÇÃO: Detectar ambiente corretamente
        const config = useRuntimeConfig();
        let baseURL = config.public.apiBase;
        
        // ✅ SE VAZIO OU PRODUÇÃO, USAR URL RELATIVA
        if (!baseURL || baseURL === '' || process.env.NODE_ENV === 'production') {
          baseURL = '';  // URL relativa
        }
        
        console.log('🔗 Base URL para login:', baseURL || 'URL relativa');
        
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
          
          // Salvar no localStorage
          if (process.client) {
            localStorage.setItem('auth-token', response.token);
            localStorage.setItem('user-data', JSON.stringify(response.user));
          }

          console.log('✅ Token extraído:', response.token.substring(0, 20) + '...');
          console.log('User role:', response.user.role);
          console.log('User data:', response.user);
          
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
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      
      if (process.client) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
      }
    },

    async initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth-token');
        const userData = localStorage.getItem('user-data');
        
        if (token && userData) {
          this.token = token;
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;
        }
      }
    }
  }
});