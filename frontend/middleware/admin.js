import { defineNuxtRouteMiddleware, navigateTo } from '#app'
<<<<<<< HEAD

export default defineNuxtRouteMiddleware(() => {
  if (process.server) return;
  
  console.log("🔍 Middleware admin verificando...");
  
  const adminToken = localStorage.getItem('admin_token');
  const adminUserData = localStorage.getItem('admin_user');
  
  console.log("🔑 Admin token:", adminToken ? 'Presente' : 'Ausente');
  console.log("👤 Admin user:", adminUserData ? 'Presente' : 'Ausente');

  if (!adminToken || !adminUserData) {
    console.log('❌ Token ou dados admin não encontrados, redirecionando...');
    return navigateTo('/admin-login');
  }
  
  try {
    const userData = JSON.parse(adminUserData);
    console.log("👤 Dados do usuário:", userData);
    
    if (userData.role !== 'admin') {
      console.log(`❌ Usuário não é admin (role: ${userData.role}), redirecionando...`);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return navigateTo('/admin-login');
    }
    
    console.log('✅ Acesso admin autorizado');
  } catch (error) {
    console.error('❌ Erro ao validar dados admin:', error);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    return navigateTo('/admin-login');
  }
});
=======
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
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
