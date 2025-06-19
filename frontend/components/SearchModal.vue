<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-900">Busca</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Campo de busca -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            ref="searchInput"
            type="text" 
            placeholder="Buscar equipamentos, manutenções..." 
            class="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            v-model="searchQuery"
            @input="performSearch"
            @keydown.down="navigateResults('down')"
            @keydown.up="navigateResults('up')"
            @keydown.enter="selectResult"
          >
        </div>
        
        <!-- Tabs de categoria -->
        <div class="flex mt-4 border-b border-gray-200 mb-4">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="px-4 py-2 mr-2 text-sm font-medium"
            :class="selectedCategory === category.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
            @click="selectCategory(category.id)">
            {{ category.name }}
          </button>
        </div>
        
        <!-- Estado de carregamento -->
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span class="ml-3 text-gray-600">Pesquisando...</span>
        </div>
        
        <!-- Resultados da busca -->
        <div v-else-if="searchResults.length > 0" class="mt-2 max-h-80 overflow-y-auto">
          <div 
            v-for="(result, index) in filteredResults" 
            :key="result.id"
            class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            :class="{ 'bg-blue-50': selectedIndex === index }"
            @click="goToResult(result)"
            @mouseover="selectedIndex = index">
            
            <!-- Equipamento -->
            <div v-if="result.type === 'equipamento'" class="flex items-center">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ result.nome }}</p>
                <p class="text-xs text-gray-500">Equipamento | {{ result.categoria?.nome || 'Sem categoria' }}</p>
              </div>
            </div>
            
            <!-- Manutenção -->
            <div v-else-if="result.type === 'manutencao'" class="flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ result.titulo }}</p>
                <p class="text-xs text-gray-500">Manutenção | Status: {{ getStatusLabel(result.status) }}</p>
              </div>
            </div>
            
            <!-- Documento -->
            <div v-else-if="result.type === 'documento'" class="flex items-center">
              <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mr-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ result.nome || result.titulo }}</p>
                <p class="text-xs text-gray-500">Documento</p>
              </div>
            </div>
            
            <!-- Categoria -->
            <div v-else-if="result.type === 'categoria'" class="flex items-center">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ result.nome }}</p>
                <p class="text-xs text-gray-500">Categoria | {{ result.equipamentos_count || 0 }} equipamentos</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mensagem quando não há resultados -->
        <div v-else-if="searchQuery" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Nenhum resultado encontrado para "{{ searchQuery }}"</p>
        </div>
        
        <!-- Instruções iniciais -->
        <div v-else class="text-center py-8 text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <p class="mt-4">Digite para buscar equipamentos, manutenções e documentos</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/utils/api';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'open']);
const router = useRouter();

const searchInput = ref(null);
const searchQuery = ref('');
const loading = ref(false);
const searchResults = ref([]);
const selectedIndex = ref(-1);
const searchTimeout = ref(null);

// Categorias de busca
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'equipamento', name: 'Equipamentos' },
  { id: 'manutencao', name: 'Manutenções' },
  { id: 'documento', name: 'Documentos' },
  { id: 'categoria', name: 'Categorias' }
];
const selectedCategory = ref('all');

// Cache para dados já carregados
const equipamentosCache = ref([]);
const manutencoesCache = ref([]);
const documentosCache = ref([]);
const categoriasCache = ref([]);

// Filtrar resultados pela categoria selecionada
const filteredResults = computed(() => {
  if (selectedCategory.value === 'all') {
    return searchResults.value;
  }
  return searchResults.value.filter(result => result.type === selectedCategory.value);
});

// Focar no input de busca quando o modal abrir
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    searchInput.value?.focus();
    loadInitialData();
  } else {
    // Reset state when modal closes
    searchQuery.value = '';
    selectedIndex.value = -1;
  }
});

// Método para executar a busca
const performSearch = () => {
  // Limpar o timeout anterior se existir
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  // Configurar um novo timeout (debounce)
  searchTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim().length > 0) {
      loading.value = true;
      try {
        // Tentar usar a API de busca unificada se existir
        try {
          const response = await api.get(`/search?q=${encodeURIComponent(searchQuery.value)}`);
          if (response && response.results) {
            searchResults.value = response.results;
          }
        } catch (e) {
          // Se falhar, fazer busca nos dados em cache
          searchInLocalData();
        }
      } catch (error) {
        console.error('Erro ao realizar busca:', error);
        searchInLocalData(); // Fallback para busca local
      } finally {
        loading.value = false;
      }
    } else {
      searchResults.value = [];
    }
  }, 300);
};

