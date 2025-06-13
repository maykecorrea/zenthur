<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <!-- Header Principal -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo e Título -->
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
              <p class="text-sm text-gray-500 font-medium">Sistema de Gerenciamento Empresarial</p>
            </div>
          </div>

          <!-- User Info e Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
              </svg>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <!-- User Menu -->
            <div class="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xs font-bold">{{ adminUser?.nome?.charAt(0) || 'A' }}</span>
              </div>
              <div class="text-sm">
                <p class="font-semibold text-gray-900">{{ adminUser?.nome || 'Admin' }}</p>
                <p class="text-gray-500 text-xs">{{ adminUser?.email || 'admin@sistema.com' }}</p>
              </div>
            </div>

            <!-- Logout Button -->
            <button @click="logout" class="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 group">
              <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span class="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Users -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Total de Usuários</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers || 0 }}</p>
              <p class="text-xs text-green-600 font-medium mt-1">+12% este mês</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Equipments -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Equipamentos</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalEquipamentos || 0 }}</p>
              <p class="text-xs text-blue-600 font-medium mt-1">+8% este mês</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Maintenances -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Manutenções Ativas</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.manutencoesAtivas || 0 }}</p>
              <p class="text-xs text-orange-600 font-medium mt-1">5 críticas</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- System Health -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Status do Sistema</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.systemHealth || 99.9 }}%</p>
              <p class="text-xs text-green-600 font-medium mt-1">Operacional</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Quick Actions Card -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Ações Rápidas</h2>
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <button @click="navigateTo('/users')" class="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div class="flex flex-col items-center space-y-2">
                <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-semibold text-gray-800">Usuários</span>
              </div>
            </button>

            <button @click="navigateTo('/equipamentos')" class="group p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div class="flex flex-col items-center space-y-2">
                <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span class="text-sm font-semibold text-gray-800">Equipamentos</span>
              </div>
            </button>

            <button @click="navigateTo('/manutencao')" class="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div class="flex flex-col items-center space-y-2">
                <div class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-semibold text-gray-800">Manutenção</span>
              </div>
            </button>

            <button @click="navigateTo('/relatorios')" class="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div class="flex flex-col items-center space-y-2">
                <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <span class="text-sm font-semibold text-gray-800">Relatórios</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Atividades Recentes</h2>
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4 p-4 bg-blue-50/50 rounded-2xl">
              <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-800">Novo usuário cadastrado</p>
                <p class="text-xs text-gray-600">João Silva - há 5 minutos</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-green-50/50 rounded-2xl">
              <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-800">Manutenção concluída</p>
                <p class="text-xs text-gray-600">Equipamento #EQ001 - há 10 minutos</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-2xl">
              <div class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-800">Alerta de manutenção</p>
                <p class="text-xs text-gray-600">Equipamento #EQ015 - há 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Info Footer -->
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Zenthur System v3.0</p>
              <p class="text-xs text-gray-600">Sistema de Gestão Empresarial</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Todos os serviços operacionais</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'admin'
});

const router = useRouter();
const adminUser = ref(null);
const stats = ref({
  totalUsers: 0,
  totalEquipamentos: 0,
  manutencoesAtivas: 0,
  systemHealth: 99.9
});

onMounted(async () => {
  try {
    const adminToken = localStorage.getItem('admin_token');
    const adminUserData = localStorage.getItem('admin_user');
    
    if (!adminToken || !adminUserData) {
      console.warn('⚠️ Token ou dados de admin não encontrados');
      await router.push('/admin-login');
      return;
    }
    
    const userData = JSON.parse(adminUserData);
    if (userData.role !== 'admin') {
      console.error('❌ Usuário não é admin:', userData.role);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      await router.push('/admin-login');
      return;
    }
    
    adminUser.value = userData;
    console.log('✅ Admin autenticado:', adminUser.value.email);
    
    await loadStats();
    
  } catch (error) {
    console.error('❌ Erro ao verificar autenticação admin:', error);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    await router.push('/admin-login');
  }
});

const loadStats = async () => {
  try {
    const adminToken = localStorage.getItem('admin_token');
    
    if (!adminToken) {
      console.warn('⚠️ Token admin não encontrado');
      return;
    }
    
    console.log('📊 Carregando estatísticas do dashboard...');
    
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;
    
    const headers = {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    };
    
    const [usersRes, equipamentosRes, manutencoesRes] = await Promise.all([
      fetch(`${baseURL}/api/users`, {
        method: 'GET',
        headers
      }).catch(err => ({ ok: false, error: err })),
      
      fetch(`${baseURL}/api/equipamentos`, {
        method: 'GET',
        headers
      }).catch(err => ({ ok: false, error: err })),
      
      fetch(`${baseURL}/api/manutencoes`, {
        method: 'GET',
        headers
      }).catch(err => ({ ok: false, error: err }))
    ]);
    
    if (usersRes.ok) {
      const usersData = await usersRes.json();
      stats.value.totalUsers = Array.isArray(usersData) ? usersData.length : (usersData.data ? usersData.data.length : 0);
    } else {
      console.warn('⚠️ Erro ao carregar usuários:', usersRes.error);
    }
    
    if (equipamentosRes.ok) {
      const equipamentosData = await equipamentosRes.json();
      stats.value.totalEquipamentos = Array.isArray(equipamentosData) ? equipamentosData.length : (equipamentosData.data ? equipamentosData.data.length : 0);
    } else {
      console.warn('⚠️ Erro ao carregar equipamentos:', equipamentosRes.error);
    }
    
    if (manutencoesRes.ok) {
      const manutencoesData = await manutencoesRes.json();
      const manutencoes = Array.isArray(manutencoesData) ? manutencoesData : (manutencoesData.data ? manutencoesData.data : []);
      stats.value.manutencoesAtivas = manutencoes.filter(m => m.status !== 'concluida' && !m.arquivada).length;
    } else {
      console.warn('⚠️ Erro ao carregar manutenções:', manutencoesRes.error);
    }
    
    console.log('✅ Estatísticas carregadas:', stats.value);
    
  } catch (error) {
    console.error('❌ Erro ao carregar estatísticas:', error);
  }
};

const navigateTo = (path) => {
  console.log('🔗 Navegando para:', path);
  router.push(path);
};

const logout = async () => {
  if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
    console.log('👋 Fazendo logout do admin...');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    await router.push('/admin-login');
  }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.backdrop-blur-sm {
  backdrop-filter: blur(12px);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .transform:hover {
    transform: none;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
</style>
