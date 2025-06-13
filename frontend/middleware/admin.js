import { defineNuxtRouteMiddleware, navigateTo } from '#app'

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
