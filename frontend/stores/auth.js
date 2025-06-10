// Este arquivo gerencia o estado de autenticação do usuário

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async login(credentials) {
      this.loading = true;
      try {
        // ✅ USAR $fetch COM URL CORRETA
        const config = useRuntimeConfig();
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
          baseURL: config.public.apiBase
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
        }

        return response;
      } catch (error) {
        console.error('❌ Erro de login:', error);
        this.logout();
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      
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