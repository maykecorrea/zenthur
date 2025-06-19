import { useAuthStore } from '~/stores/auth';

export function useAuth() {
  const getAuthHeaders = () => {
    const authStore = useAuthStore();
    
    // Obter o token do store ou localStorage como fallback
    const token = authStore.token || localStorage.getItem('auth_token');
    
    if (!token) {
      return {};
    }
    
    return {
      'Authorization': `Bearer ${token}`
    };
  };
  
  return {
    getAuthHeaders
  };
}