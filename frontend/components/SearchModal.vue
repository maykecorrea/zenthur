<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-10" @click="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[90vh] overflow-hidden" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 class="text-xl font-bold text-white flex items-center">
          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Buscar no Sistema
        </h2>
        <button @click="$emit('close')" class="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Campo de Busca -->
      <div class="p-6 border-b border-gray-200">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            ref="searchInput"
            v-model="searchQuery"
            @input="buscarComDebounce"
            type="text" 
            placeholder="Digite para buscar equipamentos, manutenções, categorias..."
            class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            autofocus
          />
          <div v-if="loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value; buscar()"
            :class="[
              'flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2',
              activeTab === tab.value 
                ? 'text-white bg-blue-600 shadow-md' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            ]"
          >
            <span>{{ tab.label }}</span>
            <span v-if="results && getTabCount(tab.value) > 0" class="bg-white/20 text-xs px-2 py-1 rounded-full">
              {{ getTabCount(tab.value) }}
            </span>
          </button>
        </div>
      </div>
      
      <!-- Resultados -->
      <div class="flex-1 overflow-y-auto max-h-96 p-6">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Buscando...</p>
        </div>
        
        <!-- Estado Inicial -->
        <div v-else-if="!searchQuery" class="text-center py-12">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Digite para buscar</h3>
          <p class="text-gray-500">Encontre equipamentos, manutenções e muito mais</p>
          
          <!-- Sugestões Rápidas -->
          <div class="mt-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Buscas Sugeridas:</h4>
            <div class="flex flex-wrap gap-2 justify-center">
              <button 
                v-for="sugestao in sugestoesRapidas" 
                :key="sugestao"
                @click="searchQuery = sugestao; buscar()"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {{ sugestao }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Nenhum Resultado -->
        <div v-else-if="results && results.total === 0" class="text-center py-12">
          <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
          <p class="text-gray-500">Tente usar termos diferentes ou verifique a ortografia</p>
        </div>
        
        <!-- Resultados -->
        <div v-else-if="results" class="space-y-6">
          <!-- Equipamentos -->
          <div v-if="(activeTab === 'todos' || activeTab === 'equipamentos') && results.equipamentos && results.equipamentos.length > 0" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Equipamentos ({{ results.equipamentos.length }})</h3>
            </div>
            
            <div class="grid gap-3">
              <div 
                v-for="equipamento in results.equipamentos" 
                :key="equipamento.id"
                @click="selecionarItem('equipamento', equipamento)"
                class="group p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-gray-900">{{ equipamento.nome }}</h4>
                        <p class="text-sm text-gray-600">{{ equipamento.tag || 'Sem TAG' }} • {{ equipamento.categoria?.nome || 'Sem categoria' }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span v-if="equipamento.fabricante">📍 {{ equipamento.fabricante }}</span>
                      <span v-if="equipamento.localizacao">🏢 {{ equipamento.localizacao }}</span>
                      <span>🔧 {{ equipamento._count?.manutencoes || 0 }} manutenções</span>
                    </div>
                  </div>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Manutenções -->
          <div v-if="(activeTab === 'todos' || activeTab === 'manutencoes') && results.manutencoes && results.manutencoes.length > 0" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Manutenções ({{ results.manutencoes.length }})</h3>
            </div>
            
            <div class="grid gap-3">
              <div 
                v-for="manutencao in results.manutencoes" 
                :key="manutencao.id"
                @click="selecionarItem('manutencao', manutencao)"
                class="group p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z"></path>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-gray-900">{{ manutencao.titulo }}</h4>
                        <p class="text-sm text-gray-600">{{ manutencao.equipamento?.nome || 'Equipamento não especificado' }}</p>
                      </div>
                      <span 
                        class="px-2 py-1 rounded-full text-xs font-medium"
                        :class="getStatusClass(manutencao.status)"
                      >
                        {{ getStatusLabel(manutencao.status) }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span>👤 {{ manutencao.user?.nome || 'Usuário' }}</span>
                      <span>📅 {{ formatarData(manutencao.createdAt) }}</span>
                      <span v-if="manutencao.criticidade" :class="getCriticidadeClass(manutencao.criticidade)">
                        🔥 {{ manutencao.criticidade.toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Categorias -->
          <div v-if="(activeTab === 'todos' || activeTab === 'categorias') && results.categorias && results.categorias.length > 0" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Categorias ({{ results.categorias.length }})</h3>
            </div>
            
            <div class="grid gap-3">
              <div 
                v-for="categoria in results.categorias" 
                :key="categoria.id"
                @click="selecionarItem('categoria', categoria)"
                class="group p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-gray-900">{{ categoria.nome }}</h4>
                        <p class="text-sm text-gray-600">{{ categoria.descricao || 'Sem descrição' }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⚙️ {{ categoria._count?.equipamentos || 0 }} equipamentos</span>
                    </div>
                  </div>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
        <div class="text-sm text-gray-500">
          <span v-if="results && results.total > 0">
            {{ results.total }} resultado{{ results.total !== 1 ? 's' : '' }} encontrado{{ results.total !== 1 ? 's' : '' }}
          </span>
        </div>
        <div class="flex space-x-3">
          <button @click="limparBusca" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            Limpar
          </button>
          <button @click="$emit('close')" class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/utils/api';

// ⭐ PROPS CORRIGIDAS
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'select']);
const router = useRouter();

// ⭐ VARIÁVEIS REATIVAS
const searchInput = ref(null);
const searchQuery = ref('');
const activeTab = ref('todos');
const loading = ref(false);
const results = ref(null);
const debounceTimer = ref(null);

// ⭐ CONFIGURAÇÃO DE TABS
const tabs = [
  { value: 'todos', label: 'Todos' },
  { value: 'equipamentos', label: 'Equipamentos' },
  { value: 'manutencoes', label: 'Manutenções' },
  { value: 'categorias', label: 'Categorias' }
];

// ⭐ SUGESTÕES RÁPIDAS
const sugestoesRapidas = [
  'Motor', 'Bomba', 'Preventiva', 'Corretiva', 'Urgente', 'Elétrico'
];

// ⭐ FUNÇÕES DE BUSCA
const buscar = async () => {
  if (!searchQuery.value || searchQuery.value.trim().length < 2) {
    results.value = null;
    return;
  }

  loading.value = true;
  
  try {
    console.log('🔍 Executando busca:', { query: searchQuery.value, type: activeTab.value });
    
    const response = await api.get('/search', {
      params: {
        q: searchQuery.value.trim(),
        type: activeTab.value === 'todos' ? undefined : activeTab.value
      }
    });
    
    results.value = response;
    console.log('✅ Resultados da busca:', results.value);
    
  } catch (error) {
    console.error('❌ Erro na busca:', error);
    results.value = {
      equipamentos: [],
      manutencoes: [],
      categorias: [],
      documentos: [],
      total: 0
    };
  } finally {
    loading.value = false;
  }
};

const buscarComDebounce = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    buscar();
  }, 300);
};

const limparBusca = () => {
  searchQuery.value = '';
  results.value = null;
  activeTab.value = 'todos';
  nextTick(() => {
    searchInput.value?.focus();
  });
};

// ⭐ FUNÇÕES DE NAVEGAÇÃO
const selecionarItem = (tipo, item) => {
  console.log('📌 Item selecionado:', { tipo, item });
  
  emit('select', { tipo, item });
  
  // Navegar para a página apropriada
  switch (tipo) {
    case 'equipamento':
      router.push(`/equipamentos`);
      break;
    case 'manutencao':
      router.push(`/manutencao`);
      break;
    case 'categoria':
      router.push(`/equipamentos?categoria=${item.id}`);
      break;
  }
  
  emit('close');
};

// ⭐ FUNÇÕES AUXILIARES
const getTabCount = (tab) => {
  if (!results.value) return 0;
  
  switch (tab) {
    case 'todos':
      return results.value.total;
    case 'equipamentos':
      return results.value.equipamentos?.length || 0;
    case 'manutencoes':
      return results.value.manutencoes?.length || 0;
    case 'categorias':
      return results.value.categorias?.length || 0;
    default:
      return 0;
  }
};

const getStatusClass = (status) => {
  const classes = {
    'recebida': 'bg-blue-100 text-blue-800',
    'analise': 'bg-yellow-100 text-yellow-800',
    'execucao': 'bg-orange-100 text-orange-800',
    'concluida': 'bg-green-100 text-green-800',
    'arquivada': 'bg-gray-100 text-gray-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status) => {
  const labels = {
    'recebida': 'Recebida',
    'analise': 'Em Análise',
    'execucao': 'Em Execução',
    'concluida': 'Concluída',
    'arquivada': 'Arquivada'
  };
  return labels[status] || status;
};

const getCriticidadeClass = (criticidade) => {
  const classes = {
    'alta': 'text-red-600',
    'media': 'text-yellow-600',
    'baixa': 'text-green-600'
  };
  return classes[criticidade] || 'text-gray-600';
};

const formatarData = (data) => {
  if (!data) return 'N/A';
  try {
    return new Date(data).toLocaleDateString('pt-BR');
  } catch (error) {
    return 'Data inválida';
  }
};

// ⭐ WATCHERS E LIFECYCLE - CORRIGIDO
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});

onMounted(() => {
  // Focar no input quando o modal abrir
  if (searchInput.value) {
    searchInput.value.focus();
  }
});
</script>