<template>
  <div class="min-h-screen bg-white">
    <div class="bg-white border-b border-gray-200 mb-6">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              🔧 Manutenções Preventivas
            </h1>
            <p class="text-gray-900">
              Cronograma e monitoramento das manutenções preventivas
            </p>
          </div>
          
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">{{ estatisticas.total }}</div>
              <div class="text-xs text-gray-800">Total</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ estatisticas.normal }}</div>
              <div class="text-xs text-green-700">Normal</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-500">{{ estatisticas.urgente }}</div>
              <div class="text-xs text-orange-600">Urgente</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-500">{{ estatisticas.vencida }}</div>
              <div class="text-xs text-red-600">Vencida</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-gray-900">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-900">Carregando manutenções preventivas...</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4">
      <div v-if="preventivasPorStatus.vencida.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-red-600 mb-4">
          🚨 Manutenções Vencidas ({{ preventivasPorStatus.vencida.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.vencida" 
            :key="preventiva.id"
            class="bg-white border border-red-200 rounded-lg p-6 hover:bg-red-50 transition-all shadow-md"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-900 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-800 text-xs mt-1">{{ preventiva.descricao }}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                  {{ preventiva.criticidade?.toUpperCase() }}
                </span>
              </div>
            </div>
            
            <TimerProgress 
              :days-left="preventiva.daysLeft"
              :total-days="preventiva.totalDays"
              :is-urgent="preventiva.isUrgent"
              :is-overdue="preventiva.isOverdue"
              :is-completed="preventiva.isCompleted"
            />
          </div>
        </div>
      </div>

      <div v-if="preventivasPorStatus.urgente.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-orange-600 mb-4">
          ⚡ Manutenções Urgentes ({{ preventivasPorStatus.urgente.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.urgente" 
            :key="preventiva.id"
            class="bg-white border border-orange-200 rounded-lg p-6 hover:bg-orange-50 transition-all shadow-md"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-900 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-800 text-xs mt-1">{{ preventiva.descricao }}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                  {{ preventiva.criticidade?.toUpperCase() }}
                </span>
              </div>
            </div>
            
            <TimerProgress 
              :days-left="preventiva.daysLeft"
              :total-days="preventiva.totalDays"
              :is-urgent="preventiva.isUrgent"
              :is-overdue="preventiva.isOverdue"
              :is-completed="preventiva.isCompleted"
            />
          </div>
        </div>
      </div>

      <div v-if="preventivasPorStatus.normal.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-blue-600 mb-4">
          📅 Manutenções Programadas ({{ preventivasPorStatus.normal.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.normal" 
            :key="preventiva.id"
            class="bg-white border border-blue-200 rounded-lg p-6 hover:bg-blue-50 transition-all shadow-md"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-900 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-800 text-xs mt-1">{{ preventiva.descricao }}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                  {{ preventiva.criticidade?.toUpperCase() }}
                </span>
              </div>
            </div>
            
            <TimerProgress 
              :days-left="preventiva.daysLeft"
              :total-days="preventiva.totalDays"
              :is-urgent="preventiva.isUrgent"
              :is-overdue="preventiva.isOverdue"
              :is-completed="preventiva.isCompleted"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TimerProgress from '@/components/TimerProgress.vue';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const authStore = useAuthStore();

const preventivasLista = ref([]);
const equipamentos = ref([]);
const isLoading = ref(false);
const error = ref('');
const showEditModal = ref(false);
const editingMaintenance = ref(null);
const updateInterval = ref(null);
const filtroStatus = ref('todas');

const calcularDadosTimer = (preventiva) => {
  const agora = new Date();
  
  let dataProxima;
  
  if (preventiva.dataProximaManutencao) {
    dataProxima = new Date(preventiva.dataProximaManutencao);
  } else if (preventiva.data) {
    dataProxima = new Date(preventiva.data);
  } else {
    dataProxima = new Date(agora.getTime() + (90 * 24 * 60 * 60 * 1000));
  }
  
  const diffTime = dataProxima.getTime() - agora.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const totalDays = preventiva.frequenciaDias || 90;
  
  const isCompleted = preventiva.status === 'concluida';
  const isOverdue = diffDays < 0 && !isCompleted;
  const isUrgent = diffDays <= 7 && diffDays >= 0 && !isCompleted;
  
  console.log(`📊 Timer para ${preventiva.titulo}:`, {
    dataOriginal: preventiva.data,
    dataHora: preventiva.dataHora,
    dataProxima: dataProxima.toISOString(),
    diffDays,
    totalDays,
    isCompleted,
    isOverdue,
    isUrgent
  });
  
  return {
    daysLeft: diffDays,
    totalDays,
    isCompleted,
    isOverdue,
    isUrgent,
    dataProximaCalculada: dataProxima,
    statusTimer: isCompleted ? 'concluida' : isOverdue ? 'vencida' : isUrgent ? 'urgente' : 'normal'
  };
};

const fetchPreventivas = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    console.log('🔍 Carregando manutenções preventivas...');
    
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiBase}/api/manutencoes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('📡 Resposta da API:', data);
    
    let allManutencoes = [];
    
    if (data && typeof data === 'object' && Array.isArray(data.manutencoes)) {
      allManutencoes = data.manutencoes;
    } else if (Array.isArray(data)) {
      allManutencoes = data;
    } else {
      console.warn('⚠️ Estrutura de resposta não reconhecida:', data);
      allManutencoes = [];
    }
    
    const preventivas = allManutencoes.filter(m => m && m.tipo === 'preventiva');
    
    preventivasLista.value = preventivas.map(preventiva => {
      return {
        ...preventiva,
        ...calcularDadosTimer(preventiva)
      };
    });
    
    console.log(`✅ ${preventivasLista.value.length} manutenções preventivas carregadas`);
    
  } catch (e) {
    console.error('❌ Erro ao carregar preventivas:', e);
    error.value = `Falha ao carregar manutenções preventivas: ${e.message || 'Erro desconhecido'}`;
    preventivasLista.value = [];
  } finally {
    isLoading.value = false;
  }
};

const preventivasPorStatus = computed(() => {
  if (!preventivasLista.value) return { normal: [], urgente: [], vencida: [], concluida: [] };
  
  return {
    normal: preventivasLista.value.filter(p => p.statusTimer === 'normal'),
    urgente: preventivasLista.value.filter(p => p.statusTimer === 'urgente'),
    vencida: preventivasLista.value.filter(p => p.statusTimer === 'vencida'),
    concluida: preventivasLista.value.filter(p => p.statusTimer === 'concluida')
  };
});

const estatisticas = computed(() => {
  const stats = preventivasPorStatus.value;
  return {
    total: preventivasLista.value?.length || 0,
    normal: stats.normal.length,
    urgente: stats.urgente.length,
    vencida: stats.vencida.length,
    concluida: stats.concluida.length
  };
});

onMounted(async () => {
  if (!authStore.token) {
    await navigateTo('/login');
    return;
  }
  
  await fetchPreventivas();
  
  updateInterval.value = setInterval(() => {
    preventivasLista.value = [...preventivasLista.value];
  }, 60000);
});

onUnmounted(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
  }
});
</script>
