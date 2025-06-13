<<<<<<< HEAD
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  
  console.log(`🔍 Middleware global - Rota: ${to.path}`);
  
  const publicRoutes = ['/', '/admin-login'];
  const adminRoutes = ['/adm', '/users'];
  
  if (publicRoutes.includes(to.path)) {
    console.log('✅ Rota pública, permitindo acesso');
    return;
  }
  
  if (adminRoutes.includes(to.path)) {
    console.log('🔒 Rota admin, middleware específico vai verificar');
    return;
  }
  
  const authStore = useAuthStore();
  authStore.initializeAuth();
  
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user?.role;
  
  console.log(`🔍 Auth status: ${isAuthenticated}, Role: ${userRole}`);
  
  if (!isAuthenticated) {
    console.log('❌ Não autenticado, redirecionando para login');
    return navigateTo('/');
  }
  
  console.log('✅ Usuário autenticado, permitindo acesso');
});
=======
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
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
