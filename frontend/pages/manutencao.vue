<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <!-- ⭐ HEADER RESPONSIVO CORRIGIDO -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 gap-4">
          <div class="flex items-center space-x-4 min-w-0">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Sistema de Manutenções
              </h1>
              <p class="text-sm text-gray-500 truncate">Gestão inteligente de solicitações</p>
            </div>
          </div>
          
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <!-- ⭐ STATS RESPONSIVOS -->
            <div class="grid grid-cols-2 lg:flex lg:items-center lg:space-x-4">
              <div class="text-center">
                <div class="text-lg lg:text-2xl font-bold text-blue-600">{{ manutencoes.length }}</div>
                <div class="text-xs text-gray-500">Total</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-2xl font-bold text-yellow-600">{{ manutencoesAnalise.length }}</div>
                <div class="text-xs text-gray-500">Em análise</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-2xl font-bold text-green-600">{{ manutencoesExecucao.length }}</div>
                <div class="text-xs text-gray-500">Em execução</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-2xl font-bold text-purple-600">{{ manutencoesConcluidas.length }}</div>
                <div class="text-xs text-gray-500">Concluídas</div>
              </div>
            </div>
            
            <!-- ⭐ BOTÕES DE AÇÃO RESPONSIVOS -->
            <div class="flex flex-wrap gap-2">
              <router-link 
                to="/historico-manutencoes"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Histórico
              </router-link>
              
              <router-link 
                to="/novomanu"
                class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nova Manutenção
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ⭐ MAIN CONTENT RESPONSIVO -->
    <div class="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-gray-700 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-lg">Carregando manutenções...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="mb-8">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-red-800">Erro ao carregar</h3>
              <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            </div>
          </div>
          <button 
            @click="fetchManutencoes"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>

      <!-- ⭐ KANBAN BOARD TOTALMENTE RESPONSIVO -->
      <div v-else class="space-y-6">
        <!-- ⭐ LAYOUT DESKTOP: 4 COLUNAS -->
        <div class="hidden xl:grid xl:grid-cols-4 gap-6">
          <!-- COLUNA: RECEBIDAS -->
          <div 
            class="kanban-column bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-fit"
            @drop="onDrop($event, 'recebida')"
            @dragover.prevent
            @dragenter.prevent
          >
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
            
            <div class="p-4 min-h-[500px] space-y-3">
              <div
                v-for="manutencao in manutencoesRecebidas"
                :key="manutencao.id"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
                class="cursor-move"
              >
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              
              <div v-if="manutencoesRecebidas.length === 0" class="text-center py-8">
                <p class="text-gray-500 text-sm">Nenhuma manutenção recebida</p>
              </div>
            </div>
          </div>

          <!-- COLUNA: EM ANÁLISE -->
          <div 
            class="kanban-column bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-fit"
            @drop="onDrop($event, 'analise')"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
              <div class="flex items-center justify-between text-white">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
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
            
            <div class="p-4 min-h-[500px] space-y-3">
              <div
                v-for="manutencao in manutencoesAnalise"
                :key="manutencao.id"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
                class="cursor-move"
              >
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              
              <div v-if="manutencoesAnalise.length === 0" class="text-center py-8">
                <p class="text-gray-500 text-sm">Nenhuma manutenção em análise</p>
              </div>
            </div>
          </div>

          <!-- COLUNA: EM EXECUÇÃO -->
          <div 
            class="kanban-column bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-fit"
            @drop="onDrop($event, 'execucao')"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <div class="flex items-center justify-between text-white">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
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
            
            <div class="p-4 min-h-[500px] space-y-3">
              <div
                v-for="manutencao in manutencoesExecucao"
                :key="manutencao.id"
                draggable="true"
                @dragstart="startDrag($event, manutencao)"
                class="cursor-move"
              >
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              
              <div v-if="manutencoesExecucao.length === 0" class="text-center py-8">
                <p class="text-gray-500 text-sm">Nenhuma manutenção em execução</p>
              </div>
            </div>
          </div>

          <!-- COLUNA: CONCLUÍDAS -->
          <div 
            class="kanban-column bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-fit"
            @drop="onDrop($event, 'concluida')"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div class="flex items-center justify-between text-white">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
            
            <div class="p-4 min-h-[500px] space-y-3">
              <div
                v-for="manutencao in manutencoesConcluidas"
                :key="manutencao.id"
              >
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>

              <div v-if="manutencoesConcluidas.length === 0" class="text-center py-8">
                <p class="text-gray-500 text-sm">Nenhuma manutenção concluída</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ⭐ LAYOUT MOBILE/TABLET: ACORDEÃO -->
        <div class="xl:hidden space-y-4">
          <!-- Seção Recebidas -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h2 class="font-semibold text-lg text-white flex items-center justify-between">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                  Recebidas
                </span>
                <span class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {{ manutencoesRecebidas.length }}
                </span>
              </h2>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="manutencao in manutencoesRecebidas" :key="manutencao.id">
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              <div v-if="manutencoesRecebidas.length === 0" class="text-center py-4">
                <p class="text-gray-500 text-sm">Nenhuma manutenção recebida</p>
              </div>
            </div>
          </div>

          <!-- Seção Em Análise -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
              <h2 class="font-semibold text-lg text-white flex items-center justify-between">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
                  </svg>
                  Em Análise
                </span>
                <span class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {{ manutencoesAnalise.length }}
                </span>
              </h2>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="manutencao in manutencoesAnalise" :key="manutencao.id">
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              <div v-if="manutencoesAnalise.length === 0" class="text-center py-4">
                <p class="text-gray-500 text-sm">Nenhuma manutenção em análise</p>
              </div>
            </div>
          </div>

          <!-- Seção Em Execução -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <h2 class="font-semibold text-lg text-white flex items-center justify-between">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Em Execução
                </span>
                <span class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {{ manutencoesExecucao.length }}
                </span>
              </h2>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="manutencao in manutencoesExecucao" :key="manutencao.id">
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              <div v-if="manutencoesExecucao.length === 0" class="text-center py-4">
                <p class="text-gray-500 text-sm">Nenhuma manutenção em execução</p>
              </div>
            </div>
          </div>

          <!-- Seção Concluídas -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <h2 class="font-semibold text-lg text-white flex items-center justify-between">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Concluídas
                </span>
                <span class="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {{ manutencoesConcluidas.length }}
                </span>
              </h2>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="manutencao in manutencoesConcluidas" :key="manutencao.id">
                <MaintenanceCard
                  :maintenance="manutencao"
                  @delete="excluirManutencao"
                  @nextPhase="proximaFase"
                />
              </div>
              <div v-if="manutencoesConcluidas.length === 0" class="text-center py-4">
                <p class="text-gray-500 text-sm">Nenhuma manutenção concluída</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import MaintenanceCard from '@/components/MaintenanceCard.vue';

