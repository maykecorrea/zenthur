import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  // Ignorar middleware durante SSR
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // Verificar token no localStorage
  const isAuthenticated = authStore.checkAuth();
  
  // Rotas públicas que não necessitam autenticação
  const publicRoutes = ['/', '/login', '/register', '/admin-login'];
  
  // Se tentar acessar rota protegida e não estiver autenticado
  if (!publicRoutes.includes(to.path) && !isAuthenticated) {
    console.log('Redirecionando para login: rota protegida sem autenticação');
    return navigateTo('/');
  }
})