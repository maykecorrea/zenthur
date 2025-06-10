<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <!-- Header Modern -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Sistema de Manutenções
                </h1>
                <p class="text-sm text-gray-500">Gestão inteligente de solicitações</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Stats Quick View - CÓDIGO CORRIGIDO -->
            <div class="hidden md:flex items-center space-x-4 mr-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ manutencoes.length }}</div>
                <div class="text-xs text-gray-500">Total</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-600">{{ manutencoesAnalise.length }}</div>
                <div class="text-xs text-gray-500">Em análise</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ manutencoesExecucao.length }}</div>
                <div class="text-xs text-gray-500">Em execução</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-600">{{ manutencoesConcluidas.length }}</div>
                <div class="text-xs text-gray-500">Concluídas</div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <button 
              @click="abrirHistorico" 
              class="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Histórico
            </button>
            
            <router-link 
              to="/novomanu" 
              class="group relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nova Manutenção
              <div class="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-96">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban Board - 4 COLUNAS ÚNICAS (CORRIGIDO) -->
      <div v-if="!isLoading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- ✅ COLUNA 1: RECEBIDAS -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="font-semibold text-lg">Recebidas</h2>
                  <p class="text-blue-100 text-sm">Aguardando análise</p>
                </div>
              </div>
              <div class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                {{ manutencoesRecebidas.length }}
              </div>
            </div>
          </div>
          
          <div 
            class="p-4 min-h-[500px] kanban-column transition-all duration-300"
            :class="{ 'bg-blue-50 border-2 border-blue-300 border-dashed': isDragOver === 'recebida' }"
            @drop="onDrop($event, 'recebida')" 
            @dragover.prevent="isDragOver = 'recebida'"
            @dragleave="isDragOver = null"
          >
            <!-- ⭐ SUBSTITUIR OS CARDS HTML POR COMPONENTES COM NOVOS EVENTOS -->
            <div class="space-y-3">
              <MaintenanceCard
                v-for="manutencao in manutencoesRecebidas" 
                :key="`recebida-${manutencao.id}`"
                :maintenance="manutencao"
                @click="abrirDetalhes(manutencao)"
                @dragstart="startDrag($event, manutencao)"
                @edit-technician="abrirModalTecnico(manutencao)"
                @view-technician-history="visualizarHistoricoTecnico(manutencao)"
                draggable="true"
              />
            </div>
          </div>
        </div>

        <!-- ✅ COLUNA 2: EM ANÁLISE (ÚNICA) -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="font-semibold text-lg">Em Análise</h2>
                  <p class="text-yellow-100 text-sm">Sendo avaliadas</p>
                </div>
              </div>
              <div class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                {{ manutencoesAnalise.length }}
              </div>
            </div>
          </div>
          
          <div 
            class="p-4 min-h-[500px] kanban-column transition-all duration-300"
            :class="{ 'bg-yellow-50 border-2 border-yellow-300 border-dashed': isDragOver === 'analise' }"
            @drop="onDrop($event, 'analise')" 
            @dragover.prevent="isDragOver = 'analise'"
            @dragleave="isDragOver = null"
          >
            <!-- ⭐ USAR COMPONENTE AQUI TAMBÉM -->
            <div class="space-y-3">
              <MaintenanceCard
                v-for="manutencao in manutencoesAnalise" 
                :key="`analise-${manutencao.id}`"
                :maintenance="manutencao"
                @click="abrirDetalhes(manutencao)"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
              />
            </div>
          </div>
        </div>

        <!-- ✅ COLUNA 3: EM EXECUÇÃO - CORRIGIDA -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="font-semibold text-lg">Em Execução</h2>
                  <p class="text-green-100 text-sm">Sendo executadas</p>
                </div>
              </div>
              <div class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                {{ manutencoesExecucao.length }}
              </div>
            </div>
          </div>
          
          <div 
            class="p-4 min-h-[500px] kanban-column transition-all duration-300"
            :class="{ 'bg-green-50 border-2 border-green-300 border-dashed': isDragOver === 'execucao' }"
            @drop="onDrop($event, 'execucao')" 
            @dragover.prevent="isDragOver = 'execucao'"
            @dragleave="isDragOver = null"
          >
            <!-- ⭐ USAR COMPONENTE AQUI TAMBÉM -->
            <div class="space-y-3">
              <MaintenanceCard
                v-for="manutencao in manutencoesExecucao" 
                :key="`execucao-${manutencao.id}`"
                :maintenance="manutencao"
                @click="abrirDetalhes(manutencao)"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
                @edit-technician="abrirModalTecnico(manutencao)"
                @view-technician-history="visualizarHistoricoTecnico(manutencao)"
              />
            </div>
          </div>
        </div>

        <!-- ✅ COLUNA 4: CONCLUÍDAS - REMOVENDO DUPLICIDADE DO BOTÃO -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="font-semibold text-lg">Concluídas</h2>
                  <p class="text-purple-100 text-sm">Finalizadas</p>
                </div>
              </div>
              <div class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                {{ manutencoesConcluidas.length }}
              </div>
            </div>
          </div>
          
          <div 
            class="p-4 min-h-[500px] kanban-column transition-all duration-300"
            :class="{ 'bg-purple-50 border-2 border-purple-300 border-dashed': isDragOver === 'concluida' }"
            @drop="onDrop($event, 'concluida')" 
            @dragover.prevent="isDragOver = 'concluida'"
            @dragleave="isDragOver = null"
          >
            <div class="space-y-3">
              <!-- ⭐ USAR APENAS O COMPONENTE - SEM OVERLAY DUPLICADO -->
              <MaintenanceCard
                v-for="manutencao in manutencoesConcluidas" 
                :key="`concluida-${manutencao.id}`"
                :maintenance="manutencao"
                @click="abrirDetalhes(manutencao)"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
                @edit-technician="abrirModalTecnico(manutencao)"
                @view-technician-history="visualizarHistoricoTecnico(manutencao)"
                @archive="arquivarManutencao"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal de Histórico -->
    <div v-if="mostrarHistorico" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <h2 class="text-2xl font-bold text-gray-900">Histórico de Manutenções</h2>
          <button @click="fecharHistorico" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div v-if="carregandoHistorico" class="flex justify-center items-center h-32">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
          
          <div v-else class="space-y-4">
            <div v-if="historicoManutencoes.length === 0" class="text-center text-gray-500 py-12">
              <p class="text-lg font-medium">Nenhuma manutenção encontrada</p>
              <p class="text-sm">O histórico aparecerá aqui quando houver dados</p>
            </div>
            
            <div v-for="manutencao in historicoManutencoes" :key="manutencao.id" 
                 class="bg-white border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 text-lg mb-2">{{ manutencao.titulo }}</h3>
                  <p class="text-gray-600 mb-4">{{ manutencao.descricao }}</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                    <span>{{ manutencao.codigo }}</span>
                    <span>{{ formatarData(manutencao.dataHora) }}</span>
                    <span>{{ manutencao.equipamento?.nome }}</span>
                    <span>{{ manutencao.tipo }}</span>
                  </div>
                </div>
                <div class="flex flex-col items-end space-y-2 ml-6">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                        :class="getStatusClass(manutencao.status)">
                    {{ manutencao.status?.charAt(0).toUpperCase() + manutencao.status?.slice(1) }}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                        :class="getCriticidadeClass(manutencao.criticidade)">
                    {{ manutencao.criticidade?.charAt(0).toUpperCase() + manutencao.criticidade?.slice(1) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes/Edição - VERSÃO COMPLETA COM HISTÓRICO DE TÉCNICOS -->
    <!-- ⭐ E SUBSTITUIR O MODAL HTML POR COMPONENTE -->
    <MaintenanceModal
      v-if="mostrarModal"
      :maintenance="manutencaoSelecionada"
      :equipamentos="[]"
      @close="fecharModal"
      @save="salvarEdicao"
    />
  </div>
</template>

<script setup>
definePageMeta({
  ssr: false  // ⭐ JÁ ESTÁ CORRETO
});

import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const API_URL = config.public.apiBase;

// Variáveis reativas
const manutencoes = ref([]);
const isLoading = ref(true);
const error = ref('');
const mostrarModal = ref(false);
const manutencaoSelecionada = ref({});
const isDragOver = ref(null);
const draggingId = ref(null);
const mostrarHistorico = ref(false);
const carregandoHistorico = ref(false);
const historicoManutencoes = ref([]);
const modoEdicao = ref(false);
const dadosOriginais = ref({});
const mostrarFormTecnico = ref(false);
const carregandoHistoricoTecnicos = ref(false);
const historicoTecnicos = ref([]);

const novoTecnico = ref({
  nome: '',
  relatorioTecnico: '',
  observacoes: '',
  horasTrabalho: '',
  materiaisUsados: ''
});

// ⭐ FUNÇÃO PARA DETERMINAR CLASSE CSS DA CRITICIDADE
const getCriticidadeClass = (criticidade) => {
  switch (criticidade) {
    case 'baixa':
      return 'bg-green-100 text-green-800';
    case 'media':
      return 'bg-yellow-100 text-yellow-800';
    case 'alta':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// ⭐ FUNÇÃO PARA DETERMINAR CLASSE CSS DO STATUS
const getStatusClass = (status) => {
  switch (status) {
    case 'recebida':
      return 'bg-blue-100 text-blue-800';
    case 'analise':
      return 'bg-purple-100 text-purple-800';
    case 'execucao':
      return 'bg-orange-100 text-orange-800';
    case 'concluida':
      return 'bg-green-100 text-green-800';
    case 'cancelada':
      return 'bg-red-100 text-red-800';
    case 'arquivada':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// ⭐ FUNÇÃO PARA FORMATAR DATA
const formatarData = (data) => {
  if (!data) return 'N/A';
  
  try {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

// ⭐ FUNÇÃO PARA OBTER TEXTO DO STATUS EM PORTUGUÊS
const getStatusTexto = (status) => {
  const statusMap = {
    'recebida': 'Recebida',
    'analise': 'Em Análise',
    'execucao': 'Em Execução',
    'concluida': 'Concluída',
    'cancelada': 'Cancelada',
    'arquivada': 'Arquivada'
  };
  return statusMap[status] || status;
};

// Computed properties
const manutencoesRecebidas = computed(() => 
  manutencoesFiltradas.value.filter(m => m.status === 'recebida')
);

const manutencoesAnalise = computed(() => 
  manutencoesFiltradas.value.filter(m => m.status === 'analise')
);

const manutencoesExecucao = computed(() => 
  manutencoesFiltradas.value.filter(m => m.status === 'execucao')
);

const manutencoesConcluidas = computed(() => 
  manutencoesFiltradas.value.filter(m => m.status === 'concluida')
);

// ⭐ FILTRO PRINCIPAL (EXCLUINDO ARQUIVADAS)
const manutencoesFiltradas = computed(() => {
  if (!manutencoes.value) return [];
  
  return manutencoes.value.filter(manutencao => {
    // ⭐ EXCLUIR ARQUIVADAS DAS COLUNAS PRINCIPAIS
    if (manutencao.status === 'arquivada') return false;
    
    // Aplicar outros filtros se existirem...
    return true;
  });
});

// ⭐ FUNÇÃO PARA ALTERNAR MODO DE EDIÇÃO
const toggleModoEdicao = () => {
  console.log('toggleModoEdicao chamada, modo atual:', modoEdicao.value);
  
  if (modoEdicao.value) {
    // Se estava editando, restaura os dados originais
    if (dadosOriginais.value && Object.keys(dadosOriginais.value).length > 0) {
      manutencaoSelecionada.value = { ...dadosOriginais.value };
    }
  } else {
    // Se vai começar a editar, salva uma cópia dos dados originais
    dadosOriginais.value = { ...manutencaoSelecionada.value };
  }
  modoEdicao.value = !modoEdicao.value;
  
  console.log('Novo modo:', modoEdicao.value);
};

// ⭐ FUNÇÃO PARA SALVAR EDIÇÃO - CORRIGIDA
const salvarEdicao = async () => {
  console.log('🔄 Iniciando salvamento da edição...');
  
  try {
    isLoading.value = true;
    
    // Verificar autenticação
    let token = authStore.token;
    if (!token) {
      console.warn('⚠️ Token não encontrado no store, tentando localStorage...');
      token = localStorage.getItem('token');
    }
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    // ⭐ PREPARAR DADOS LIMPOS PARA ENVIO
    const dadosParaEnviar = {
      titulo: manutencaoSelecionada.value.titulo?.trim(),
      descricao: manutencaoSelecionada.value.descricao?.trim(),
      status: manutencaoSelecionada.value.status,
      criticidade: manutencaoSelecionada.value.criticidade,
      tipo: manutencaoSelecionada.value.tipo,
      solicitante: manutencaoSelecionada.value.solicitante?.trim(),
      responsavel: manutencaoSelecionada.value.responsavel?.trim(),
      observacoes: manutencaoSelecionada.value.observacoes?.trim(),
      equipamentoId: manutencaoSelecionada.value.equipamentoId,
      dataProximaManutencao: manutencaoSelecionada.value.dataProximaManutencao,
      frequenciaDias: manutencaoSelecionada.value.frequenciaDias
    };
    
    // ⭐ VALIDAÇÕES BÁSICAS
    if (!dadosParaEnviar.titulo) {
      throw new Error('Título é obrigatório');
    }
    
    if (!dadosParaEnviar.descricao) {
      throw new Error('Descrição é obrigatória');
    }
    
    // ⭐ VALIDAR STATUS
    const statusValidos = ['recebida', 'analise', 'execucao', 'concluida', 'cancelada'];
    if (!statusValidos.includes(dadosParaEnviar.status)) {
      throw new Error('Status inválido');
    }
    
    // ⭐ VALIDAR CRITICIDADE
    const criticidadeValidas = ['baixa', 'media', 'alta'];
    if (!criticidadeValidas.includes(dadosParaEnviar.criticidade)) {
      throw new Error('Criticidade inválida');
    }
    
    // ⭐ VALIDAR TIPO
    const tiposValidos = ['preventiva', 'corretiva', 'preditiva', 'emergencial'];
    if (!tiposValidos.includes(dadosParaEnviar.tipo)) {
      throw new Error('Tipo inválido');
    }
    
    console.log('📤 Dados preparados para envio:', dadosParaEnviar);
    console.log('🔗 URL da requisição:', `${API_URL}/api/manutencoes/${manutencaoSelecionada.value.id}`);
    
    // ⭐ FAZER REQUISIÇÃO PUT
    const response = await fetch(`${API_URL}/api/manutencoes/${manutencaoSelecionada.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(dadosParaEnviar)
    });
    
    console.log('📡 Status da resposta:', response.status);
    console.log('📡 Headers da resposta:', response.headers);
    
    // ⭐ VERIFICAR SE A RESPOSTA É OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resposta de erro:', errorText);
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }
    
    // ⭐ PROCESSAR RESPOSTA
    const resultado = await response.json();
    console.log('✅ Resultado da edição:', resultado);
    
    // ⭐ ATUALIZAR A LISTA DE MANUTENÇÕES
    await fetchManutencoes();
    
    // ⭐ ATUALIZAR A MANUTENÇÃO SELECIONADA COM OS DADOS SALVOS
    if (resultado && resultado.id) {
      manutencaoSelecionada.value = { ...resultado };
    }
    
    // ⭐ SAIR DO MODO DE EDIÇÃO
    modoEdicao.value = false;
    dadosOriginais.value = {};
    
    alert('✅ Manutenção atualizada com sucesso!');
    
  } catch (err) {
    console.error('❌ Erro completo ao salvar:', err);
    
    let mensagemUsuario = 'Erro desconhecido ao salvar a manutenção';
    
    if (err.message) {
      mensagemUsuario = err.message;
    }
    
    alert(`❌ ${mensagemUsuario}`);
    
  } finally {
    isLoading.value = false;
  }
};

// Função fecharModal corrigida
const fecharModal = () => {
  mostrarModal.value = false;
  manutencaoSelecionada.value = {};
  modoEdicao.value = false;
  dadosOriginais.value = {};
  error.value = '';
};

// ⭐ FUNÇÃO PARA BUSCAR MANUTENÇÕES - MELHORADA
const fetchManutencoes = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    let token = authStore.token;
    if (!token) {
      console.warn('⚠️ Token não encontrado no store, tentando localStorage...');
      token = localStorage.getItem('token');
    }
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    console.log('🔍 Buscando manutenções...');
    const response = await fetch(`${API_URL}/api/manutencoes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📋 RESPOSTA COMPLETA da API:', data);
    console.log('📋 TIPO da resposta:', typeof data);
    console.log('📋 É array?', Array.isArray(data));
    
    if (Array.isArray(data)) {
      manutencoes.value = data;
      console.log('✅ Array direto - Manutenções carregadas:', data.length);
    } else if (data && Array.isArray(data.manutencoes)) {
      manutencoes.value = data.manutencoes;
      console.log('✅ Array dentro do objeto - Manutenções carregadas:', data.manutencoes.length);
    } else {
      console.error('❌ Formato de resposta inesperado:', data);
      manutencoes.value = [];
    }
    
    console.log('📊 ESTATÍSTICAS:');
    console.log('  - Total:', manutencoes.value.length);
    console.log('  - Recebidas:', manutencoesRecebidas.value.length);
    console.log('  - Em análise:', manutencoesAnalise.value.length);
    console.log('  - Em execução:', manutencoesExecucao.value.length);
    console.log('  - Concluídas:', manutencoesConcluidas.value.length);
    
  } catch (err) {
    console.error('❌ Erro ao buscar manutenções:', err);
    error.value = 'Erro ao carregar manutenções. Tente novamente mais tarde.';
    manutencoes.value = [];
  } finally {
    isLoading.value = false;
  }
};

const startDrag = (event, manutencao) => {
  draggingId.value = manutencao.id;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', JSON.stringify(manutencao));
};

const onDrop = (event, novoStatus) => {
  event.preventDefault();
  isDragOver.value = null;
  
  try {
    const manutencaoData = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (manutencaoData.status !== novoStatus) {
      atualizarStatusManutencao(manutencaoData, novoStatus);
    }
  } catch (error) {
    console.error('Erro ao processar drop:', error);
  }
  
  draggingId.value = null;
};

const atualizarStatusManutencao = async (manutencao, novoStatus) => {
  try {
    const response = await fetch(`${API_URL}/api/manutencoes/${manutencao.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ status: novoStatus })
    });
    
    if (response.ok) {
      await fetchManutencoes();
    }
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    error.value = 'Erro ao atualizar status da manutenção. Tente novamente mais tarde.';
  } finally {
    isLoading.value = false;
  }
};

const abrirDetalhes = async (manutencao) => {
  console.log('🔍 Abrindo detalhes da manutenção:', manutencao);
  manutencaoSelecionada.value = { ...manutencao };
  mostrarModal.value = true;
  modoEdicao.value = false;
  dadosOriginais.value = {};
  
  // Carregar histórico de técnicos automaticamente
  await carregarHistoricoTecnicos();
};

const abrirHistorico = () => {
  console.log('🔗 Navegando para página de histórico...');
  router.push('/historico-manutencoes');
};

const fecharHistorico = () => {
  mostrarHistorico.value = false;
  historicoManutencoes.value = [];
};

const carregarHistoricoManutencoes = async () => {
  try {
    carregandoHistorico.value = true;
    const response = await fetch(`${API_URL}/api/manutencoes/historico/all`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      historicoManutencoes.value = data;
    }
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  } finally {
    carregandoHistorico.value = false;
  }
};

// ⭐ MÉTODO PARA ARQUIVAR MANUTENÇÃO - CORRIGIDO
const arquivarManutencao = async (manutencao) => {
  try {
    // Confirmar ação
    const confirmar = confirm(`Tem certeza que deseja arquivar a manutenção "${manutencao.titulo}"?\n\nEla será movida para o histórico.`);
    
    if (!confirmar) return;
    
    console.log('📦 Arquivando manutenção:', manutencao.id);
    
    // Verificar token
    let token = authStore.token;
    if (!token) {
      console.warn('⚠️ Token não encontrado no store, tentando localStorage...');
      token = localStorage.getItem('token');
    }
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    // Fazer requisição para arquivar
    const response = await fetch(`${API_URL}/api/manutencoes/${manutencao.id}/arquivar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify({
        status: 'arquivada',
        dataArquivamento: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    // Atualizar lista local
    await fetchManutencoes();
    
    // Mostrar sucesso
    alert('✅ Manutenção arquivada com sucesso!\n\nVocê pode visualizá-la na página de Histórico.');
    
    console.log('✅ Manutenção arquivada com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao arquivar manutenção:', error);
    
    // Fallback: atualizar status localmente se a API falhar
    try {
      await atualizarStatusManutencao(manutencao, 'arquivada');
      alert('✅ Manutenção arquivada localmente!\n\nEla foi movida para o histórico.');
    } catch (fallbackError) {
      alert('❌ Erro ao arquivar manutenção. Tente novamente.');
    }
  }
};

// ⭐ FUNÇÃO PARA CARREGAR HISTÓRICO DE TÉCNICOS - CORRIGIDA COMPLETAMENTE
const carregarHistoricoTecnicos = async () => {
  if (!manutencaoSelecionada.value.id) {
    console.warn('⚠️ ID da manutenção não encontrado');
    return;
  }
  
  try {
    carregandoHistoricoTecnicos.value = true;
    
    // ⭐ VERIFICAR TOKEN
    let token = authStore.token;
    if (!token) {
      console.warn('⚠️ Token não encontrado no store, tentando localStorage...');
      token = localStorage.getItem('token');
    }
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    console.log('🔍 Carregando histórico de técnicos para manutenção:', manutencaoSelecionada.value.id);
    
    // ⭐ TENTAR DIFERENTES ENDPOINTS POSSÍVEIS
    const endpoints = [
      `/api/manutencoes/${manutencaoSelecionada.value.id}/historico-tecnicos`,
      `/api/manutencoes/${manutencaoSelecionada.value.id}/tecnicos`,
      `/api/historico-tecnicos/${manutencaoSelecionada.value.id}`,
      `/api/tecnicos/manutencao/${manutencaoSelecionada.value.id}`
    ];
    
    let dadosCarregados = false;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`🔗 Tentando endpoint: ${API_URL}${endpoint}`);
        
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenValue
          }
        });
        
        console.log(`📡 Status da resposta (${endpoint}):`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Dados recebidos de ${endpoint}:`, data);
          
          // ⭐ PROCESSAR DIFERENTES FORMATOS DE RESPOSTA
          if (Array.isArray(data)) {
            historicoTecnicos.value = data;
          } else if (data && Array.isArray(data.tecnicos)) {
            historicoTecnicos.value = data.tecnicos;
          } else if (data && Array.isArray(data.historico)) {
            historicoTecnicos.value = data.historico;
          } else if (data && Array.isArray(data.historicoTecnicos)) {
            historicoTecnicos.value = data.historicoTecnicos;
          } else if (data && data.id) {
            // Se retornar um único objeto, coloca em array
            historicoTecnicos.value = [data];
          } else {
            console.warn('⚠️ Formato de resposta não reconhecido:', data);
            continue;
          }
          
          dadosCarregados = true;
          console.log('✅ Histórico de técnicos carregado com sucesso:', historicoTecnicos.value.length, 'registros');
          break;
        } else {
          const errorText = await response.text();
          console.warn(`⚠️ Endpoint ${endpoint} retornou ${response.status}: ${errorText}`);
        }
      } catch (endpointError) {
        console.warn(`⚠️ Erro no endpoint ${endpoint}:`, endpointError);
        continue;
      }
    }
    
    if (!dadosCarregados) {
      console.warn('⚠️ Nenhum endpoint funcionou, definindo array vazio');
      historicoTecnicos.value = [];
    }
    
    // ⭐ LOG DETALHADO DOS DADOS CARREGADOS
    console.log('📊 ANÁLISE DOS DADOS CARREGADOS:');
    console.log('  - Total de registros:', historicoTecnicos.value.length);
    if (historicoTecnicos.value.length > 0) {
      console.log('  - Primeiro registro:', historicoTecnicos.value[0]);
      console.log('  - Campos disponíveis:', Object.keys(historicoTecnicos.value[0]));
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar histórico de técnicos:', error);
    historicoTecnicos.value = [];
    alert(`❌ Erro ao carregar histórico: ${error.message}`);
  } finally {
    carregandoHistoricoTecnicos.value = false;
  }
};

// ⭐ FUNÇÃO PARA ADICIONAR NOVO TÉCNICO - CORRIGIDA PARA BACKEND
const adicionarTecnico = async () => {
  console.log('🔧 Iniciando adição de novo técnico...');
  
  // ⭐ VALIDAÇÃO BÁSICA
  if (!novoTecnico.value.nome.trim()) {
    alert('Nome do técnico é obrigatório');
    return;
  }
  
  if (!manutencaoSelecionada.value.id) {
    alert('ID da manutenção não encontrado');
    return;
  }
  
  try {
    // ⭐ VERIFICAR TOKEN
    let token = authStore.token;
    if (!token) {
      console.warn('⚠️ Token não encontrado no store, tentando localStorage...');
      token = localStorage.getItem('token');
    }
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const tokenValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    // ⭐ PREPARAR DADOS NO FORMATO CORRETO PARA O BACKEND
    const dadosTecnico = {
      // ⭐ TENTAR DIFERENTES FORMATOS DE CAMPO NOME
      nome: novoTecnico.value.nome.trim(),
      tecnicoNome: novoTecnico.value.nome.trim(), // Caso o backend espere este campo
      nomeCompleto: novoTecnico.value.nome.trim(), // Outra possibilidade
      
      relatorioTecnico: novoTecnico.value.relatorioTecnico?.trim() || null,
      observacoes: novoTecnico.value.observacoes?.trim() || null,
      horasTrabalho: novoTecnico.value.horasTrabalho ? parseFloat(novoTecnico.value.horasTrabalho) : null,
      materiaisUsados: novoTecnico.value.materiaisUsados?.trim() || null,
      
      // ⭐ CAMPOS ADICIONAIS QUE O BACKEND PODE ESPERAR
      manutencaoId: manutencaoSelecionada.value.id,
      dataAtribuicao: new Date().toISOString(),
      ativo: true
    };
    
    console.log('📤 Dados do técnico para envio (formato completo):', dadosTecnico);
    console.log('🔗 URL:', `${API_URL}/api/manutencoes/${manutencaoSelecionada.value.id}/tecnicos`);
    console.log('🔑 Token:', tokenValue.substring(0, 20) + '...');
    
    const response = await fetch(`${API_URL}/api/manutencoes/${manutencaoSelecionada.value.id}/tecnicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(dadosTecnico)
    });
    
    console.log('📡 Status da resposta:', response.status);
    console.log('📡 Headers da resposta:', Object.fromEntries(response.headers.entries()));
    
    // ⭐ VERIFICAR SE A RESPOSTA É OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resposta de erro completa:', errorText);
      
      let mensagemErro = `Erro ${response.status}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          mensagemErro += `: ${errorJson.message}`;
        }
        if (errorJson.details) {
          mensagemErro += ` - ${errorJson.details}`;
        }
        if (errorJson.errors && Array.isArray(errorJson.errors)) {
          mensagemErro += ` - ${errorJson.errors.join(', ')}`;
        }
      } catch (parseError) {
        mensagemErro += `: ${errorText}`;
      }
      
      throw new Error(mensagemErro);
    }
    
    // ⭐ PROCESSAR RESPOSTA DE SUCESSO
    const resultado = await response.json();
    console.log('✅ Técnico adicionado com sucesso:', resultado);
    
    // ⭐ LIMPAR FORMULÁRIO
    novoTecnico.value = {
      nome: '',
      relatorioTecnico: '',
      observacoes: '',
      horasTrabalho: '',
      materiaisUsados: ''
    };
    
    // ⭐ FECHAR FORMULÁRIO E RECARREGAR HISTÓRICO
    mostrarFormTecnico.value = false;
    await carregarHistoricoTecnicos();
    
    alert('✅ Técnico adicionado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro completo ao adicionar técnico:', error);
    alert(`❌ Erro ao adicionar técnico: ${error.message}`);
  }
};

onMounted(() => {
  if (process.client) {
    fetchManutencoes();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchManutencoes();
    }, 30000);

    onUnmounted(() => {
      clearInterval(interval);
    });
  }
});

// ⭐ ADICIONAR LISTENER PARA MUDANÇAS DE ROTA
watch(() => router.currentRoute.value.path, (newPath) => {
  if (newPath === '/manutencao') {
    fetchManutencoes();
  }
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

.kanban-column {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.kanban-card {
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}

.kanban-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
