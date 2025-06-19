import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  
  console.log("Middleware admin:", {
    isAuthenticated: authStore.isAuthenticated,
    userRole: authStore.userRole,
    user: authStore.user
  });

  // Se não estiver autenticado, redirecionar para login
  if (!authStore.isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login');
    return navigateTo('/');
  }
  
  // Se não for admin, redirecionar para página inicial
  if (authStore.userRole !== 'admin') {
    console.log('Usuário não é admin, redirecionando para home');
    return navigateTo('/dashboard');
  }

  console.log('Acesso autorizado ao painel admin');
})