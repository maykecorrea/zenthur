<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    
    <!-- Efeitos de fundo futurísticos -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    <!-- Header Futurístico -->
    <div class="relative bg-black/20 backdrop-blur-xl border-b border-white/10 mb-8">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <div class="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h1 class="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Manutenções Preventivas
              </h1>
            </div>
            <p class="text-gray-300 text-lg ml-14">
              Sistema avançado de monitoramento e controle
            </p>
          </div>
          
          <!-- Dashboard de Estatísticas -->
          <div class="grid grid-cols-4 gap-4">
            <StatCard 
              :value="estatisticas.total" 
              label="Total" 
              icon="📊" 
              color="from-gray-600 to-gray-800"
              textColor="text-gray-100"
            />
            <StatCard 
              :value="estatisticas.normal" 
              label="Normal" 
              icon="✅" 
              color="from-green-600 to-emerald-800"
              textColor="text-green-100"
            />
            <StatCard 
              :value="estatisticas.urgente" 
              label="Urgente" 
              icon="⚡" 
              color="from-orange-600 to-red-600"
              textColor="text-orange-100"
            />
            <StatCard 
              :value="estatisticas.vencida" 
              label="Vencida" 
              icon="🚨" 
              color="from-red-600 to-red-800"
              textColor="text-red-100"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Futurístico -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" style="animation-delay: -0.5s"></div>
        </div>
        <p class="text-white/80 text-lg">Carregando sistema de manutenções...</p>
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-6">
      <div class="bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
        <div class="flex items-center space-x-3 mb-4">
          <div class="p-2 bg-red-500/20 rounded-lg">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-red-400 font-semibold">Erro no Sistema</h3>
        </div>
        <p class="text-red-300 mb-4">{{ error }}</p>
        <button 
          @click="fetchPreventivas" 
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Tentar Novamente
        </button>
      </div>
    </div>

    <!-- Container Principal -->
    <div v-else class="max-w-7xl mx-auto px-6 space-y-8">
      
      <!-- Seção Vencidas -->
      <PreventiveSection
        v-if="preventivasPorStatus.vencida.length > 0"
        title="🚨 Manutenções Vencidas"
        :count="preventivasPorStatus.vencida.length"
        :items="preventivasPorStatus.vencida"
        status-type="vencida"
        theme="red"
        @marcarConcluida="marcarConcluida"
        @reagendar="abrirModalReagendar"
        @verDetalhes="abrirModalDetalhes"
      />

      <!-- Seção Urgentes -->
      <PreventiveSection
        v-if="preventivasPorStatus.urgente.length > 0"
        title="⚡ Manutenções Urgentes"
        :count="preventivasPorStatus.urgente.length"
        :items="preventivasPorStatus.urgente"
        status-type="urgente"
        theme="orange"
        @marcarConcluida="marcarConcluida"
        @reagendar="abrirModalReagendar"
        @verDetalhes="abrirModalDetalhes"
      />

      <!-- Seção Normais -->
      <PreventiveSection
        v-if="preventivasPorStatus.normal.length > 0"
        title="📅 Manutenções Programadas"
        :count="preventivasPorStatus.normal.length"
        :items="preventivasPorStatus.normal"
        status-type="normal"
        theme="blue"
        @marcarConcluida="marcarConcluida"
        @reagendar="abrirModalReagendar"
        @verDetalhes="abrirModalDetalhes"
      />

      <!-- Seção Concluídas -->
      <PreventiveSection
        v-if="preventivasPorStatus.concluida.length > 0"
        title="✅ Manutenções Concluídas"
        :count="preventivasPorStatus.concluida.length"
        :items="preventivasPorStatus.concluida"
        status-type="concluida"
        theme="green"
        @verDetalhes="abrirModalDetalhes"
      />

      <!-- Estado Vazio -->
      <EmptyState v-if="preventivasLista.length === 0" />

    </div>

    <!-- Modais -->
    <ModalDetalhes 
      v-if="modalDetalhes.show"
      :preventiva="modalDetalhes.preventiva"
      @close="fecharModalDetalhes"
    />

    <ModalReagendar
      v-if="modalReagendar.show"
      :preventiva="modalReagendar.preventiva"
      @close="fecharModalReagendar"
      @save="salvarReagendamento"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const authStore = useAuthStore();

// Estados
const preventivasLista = ref([]);
const isLoading = ref(false);
const error = ref('');

// Estados dos modais
const modalDetalhes = ref({
  show: false,
  preventiva: null
});

const modalReagendar = ref({
  show: false,
  preventiva: null
});

