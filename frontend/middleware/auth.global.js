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