const router = useRouter();
const authStore = useAuthStore();

// ⭐ VARIÁVEIS REATIVAS
const isLoading = ref(true);
const error = ref('');
const manutencoes = ref([]);

// ⭐ COMPUTED PROPERTIES CORRETOS (EXCLUIR ARQUIVADAS)
const manutencoesRecebidas = computed(() => {
  return manutencoes.value.filter(m => 
    m.status === 'recebida' && !m.dataArquivamento
  );
});

const manutencoesAnalise = computed(() => {
  return manutencoes.value.filter(m => 
    m.status === 'analise' && !m.dataArquivamento
  );
});

const manutencoesExecucao = computed(() => {
  return manutencoes.value.filter(m => 
    m.status === 'execucao' && !m.dataArquivamento
  );
});

const manutencoesConcluidas = computed(() => {
  return manutencoes.value.filter(m => 
    m.status === 'concluida' && !m.dataArquivamento
  );
});

// ⭐ DRAG & DROP
const startDrag = (evt, manutencao) => {
  evt.dataTransfer.dropEffect = 'move';
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('manutencaoId', manutencao.id);
};

const onDrop = async (evt, novoStatus) => {
  const manutencaoId = evt.dataTransfer.getData('manutencaoId');
  if (manutencaoId) {
    await atualizarStatus(parseInt(manutencaoId), novoStatus);
  }
};

