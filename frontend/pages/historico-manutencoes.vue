<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Histórico de Manutenções</h1>
            <p class="text-gray-600 mt-2">Manutenções arquivadas e finalizadas</p>
          </div>
          
          <button 
            @click="$router.push('/manutencao')"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Voltar</span>
          </button>
        </div>
      </div>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l6 6V9l5 5V2H8l5 5H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ manutencoesArquivadas.length }}</p>
              <p class="text-gray-600">Arquivadas</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ manutencoesFinalizadas }}</p>
              <p class="text-gray-600">Finalizadas</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ totalHorasTrabalho }}h</p>
              <p class="text-gray-600">Horas Trabalhadas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="flex-1">
            <input 
              v-model="filtro"
              type="text"
              placeholder="Buscar por título, código ou equipamento..."
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="flex space-x-3">
            <select 
              v-model="filtroTipo"
              class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os Tipos</option>
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
              <option value="preditiva">Preditiva</option>
              <option value="emergencial">Emergencial</option>
            </select>
            <button 
              @click="carregarArquivadas"
              class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>

      <!-- Lista de Manutenções Arquivadas -->
      <div v-else-if="manutencoesFiltradasComputadas.length > 0" class="space-y-6">
        <div 
          v-for="manutencao in manutencoesFiltradasComputadas" 
          :key="manutencao.id"
          class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          @click="visualizarManutencao(manutencao)"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ manutencao.titulo }}</h3>
                  <span class="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ARQUIVADA
                  </span>
                </div>
                <p class="text-gray-600 text-sm font-mono">{{ manutencao.codigo }}</p>
              </div>
              
              <div class="text-right">
                <p class="text-sm text-gray-500">{{ formatarData(manutencao.dataHora) }}</p>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                      :class="getCriticidadeClass(manutencao.criticidade)">
                  {{ manutencao.criticidade?.toUpperCase() || 'N/A' }}
                </span>
              </div>
            </div>

            <!-- Descrição -->
            <p class="text-gray-700 mb-4 line-clamp-2">{{ manutencao.descricao }}</p>

            <!-- Detalhes -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <!-- Equipamento -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ manutencao.equipamento?.nome || 'N/A' }}</p>
                  <p class="text-sm text-gray-500">{{ manutencao.equipamento?.tag || 'Sem TAG' }}</p>
                </div>
              </div>

              <!-- Tipo -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6h-3V8a1 1 0 10-2 0v3H4V5z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ manutencao.tipo || 'N/A' }}</p>
                  <p class="text-sm text-gray-500">Tipo de Manutenção</p>
                </div>
              </div>

              <!-- Responsável -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ manutencao.responsavel || 'Não atribuído' }}</p>
                  <p class="text-sm text-gray-500">Responsável</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-gray-200 pt-4 flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">
                  <span class="font-medium">Solicitante:</span> {{ manutencao.solicitante || 'N/A' }}
                </span>
              </div>
              
              <div class="flex items-center space-x-2 text-blue-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span class="text-sm font-medium">Visualizar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado Vazio -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"></path>
          </svg>
          <h3 class="text-xl font-medium text-gray-900 mb-2">Nenhuma manutenção encontrada</h3>
          <p class="text-gray-600">Manutenções arquivadas aparecerão aqui quando disponíveis.</p>
        </div>
      </div>

    </div>

    <!-- Modal de Visualização (SOMENTE LEITURA) -->
    <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-gray-200/50">
        <!-- Header do Modal -->
        <div class="flex justify-between items-center p-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <div>
            <h2 class="text-2xl font-bold">{{ manutencaoSelecionada.titulo }}</h2>
            <p class="text-gray-200">{{ manutencaoSelecionada.codigo }} • ARQUIVADA</p>
          </div>
          <button 
            @click="fecharModal" 
            class="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Conteúdo do Modal -->
        <div class="p-6 overflow-y-auto max-h-[calc(95vh-200px)]" v-if="manutencaoSelecionada">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Informações Básicas -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <p class="text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                  {{ manutencaoSelecionada.descricao || 'Sem descrição' }}
                </p>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ARQUIVADA
                  </span>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Criticidade</label>
                  <span :class="getCriticidadeClass(manutencaoSelecionada.criticidade)" class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ manutencaoSelecionada.criticidade?.toUpperCase() || 'N/A' }}
                  </span>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                  <p class="text-gray-900 font-medium">
                    {{ manutencaoSelecionada.tipo || 'N/A' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Dados Adicionais -->
            <div class="space-y-6">
              <div v-if="manutencaoSelecionada.equipamento">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Equipamento</label>
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 class="font-semibold text-blue-900">{{ manutencaoSelecionada.equipamento.nome }}</h4>
                  <p class="text-blue-700 text-sm">TAG: {{ manutencaoSelecionada.equipamento.tag || 'N/A' }}</p>
                  <p class="text-blue-600 text-sm">Área: {{ manutencaoSelecionada.equipamento.area || 'N/A' }}</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Responsável</label>
                <p class="px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-900 font-medium">
                  👨‍🔧 {{ manutencaoSelecionada.responsavel || 'Não atribuído' }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Solicitante</label>
                <p class="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {{ manutencaoSelecionada.solicitante || 'Não informado' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Observações -->
          <div class="mt-8">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
            <p class="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 min-h-[80px]">
              {{ manutencaoSelecionada.observacoes || 'Sem observações' }}
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
          <button 
            @click="fecharModal"
            class="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const API_URL = 'http://localhost:4001';

// Estados
const isLoading = ref(true);
const manutencoesArquivadas = ref([]);
const showModal = ref(false);
const manutencaoSelecionada = ref(null);
const filtro = ref('');
const filtroTipo = ref('');

// Computed para filtros
const manutencoesFiltradasComputadas = computed(() => {
  let resultado = manutencoesArquivadas.value;

  if (filtro.value) {
    const busca = filtro.value.toLowerCase();
    resultado = resultado.filter(m => 
      m.titulo?.toLowerCase().includes(busca) ||
      m.codigo?.toLowerCase().includes(busca) ||
      m.equipamento?.nome?.toLowerCase().includes(busca)
    );
  }

  if (filtroTipo.value) {
    resultado = resultado.filter(m => m.tipo === filtroTipo.value);
  }

  return resultado;
});

const manutencoesFinalizadas = computed(() => 
  manutencoesArquivadas.value.filter(m => m.status === 'concluida' || m.status === 'arquivada').length
);

const totalHorasTrabalho = computed(() => {
  return manutencoesArquivadas.value.reduce((total, m) => {
    return total + (parseFloat(m.horasTrabalho) || 0);
  }, 0).toFixed(1);
});

// Carregar manutenções arquivadas
const carregarArquivadas = async () => {
  try {
    isLoading.value = true;
    
    let token = authStore.token;
    if (!token) {
      token = localStorage.getItem('auth_token');
      if (token) authStore.setToken(token);
    }
    
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}/api/manutencoes/historico`, {
      headers: {
        'Authorization': tokenValue,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data = await response.json();
    manutencoesArquivadas.value = data.manutencoes || data || [];
    
    console.log('📚 Manutenções arquivadas carregadas:', manutencoesArquivadas.value.length);
    
  } catch (error) {
    console.error('❌ Erro ao carregar histórico:', error);
    alert('Erro ao carregar histórico de manutenções');
  } finally {
    isLoading.value = false;
  }
};

// Visualizar manutenção
const visualizarManutencao = (manutencao) => {
  manutencaoSelecionada.value = manutencao;
  showModal.value = true;
};

const fecharModal = () => {
  showModal.value = false;
  manutencaoSelecionada.value = null;
};

// Utilitários
const formatarData = (dataString) => {
  if (!dataString) return 'Data não definida';
  
  try {
    const data = new Date(dataString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  } catch (e) {
    return dataString;
  }
};

const getCriticidadeClass = (criticidade) => {
  const classes = {
    'alta': 'bg-red-500 text-white',
    'media': 'bg-yellow-500 text-white',
    'baixa': 'bg-green-500 text-white'
  };
  return classes[criticidade] || 'bg-gray-500 text-white';
};

// Carregar ao montar
onMounted(() => {
  carregarArquivadas();
});

// Meta da página
definePageMeta({
  middleware: 'auth'
});
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>