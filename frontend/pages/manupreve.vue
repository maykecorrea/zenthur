<template>
  <!-- ⭐ FUNDO BRANCO -->
  <div class="min-h-screen bg-white">
    
    <!-- ⭐ HEADER COM FUNDO BRANCO -->
    <div class="bg-white border-b border-gray-200 mb-6">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              🔧 Manutenções Preventivas
            </h1>
            <p class="text-gray-600">
              Cronograma e monitoramento das manutenções preventivas
            </p>
          </div>
          
          <!-- ⭐ ESTATÍSTICAS COM CORES SUAVES -->
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ estatisticas.total }}</div>
              <div class="text-xs text-gray-600">Total</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ estatisticas.normal }}</div>
              <div class="text-xs text-green-500">Normal</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-500">{{ estatisticas.urgente }}</div>
              <div class="text-xs text-orange-400">Urgente</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-500">{{ estatisticas.vencida }}</div>
              <div class="text-xs text-red-400">Vencida</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-gray-700">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Carregando manutenções preventivas...</p>
      </div>
    </div>

    <!-- Lista de Preventivas -->
    <div v-else class="max-w-7xl mx-auto px-4">
      
      <!-- ⭐ CARDS AZUIS CLAROS -->
      <div v-if="preventivasPorStatus.vencida.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-red-600 mb-4">
          🚨 Manutenções Vencidas ({{ preventivasPorStatus.vencida.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.vencida" 
            :key="preventiva.id"
            class="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-all shadow-sm"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-600 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ preventiva.descricao }}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                  {{ preventiva.criticidade?.toUpperCase() }}
                </span>
              </div>
            </div>
            
            <!-- TimerProgress -->
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

      <!-- Urgentes -->
      <div v-if="preventivasPorStatus.urgente.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-orange-600 mb-4">
          ⚡ Manutenções Urgentes ({{ preventivasPorStatus.urgente.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.urgente" 
            :key="preventiva.id"
            class="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-all shadow-sm"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-600 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ preventiva.descricao }}</p>
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

      <!-- Normais -->
      <div v-if="preventivasPorStatus.normal.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-blue-600 mb-4">
          📅 Manutenções Programadas ({{ preventivasPorStatus.normal.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.normal" 
            :key="preventiva.id"
            class="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-all shadow-sm"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-600 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ preventiva.descricao }}</p>
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

      <!-- Concluídas -->
      <div v-if="preventivasPorStatus.concluida.length > 0" class="mb-8">
        <h2 class="text-xl font-bold text-green-600 mb-4">
          ✅ Manutenções Concluídas ({{ preventivasPorStatus.concluida.length }})
        </h2>
        <div class="grid gap-4">
          <div 
            v-for="preventiva in preventivasPorStatus.concluida" 
            :key="preventiva.id"
            class="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-all shadow-sm opacity-75"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ preventiva.titulo }}</h3>
                <p class="text-gray-600 text-sm">{{ preventiva.equipamento?.nome }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ preventiva.descricao }}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                  CONCLUÍDA
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

// ⭐ VARIÁVEIS REATIVAS
const preventivasLista = ref([]);
const equipamentos = ref([]);
const isLoading = ref(false);
const error = ref('');
const showEditModal = ref(false);
const editingMaintenance = ref(null);
const updateInterval = ref(null);
const filtroStatus = ref('todas');