// Buscar nos dados em cache localmente
const searchInLocalData = () => {
  const query = searchQuery.value.toLowerCase();
  const results = [];
  
  // Buscar em equipamentos
  equipamentosCache.value.forEach(item => {
    if (item.nome?.toLowerCase().includes(query) || 
        item.modelo?.toLowerCase().includes(query) || 
        item.serie?.toLowerCase().includes(query)) {
      results.push({ ...item, type: 'equipamento' });
    }
  });
  
  // Buscar em manutenções
  manutencoesCache.value.forEach(item => {
    if (item.titulo?.toLowerCase().includes(query) || 
        item.descricao?.toLowerCase().includes(query)) {
      results.push({ ...item, type: 'manutencao' });
    }
  });
  
  // Buscar em documentos
  documentosCache.value.forEach(item => {
    if (item.nome?.toLowerCase().includes(query) || 
        item.descricao?.toLowerCase().includes(query)) {
      results.push({ ...item, type: 'documento' });
    }
  });
  
  // Buscar em categorias
  categoriasCache.value.forEach(item => {
    if (item.nome?.toLowerCase().includes(query)) {
      results.push({ ...item, type: 'categoria' });
    }
  });
  
  searchResults.value = results;
};

// Carregar dados iniciais para o cache
const loadInitialData = async () => {
  try {
    // Carregar equipamentos se não estiverem em cache
    if (equipamentosCache.value.length === 0) {
      const equipResponse = await api.get('/equipamentos');
      if (equipResponse && Array.isArray(equipResponse)) {
        equipamentosCache.value = equipResponse.map(item => ({ ...item, type: 'equipamento' }));
      } else if (equipResponse && equipResponse.data && Array.isArray(equipResponse.data)) {
        equipamentosCache.value = equipResponse.data.map(item => ({ ...item, type: 'equipamento' }));
      }
    }
    
    // Carregar manutenções se não estiverem em cache
    if (manutencoesCache.value.length === 0) {
      const manutResponse = await api.get('/manutencoes');
      if (manutResponse && Array.isArray(manutResponse)) {
        manutencoesCache.value = manutResponse.map(item => ({ ...item, type: 'manutencao' }));
      } else if (manutResponse && manutResponse.manutencoes && Array.isArray(manutResponse.manutencoes)) {
        manutencoesCache.value = manutResponse.manutencoes.map(item => ({ ...item, type: 'manutencao' }));
      }
    }
    
    // Carregar categorias se não estiverem em cache
    if (categoriasCache.value.length === 0) {
      const catResponse = await api.get('/categorias');
      if (catResponse && Array.isArray(catResponse)) {
        categoriasCache.value = catResponse.map(item => ({ ...item, type: 'categoria' }));
      } else if (catResponse && catResponse.data && Array.isArray(catResponse.data)) {
        categoriasCache.value = catResponse.data.map(item => ({ ...item, type: 'categoria' }));
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar dados iniciais para busca:', error);
  }
};

// Selecionar categoria
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  selectedIndex.value = -1; // Reset selected index
};

// Navegar pelos resultados com teclado
const navigateResults = (direction) => {
  if (filteredResults.value.length === 0) return;
  
  if (direction === 'down') {
    selectedIndex.value = (selectedIndex.value + 1) % filteredResults.value.length;
  } else if (direction === 'up') {
    selectedIndex.value = selectedIndex.value <= 0 ? filteredResults.value.length - 1 : selectedIndex.value - 1;
  }
};

// Selecionar resultado com Enter
const selectResult = () => {
  if (selectedIndex.value >= 0 && filteredResults.value[selectedIndex.value]) {
    goToResult(filteredResults.value[selectedIndex.value]);
  }
};

// Navegar para o resultado selecionado
const goToResult = (result) => {
  emit('close');
  
  switch (result.type) {
    case 'equipamento':
      router.push(`/equipamento/${result.id}`);
      break;
    case 'manutencao':
      router.push(`/manutencao/${result.id}`);
      break;
    case 'documento':
      router.push(`/documento/${result.id}`);
      break;
    case 'categoria':
      router.push(`/categoria/${result.id}`);
      break;
    default:
      console.warn('Tipo de resultado desconhecido:', result.type);
  }
};

// Obter label para status de manutenção
const getStatusLabel = (status) => {
  const labels = {
    'recebida': 'Recebida',
    'analise': 'Em Análise',
    'execucao': 'Em Execução',
    'concluida': 'Concluída',
    'cancelada': 'Cancelada'
  };
  return labels[status] || 'Desconhecido';
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilização para a barra de rolagem */
.max-h-80::-webkit-scrollbar {
  width: 6px;
}

.max-h-80::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-80::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 3px;
}

.max-h-80::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>