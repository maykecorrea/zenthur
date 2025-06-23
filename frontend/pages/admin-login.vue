<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Geometric patterns -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div class="absolute top-20 left-20 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-32 w-24 h-24 border border-indigo-400 rounded-lg rotate-45 animate-bounce"></div>
        <div class="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full animate-ping"></div>
        <div class="absolute bottom-20 right-20 w-20 h-20 border-2 border-cyan-400 rounded-full animate-spin" style="animation-duration: 3s;"></div>
      </div>
      
      <!-- Gradient orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-delayed"></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Icon Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3">
          Admin Portal
        </h1>
        <p class="text-blue-100/80 text-lg font-medium">
          Acesso Administrativo Seguro
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
        <!-- Glass effect overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        
        <div class="relative z-10">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-white/90 mb-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                  <span>Email de Administrador</span>
                </div>
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="admin@empresa.com"
                  class="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                  :class="{ 'border-red-400/50 focus:ring-red-500/30': error }"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-white/90 mb-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>Senha Segura</span>
                </div>
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  placeholder="••••••••••"
                  class="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                  :class="{ 'border-red-400/50 focus:ring-red-500/30': error }"
                />
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="relative">
              <div class="p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-red-200 text-sm font-medium">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <!-- Button gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Loading state -->
                <div v-if="loading" class="flex items-center justify-center space-x-3">
                  <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verificando Credenciais...</span>
                </div>
                
                <!-- Normal state -->
                <div v-else class="flex items-center justify-center space-x-3">
                  <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Acessar Painel Administrativo</span>
                </div>
              </button>
            </div>
          </form>

          <!-- Footer Info -->
          <div class="mt-8 text-center">
            <p class="text-white/60 text-sm flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>Acesso protegido por criptografia de ponta</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Security Info -->
      <div class="mt-6 text-center">
        <div class="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-white/70 text-sm font-medium">Sistema Seguro Online</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// Função de login mantida igual
const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    console.log("Tentando login admin com:", email.value);
    
    const response = await fetch('http://localhost:4001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });
    
    const data = await response.json();
    console.log("Resposta do login admin:", data);
    console.log("Estrutura completa da resposta:", JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      throw new Error(data.message || 'Credenciais inválidas');
    }
    
    // CORRIGIDO: Verificar diferentes estruturas de resposta
    let userRole = null;
    let token = null;
    let userData = null;
    
    // Estrutura 1: { user: {...}, token: '...' }
    if (data.user && data.token) {
      userRole = data.user.role;
      token = data.token;
      userData = data.user;
      console.log("✅ Estrutura tipo 1 detectada");
    }
    // Estrutura 2: { data: { user: {...}, token: '...' } }
    else if (data.data && data.data.user && data.data.token) {
      userRole = data.data.user.role;
      token = data.data.token;
      userData = data.data.user;
      console.log("✅ Estrutura tipo 2 detectada");
    }
    // Estrutura 3: { access_token: '...', user: {...} }
    else if (data.access_token && data.user) {
      userRole = data.user.role;
      token = data.access_token;
      userData = data.user;
      console.log("✅ Estrutura tipo 3 detectada");
    }
    
    console.log("🔍 Dados extraídos:", {
      userRole,
      token: token ? token.substring(0, 20) + '...' : null,
      userData
    });
    
    // VERIFICAÇÃO CORRIGIDA
    if (!userRole || !token || !userData) {
      console.error("❌ Dados incompletos na resposta:", { userRole, token: !!token, userData: !!userData });
      throw new Error('Resposta da API inválida');
    }
    
    // VERIFICAR SE É ADMIN
    if (userRole === 'admin') {
      console.log("✅ Usuário é admin, armazenando dados...");
      
      // Armazenar dados no localStorage
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      console.log("✅ Dados armazenados com sucesso");
      console.log("🔗 Redirecionando para /adm");
      
      // Redirecionar para o painel admin
      await router.push('/adm');
      
    } else {
      console.warn("⚠️ Usuário não é admin. Role encontrada:", userRole);
      error.value = `Apenas administradores podem acessar este painel. Seu role: ${userRole}`;
    }
    
  } catch (err) {
    console.error('❌ Erro de login admin:', err);
    error.value = err.message || 'Erro ao fazer login. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: false
});
</script>

<style scoped>
/* Animações personalizadas */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

/* Efeitos de glass morphism */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Efeitos de hover nos inputs */
input:focus {
  transform: translateY(-1px);
}

/* Gradiente animado no botão */
button:hover {
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Efeitos de focus responsivos */
@media (max-width: 640px) {
  .transform:hover {
    transform: none;
  }
}
</style>