// ⭐ FUNÇÕES PRINCIPAIS
const fetchManutencoes = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const token = authStore.token || localStorage.getItem('auth_token');
    if (!token) {
      error.value = 'Token de autenticação não encontrado';
      await router.push('/login');
      return;
    }

    console.log('🔄 Carregando manutenções...');
    
    const response = await fetch('/api/manutencoes', {
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
    console.log('📋 Resposta da API:', data);

    // Processar resposta
    if (data && Array.isArray(data.manutencoes)) {
      manutencoes.value = data.manutencoes;
    } else if (Array.isArray(data)) {
      manutencoes.value = data;
    } else {
      console.warn('⚠️ Formato de resposta inesperado:', data);
      manutencoes.value = [];
    }

    console.log(`✅ ${manutencoes.value.length} manutenções carregadas`);

  } catch (err) {
    console.error('❌ Erro ao buscar manutenções:', err);
    error.value = 'Erro ao carregar manutenções. Tente novamente.';
    manutencoes.value = [];
  } finally {
    isLoading.value = false;
  }
};

const atualizarStatus = async (id, novoStatus) => {
  try {
    const token = authStore.token || localStorage.getItem('auth_token');
    
    const response = await fetch(`/api/manutencoes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar status: ${response.statusText}`);
    }

    console.log(`✅ Status da manutenção ${id} atualizado para: ${novoStatus}`);
    await fetchManutencoes(); // Recarregar lista

  } catch (error) {
    console.error('❌ Erro ao atualizar status:', error);
    alert('Erro ao atualizar status da manutenção');
  }
};

// ⭐ PRÓXIMA FASE (em vez de concluir)
const proximaFase = async (id) => {
  const manutencao = manutencoes.value.find(m => m.id === id);
  if (!manutencao) return;

  let proximoStatus;
  switch (manutencao.status) {
    case 'recebida':
      proximoStatus = 'analise';
      break;
    case 'analise':
      proximoStatus = 'execucao';
      break;
    case 'execucao':
      proximoStatus = 'concluida';
      break;
    default:
      return;
  }

  await atualizarStatus(id, proximoStatus);
};

const excluirManutencao = async (id) => {
  if (confirm('Tem certeza que deseja excluir esta manutenção?')) {
    try {
      const token = authStore.token || localStorage.getItem('auth_token');
      
      const response = await fetch(`/api/manutencoes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir: ${response.statusText}`);
      }

      console.log(`✅ Manutenção ${id} excluída`);
      await fetchManutencoes();

    } catch (error) {
      console.error('❌ Erro ao excluir manutenção:', error);
      alert('Erro ao excluir manutenção');
    }
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// ⭐ CORRIGIR ONMOUNTED (REMOVER fetchEquipamentos):
onMounted(async () => {
  await fetchManutencoes();
});
</script>

<style scoped>
/* ====== ESTILO DAS COLUNAS COM TAMANHO FIXO ====== */
.kanban-column {
  min-width: 208px; /* Era 260px - redução de 20% */
  max-width: 100%;
  width: 100%;
}

/* ====== PADDING FIXO PARA CONTAINER ====== */
.w-full.max-w-none.mx-auto.px-4.sm\:px-6.lg\:px-8.xl\:px-12.py-8 {
  padding-left: 16px !important; /* Era 20px - reduzido */
  padding-right: 16px !important; /* Era 20px - reduzido */
}

/* ====== GRID COM GAP MENOR ====== */
.xl\:grid-cols-4 {
  gap: 12px !important; /* Era 16px - reduzido */
}

/* ====== REGRAS PARA MOSTRAR VERSÃO DESKTOP ====== */
@media (min-width: 1280px) {
  .hidden.xl\:grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 12px !important; /* Era 16px - reduzido */
  }
}

/* ====== CABEÇALHOS DE COLUNAS MAIS COMPACTOS ====== */
.bg-gradient-to-r.from-blue-500.to-blue-600.p-4,
.bg-gradient-to-r.from-yellow-500.to-yellow-600.p-4,
.bg-gradient-to-r.from-green-500.to-green-600.p-4,
.bg-gradient-to-r.from-purple-500.to-purple-600.p-4 {
  padding: 0.8rem !important; /* Era 1rem (p-4) - reduzido em 20% */
}

/* Título e subtítulo da coluna */
.font-semibold.text-lg {
  font-size: 0.95rem !important; /* Reduzido */
}

.text-blue-100.text-sm,
.text-yellow-100.text-sm,
.text-green-100.text-sm,
.text-purple-100.text-sm {
  font-size: 0.75rem !important; /* Reduzido */
}

/* Espaçamento entre cards */
.p-4.min-h-\[500px\].space-y-3 {
  padding: 0.8rem !important; /* Era 1rem (p-4) - reduzido em 20% */
  min-height: 400px !important; /* Era 500px - reduzido em 20% */
}

</style>