// Função para buscar preventivas
const fetchPreventivas = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const token = localStorage.getItem('auth_token') || authStore.token;
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await fetch('http://localhost:4001/api/manutencoes/preventivas', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    let allManutencoes = [];
    if (data && Array.isArray(data.manutencoes)) {
      allManutencoes = data.manutencoes;
    } else if (Array.isArray(data)) {
      allManutencoes = data;
    }
    
    const preventivas = allManutencoes.filter(m => {
      if (!m) return false;
      
      const tipo = (m.tipo || '').toLowerCase();
      const titulo = (m.titulo || '').toLowerCase();
      const descricao = (m.descricao || '').toLowerCase();
      
      return tipo.includes('preventiva') || 
             tipo.includes('preventivo') ||
             titulo.includes('preventiva') || 
             titulo.includes('preventivo') ||
             descricao.includes('preventiva') ||
             descricao.includes('preventivo');
    });
    
    preventivasLista.value = preventivas.map(preventiva => ({
      ...preventiva,
      ...calcularDadosTimer(preventiva)
    }));
    
  } catch (e) {
    console.error('❌ Erro ao carregar preventivas:', e);
    error.value = `Falha ao carregar manutenções preventivas: ${e.message}`;
    preventivasLista.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Função para calcular dados do timer
const calcularDadosTimer = (preventiva) => {
  const agora = new Date();
  
  let dataPrimeira = null;
  let dataProxima = null;
  
  if (preventiva.dataPrimeiraRevisao) {
    dataPrimeira = new Date(preventiva.dataPrimeiraRevisao);
  }
  
  if (preventiva.dataProximaManutencao) {
    dataProxima = new Date(preventiva.dataProximaManutencao);
  } else if (dataPrimeira) {
    dataProxima = new Date(dataPrimeira.getTime() + (90 * 24 * 60 * 60 * 1000));
  } else {
    const dataCriacao = new Date(preventiva.createdAt);
    dataProxima = new Date(dataCriacao.getTime() + (90 * 24 * 60 * 60 * 1000));
  }
  
  const diffTime = dataProxima.getTime() - agora.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let totalDays = 90;
  if (dataPrimeira && dataProxima) {
    const intervalTime = dataProxima.getTime() - dataPrimeira.getTime();
    totalDays = Math.ceil(intervalTime / (1000 * 60 * 60 * 24));
  }
  
  const isCompleted = preventiva.status === 'concluida';
  const isOverdue = diffDays < 0 && !isCompleted;
  const isUrgent = diffDays <= 7 && diffDays >= 0 && !isCompleted;
  
  const statusTimer = isCompleted ? 'concluida' : 
                     isOverdue ? 'vencida' : 
                     isUrgent ? 'urgente' : 'normal';
  
  return {
    daysLeft: diffDays,
    totalDays: Math.max(1, totalDays),
    isCompleted,
    isOverdue,
    isUrgent,
    dataPrimeiraRevisao: dataPrimeira,
    dataProximaCalculada: dataProxima,
    statusTimer,
    timeLeftText: isCompleted ? 'Concluída' :
                  isOverdue ? `${Math.abs(diffDays)} dias atrasado` :
                  diffDays === 0 ? 'Hoje' :
                  diffDays === 1 ? 'Amanhã' :
                  `${diffDays} dias restantes`
  };
};

// Computeds
const preventivasPorStatus = computed(() => {
  if (!preventivasLista.value || !Array.isArray(preventivasLista.value)) {
    return { normal: [], urgente: [], vencida: [], concluida: [] };
  }
  
  return {
    normal: preventivasLista.value.filter(p => p.statusTimer === 'normal'),
    urgente: preventivasLista.value.filter(p => p.statusTimer === 'urgente'),
    vencida: preventivasLista.value.filter(p => p.statusTimer === 'vencida'),
    concluida: preventivasLista.value.filter(p => p.statusTimer === 'concluida')
  };
});

const estatisticas = computed(() => {
  const stats = preventivasPorStatus.value;
  const total = preventivasLista.value?.length || 0;
  
  return {
    total,
    normal: stats.normal.length,
    urgente: stats.urgente.length,
    vencida: stats.vencida.length,
    concluida: stats.concluida.length
  };
});

// Funções dos modais
const abrirModalDetalhes = (preventiva) => {
  modalDetalhes.value = {
    show: true,
    preventiva
  };
};

const fecharModalDetalhes = () => {
  modalDetalhes.value = {
    show: false,
    preventiva: null
  };
};

const abrirModalReagendar = (preventiva) => {
  modalReagendar.value = {
    show: true,
    preventiva
  };
};

const fecharModalReagendar = () => {
  modalReagendar.value = {
    show: false,
    preventiva: null
  };
};

const salvarReagendamento = async (dadosReagendamento) => {
  try {
    const token = localStorage.getItem('auth_token') || authStore.token;
    
    const response = await fetch(`http://localhost:3001/api/manutencoes/${dadosReagendamento.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataProximaManutencao: dadosReagendamento.novaData,
        observacoes: dadosReagendamento.observacoes
      })
    });
    
    if (response.ok) {
      fecharModalReagendar();
      await fetchPreventivas();
    }
  } catch (error) {
    console.error('Erro ao reagendar:', error);
  }
};

const marcarConcluida = async (id) => {
  try {
    const token = localStorage.getItem('auth_token') || authStore.token;
    
    const response = await fetch(`http://localhost:3001/api/manutencoes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'concluida' })
    });
    
    if (response.ok) {
      await fetchPreventivas();
    }
  } catch (error) {
    console.error('Erro ao marcar como concluída:', error);
  }
};

// Lifecycle
onMounted(async () => {
  const token = localStorage.getItem('auth_token') || authStore.token;
  
  if (!token) {
    await navigateTo('/');
    return;
  }
  
  await fetchPreventivas();
});
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>