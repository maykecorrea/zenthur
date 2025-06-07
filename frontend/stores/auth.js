// Este arquivo gerencia o estado de autenticação do usuário

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // Estado inicial
  state: () => ({
    apiUrl: 'http://localhost:3001/api', 
    token: null,        
    user: null,         
    role: null,         
    loading: false,
    error: null,
    isAuthenticated: false
  }),
  
  getters: {
    userRole: (state) => state.role
  },
  
  actions: {
    // Login do usuário
    async login(loginData) {  // ⭐ ACEITAR OBJETO
      const { email, password } = loginData;  // ⭐ DESTRUCTURING
      
      this.loading = true;
      this.error = null;
      
      try {
        console.log('🔐 Tentando login com:', loginData);  // ⭐ OBJETO COMPLETO
        
        const response = await fetch(`${this.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })  // ⭐ DESTRUCTURED
        });

        const result = await response.json();
        console.log('📡 Resposta do login:', result);

        if (!response.ok) {
          throw new Error(result.message || 'Erro ao fazer login');
        }

        // ⭐ CORREÇÃO: Extrair token corretamente
        const receivedToken = result.access_token || result.token;
        
        if (!receivedToken) {
          console.error('❌ Token não encontrado na resposta:', result);
          throw new Error('Token não encontrado na resposta');
        }
        
        console.log('✅ Token extraído:', receivedToken.substring(0, 20) + '...');
        
        // ⭐ CORREÇÃO: Salvar token SEM prefixo Bearer
        this.token = receivedToken;
        this.user = result.user || {};
        this.role = this.user.role || 'user';
        this.isAuthenticated = true;
        
        // ⭐ SALVAR NO LOCALSTORAGE SEM Bearer
        if (process.client) {
          localStorage.setItem('auth_token', receivedToken);
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('role', this.role);
        }

        return true;
      } catch (error) {
        console.error('❌ Erro de login:', error);
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    // Verificar token atual
    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth_token');
        if (token) {
          this.token = token;
          this.isAuthenticated = true;
          
          try {
            // Recuperar dados do usuário
            const userStr = localStorage.getItem('user');
            if (userStr) {
              this.user = JSON.parse(userStr);
              this.role = localStorage.getItem('role') || this.user.role || 'user';
            }
          } catch (e) {
            console.error('❌ Erro ao processar dados do usuário:', e);
          }
          
          return true;
        }
      }
      return false;
    },
    
    // Logout do usuário
    logout() {
      this.user = null;
      this.token = null;
      this.role = null;
      this.isAuthenticated = false;
      
      if (process.client) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
      }
    },

    // Inicializar o estado a partir do localStorage
    initAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('user');
        
        if (token) {
          this.token = token;
          this.user = userStr ? JSON.parse(userStr) : null;
          this.role = localStorage.getItem('role') || this.user.role || 'user';
          this.isAuthenticated = true;
        }
      }
    },
    
    // Método para tentar renovar o token expirado
    async refreshToken() {
      try {
        console.log('Tentando renovar token...');
        
        // Se não tivermos um token, não podemos renovar
        if (!this.token) {
          console.warn('Nenhum token para renovar');
          return false;
        }
        
        // Tente usar o endpoint refresh-token se você tiver um
        const response = await fetch('http://localhost:3001/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        
        if (!response.ok) {
          console.error('Falha ao renovar token. Redirecionando para login.');
          // Se falhar, limpe o token e redirecione para login
          this.logout();
          return false;
        }
        
        const data = await response.json();
        this.token = data.token;
        
        // Atualizar no localStorage
        localStorage.setItem('authToken', this.token);
        
        console.log('Token renovado com sucesso');
        return true;
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        this.logout();
        return false;
      }
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    
    setUser(user) {
      this.user = user;
      this.isAuthenticated = true;
    },
    
    // Adicione esta função que está faltando
    loadStoredState() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = token;
      }
    },

    // ⭐ ADICIONAR MÉTODO PARA INICIALIZAR TOKEN
    initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          this.token = token
          this.isAuthenticated = true
          console.log('🔐 Token recuperado do localStorage')
        }
      }
    }
  },
  
  // Desativar persistência automática do Pinia - gerenciaremos manualmente
  persist: false
});