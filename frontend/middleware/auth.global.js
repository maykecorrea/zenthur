// No Nuxt 3, não precisamos importar defineNuxtRouteMiddleware ou navigateTo
// Eles são automaticamente disponíveis em todos os middlewares
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  // Pular verificação no lado do servidor
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // Rotas públicas que não precisam de autenticação
  const rotasPublicas = [
    '/login', 
    '/admin/login', 
    '/admin-login',
    '/register', 
    '/'
  ];
  
  // Ignorar verificação para rotas públicas
  if (rotasPublicas.includes(to.path) || 
      to.path?.includes('login') || 
      to.path?.includes('register')) {
    return;
  }
  
  // Verificar autenticação usando o método do store
  const isAuthenticated = authStore.checkAuth();
  
  // Redirecionar para login se não estiver autenticado tentando acessar rota protegida
  if (!isAuthenticated) {
    console.log('Middleware: Redirecionando para login - acesso não autorizado');
    return navigateTo('/');
  }
});