// ⭐ FUNÇÃO PARA CALCULAR DADOS DO TIMER
const calcularDadosTimer = (preventiva) => {
  const agora = new Date();
  
  // Data da próxima manutenção (usar dataProximaManutencao ou calcular baseado na frequência)
  let dataProxima;
  
  if (preventiva.dataProximaManutencao) {
    dataProxima = new Date(preventiva.dataProximaManutencao);
  } else if (preventiva.dataHora) {
    // Se não tem próxima manutenção definida, calcular baseado na última + frequência padrão
    const ultimaManutencao = new Date(preventiva.dataHora);
    const frequenciaDias = preventiva.frequenciaDias || 90; // 90 dias padrão para preventivas
    dataProxima = new Date(ultimaManutencao.getTime() + (frequenciaDias * 24 * 60 * 60 * 1000));
  } else {
    // Fallback: próxima manutenção daqui 90 dias
    dataProxima = new Date(agora.getTime() + (90 * 24 * 60 * 60 * 1000));
  }
  
  // Calcular diferença em dias
  const diffTime = dataProxima.getTime() - agora.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Determinar total de dias do ciclo
  const totalDays = preventiva.frequenciaDias || 90;
  
  // Determinar status
  const isCompleted = preventiva.status === 'concluida';
  const isOverdue = diffDays < 0 && !isCompleted;
  const isUrgent = diffDays <= 7 && diffDays >= 0 && !isCompleted;
  
  console.log(`📊 Timer para ${preventiva.titulo}:`, {
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

// ⭐ FUNÇÃO ALTERNATIVA - fetchPreventivas com fetch nativo
const fetchPreventivas = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    console.log('🔍 Carregando manutenções preventivas...');
    
    // ⭐ USAR FETCH NATIVO COM URL COMPLETA
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
    console.log('📋 TIPO da resposta:', typeof data);
    console.log('📋 É array?', Array.isArray(data));
    
    // ⭐ PROCESSAR RESPOSTA (IGUAL AO manutencao.vue)
    let allManutencoes = [];
    
    if (data && typeof data === 'object' && Array.isArray(data.manutencoes)) {
      allManutencoes = data.manutencoes;
      console.log('✅ Array dentro do objeto - Manutenções carregadas:', allManutencoes.length);
    } else if (Array.isArray(data)) {
      allManutencoes = data;
      console.log('✅ Array direto - Manutenções carregadas:', allManutencoes.length);
    } else {
      console.warn('⚠️ Estrutura de resposta não reconhecida:', data);
      allManutencoes = [];
    }
    
    // ⭐ FILTRAR APENAS PREVENTIVAS
    const preventivas = allManutencoes.filter(m => m && m.tipo === 'preventiva');
    
    // ⭐ PROCESSAR CADA PREVENTIVA COM CÁLCULOS
    preventivasLista.value = preventivas.map(preventiva => {
      return {
        ...preventiva,
        ...calcularDadosTimer(preventiva)
      };
    });
    
    console.log(`✅ ${preventivasLista.value.length} manutenções preventivas carregadas de ${allManutencoes.length} total`);
    
  } catch (e) {
    console.error('❌ Erro ao carregar preventivas:', e);
    error.value = `Falha ao carregar manutenções preventivas: ${e.message || 'Erro desconhecido'}`;
    preventivasLista.value = [];
  } finally {
    isLoading.value = false;
  }
};

// ⭐ COMPUTED PARA CATEGORIZAR PREVENTIVAS
const preventivasPorStatus = computed(() => {
  if (!preventivasLista.value) return { normal: [], urgente: [], vencida: [], concluida: [] };
  
  return {
    normal: preventivasLista.value.filter(p => p.statusTimer === 'normal'),
    urgente: preventivasLista.value.filter(p => p.statusTimer === 'urgente'),
    vencida: preventivasLista.value.filter(p => p.statusTimer === 'vencida'),
    concluida: preventivasLista.value.filter(p => p.statusTimer === 'concluida')
  };
});

// ⭐ COMPUTED PARA ESTATÍSTICAS
const estatisticas = computed(() => {
  const stats = preventivasPorStatus.value;
  return {
    total: preventivasLista.value?.length || 0,
    normal: stats.normal.length,
    urgente: stats.urgente.length,
    vencida: stats.vencida.length,
    concluida: stats.concluida.length,
    percentualUrgente: stats.total > 0 ? Math.round((stats.urgente.length / stats.total) * 100) : 0,
    percentualVencida: stats.total > 0 ? Math.round((stats.vencida.length / stats.total) * 100) : 0
  };
});

// ⭐ COMPUTED PARA FILTROS
const preventivasFiltradas = computed(() => {
  if (!preventivasLista.value || !Array.isArray(preventivasLista.value)) {
    return [];
  }
  
  let filtered = preventivasLista.value.filter(m => m.tipo === 'preventiva');
  
  switch (filtroStatus.value) {
    case 'pendente':
      return filtered.filter(m => ['recebida', 'analise', 'execucao'].includes(m.status));
    case 'vencidas':
      return filtered.filter(m => isVencida(m));
    case 'urgentes':
      return filtered.filter(m => isUrgente(m));
    case 'concluidas':
      return filtered.filter(m => m.status === 'concluida');
    default:
      return filtered;
  }
});

// ⭐ FUNÇÕES DE DATA
const calcularDiasRestantes = (preventiva) => {
  if (!preventiva.dataProximaManutencao) return 0;
  
  const hoje = new Date();
  const proximaData = new Date(preventiva.dataProximaManutencao);
  const diffTime = proximaData - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const isVencida = (preventiva) => {
  return calcularDiasRestantes(preventiva) < 0 && preventiva.status !== 'concluida';
};

const isUrgente = (preventiva) => {
  const diasRestantes = calcularDiasRestantes(preventiva);
  return diasRestantes >= 0 && diasRestantes <= 7 && preventiva.status !== 'concluida';
};

const formatarData = (data) => {
  if (!data) return 'Não definida';
  try {
    return new Date(data).toLocaleDateString('pt-BR');
  } catch {
    return 'Data inválida';
  }
};

// ⭐ FUNÇÕES DE API
const fetchEquipamentos = async () => {
  try {
    const response = await $fetch('/api/equipamentos', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    equipamentos.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Erro ao carregar equipamentos:', error);
  }
};

const recarregarDados = async () => {
  await Promise.all([fetchEquipamentos(), fetchPreventivas()]);
};

// ⭐ FUNÇÕES DE EDIÇÃO
const editarPreventiva = (preventiva) => {
  editingMaintenance.value = { 
    ...preventiva,
    dataProximaManutencao: preventiva.dataProximaManutencao ? 
      new Date(preventiva.dataProximaManutencao).toISOString().split('T')[0] : ''
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingMaintenance.value = null;
};

const saveEditedMaintenance = async () => {
  if (!editingMaintenance.value) return;
  
  try {
    isLoading.value = true;
    
    await $fetch(`/api/manutencoes/${editingMaintenance.value.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        ...editingMaintenance.value,
        tipo: 'preventiva' // Garantir que seja preventiva
      }
    });
    
    await fetchPreventivas();
    closeEditModal();
    
  } catch (error) {
    console.error('Erro ao atualizar manutenção:', error);
    error.value = 'Erro ao salvar alterações';
  } finally {
    isLoading.value = false;
  }
};

const excluirPreventiva = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta manutenção preventiva?')) return;
  
  try {
    await $fetch(`/api/manutencoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    await fetchPreventivas();
  } catch (error) {
    console.error('Erro ao excluir manutenção:', error);
    error.value = 'Falha ao excluir manutenção preventiva';
  }
};

const completarPreventiva = async (id) => {
  try {
    await $fetch(`/api/manutencoes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: { 
        status: 'concluida',
        dataUltimaManutencao: new Date().toISOString()
      }
    });
    
    await fetchPreventivas();
  } catch (error) {
    console.error('Erro ao completar manutenção:', error);
    error.value = 'Erro ao concluir manutenção';
  }
};

// ⭐ LIFECYCLE
onMounted(async () => {
  if (!authStore.token) {
    await navigateTo('/login');
    return;
  }
  
  await recarregarDados();
  
  // Timer de atualização a cada minuto
  updateInterval.value = setInterval(() => {
    // Forçar reatividade para atualizar timers
    preventivasLista.value = [...preventivasLista.value];
  }, 60000);
});

onUnmounted(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
  }
});
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* ⭐ CORREÇÃO DO CSS line-clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2; /* ✅ Propriedade padrão adicionada */
}
</style>