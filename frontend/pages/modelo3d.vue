<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
    <!-- Header Moderno -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Modelos 3D
              </h1>
              <p class="text-slate-500 text-sm">Visualize e gerencie seus modelos tridimensionais</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Controles e Upload -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-1">Biblioteca de Modelos</h2>
            <p class="text-slate-600 text-sm">Gerencie seus arquivos CAD e modelos 3D</p>
          </div>
          
          <!-- Botão de Upload -->
          <div class="relative">
            <label for="file-upload" class="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl inline-flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Fazer Upload
              <input 
                id="file-upload" 
                type="file" 
                class="sr-only" 
                @change="handleFileUpload"
                accept=".rvt,.rfa,.dwg,.nwd,.3dm,.ipt,.iam,.sldprt,.sldasm,.step,.stp,.stl,.obj,.fbx,.dae"
              />
            </label>
          </div>
        </div>

        <!-- Status do Upload -->
        <div v-if="uploadStatus" class="mb-6">
          <div class="p-4 mb-4 rounded-md" :class="{
            'bg-blue-50 text-blue-800': uploadStatus.type === 'progress',
            'bg-green-50 text-green-800': uploadStatus.type === 'success', 
            'bg-red-50 text-red-800': uploadStatus.type === 'error'
          }">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div v-if="uploadStatus.type === 'progress'" class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else-if="uploadStatus.type === 'success'" class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div v-else-if="uploadStatus.type === 'error'" class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <h3 class="text-sm font-medium">{{ uploadStatus.message }}</h3>
                <div v-if="uploadStatus.type === 'progress'" class="mt-3">
                  <div class="flex items-center justify-between text-sm mb-1">
                    <span>Progresso do upload</span>
                    <span>{{ uploadStatus.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                      :style="{ width: `${uploadStatus.progress}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Modelos -->
        <div v-if="userModels.length > 0" class="overflow-x-auto rounded-lg shadow-sm">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Modelo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Upload</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tamanho</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Ações</th>
              </tr>
            </thead>
            
            <tbody>
              <tr 
                v-for="model in userModels" 
                :key="model.id" 
                class="cursor-pointer hover:bg-gray-50 transition-colors"
                @click="model.status === 'ready' ? loadModelViewer(model.urn) : null"
                :class="{ 'opacity-75': model.status !== 'ready' }"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-12 h-12">
                      <img 
                        v-if="model.thumbnail" 
                        :src="model.thumbnail" 
                        :alt="model.name"
                        class="w-12 h-12 rounded-xl object-cover border border-purple-200"
                      />
                      <div v-else class="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center border border-purple-200">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-900 max-w-xs truncate">{{ model.name }}</div>
                      <div class="text-xs text-slate-500">{{ getFileExtension(model.originalFileName) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                  <div class="text-sm text-slate-900">{{ formatDate(model.createdAt) }}</div>
                  <div class="text-xs text-slate-500">{{ formatTimeAgo(model.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                  <span 
                    v-if="model.status === 'ready'" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    Pronto
                  </span>
                  <span 
                    v-else-if="model.status === 'processing' || model.translationStatus === 'inprogress'" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse"></div>
                    Processando ({{ model.progress || '0%' }})
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    <div class="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></div>
                    {{ model.errorMessage || 'Erro' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200 text-slate-900">
                  {{ formatBytes(model.fileSize) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      v-if="model.status === 'ready'"
                      @click.stop="loadModelViewer(model.urn)" 
                      class="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Visualizar modelo"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button 
                      @click.stop="handleDeleteModel(model.id)" 
                      class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir modelo"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Estado Vazio -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-200 shadow-lg">
            <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Nenhum modelo disponível</h3>
          <p class="text-slate-500 mb-6 max-w-md mx-auto">
            Faça upload do seu primeiro modelo CAD ou 3D para começar a visualizar em tempo real.
          </p>
          
          <label for="file-upload-empty" class="cursor-pointer inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Fazer Primeiro Upload
            <input 
              id="file-upload-empty" 
              type="file" 
              class="sr-only" 
              @change="handleFileUpload"
              accept=".rvt,.rfa,.dwg,.nwd,.3dm,.ipt,.iam,.sldprt,.sldasm,.step,.stp,.stl,.obj,.fbx,.dae"
            />
          </label>
        </div>
      </div>

      <!-- Viewer Container -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">Visualizador 3D</h3>
              <p class="text-sm text-slate-600">
                {{ currentModelName || 'Selecione um modelo para visualizar' }}
              </p>
            </div>
            
            <div v-if="currentModelName" class="flex items-center space-x-2">
              <button 
                @click="resetView" 
                class="p-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-colors border border-slate-300"
                title="Resetar visualização"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="relative bg-gradient-to-br from-slate-100 to-slate-200">
          <div 
            ref="viewerContainer" 
            id="forgeViewer" 
            class="w-full h-[600px]"
          ></div>
          
          <!-- Estado de Loading -->
          <div v-if="viewerLoading" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div class="text-center">
              <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p class="text-slate-600 font-medium">Carregando modelo...</p>
            </div>
          </div>
          
          <!-- Estado de Erro -->
          <div v-if="viewerError" class="absolute inset-0 bg-red-50/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-white rounded-xl p-6 border border-red-200 shadow-lg max-w-md text-center">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-red-900 mb-2">Erro no Visualizador</h3>
              <p class="text-red-700 text-sm mb-4">{{ viewerError }}</p>
              <button 
                @click="initializeViewer" 
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

// Estados principais
const viewer = ref(null);
const viewerContainer = ref(null);
const viewerError = ref('');
const viewerLoading = ref(false);
const userModels = ref([]);
const uploadStatus = ref(null);
const currentModelName = ref('');
const isClient = ref(false);

// ⭐ INICIALIZAR COMPOSABLE APENAS NO CLIENT-SIDE
let modelsAPI = null;

// Mock de dados para teste
const supportedFormats = ref([
  'RVT', 'RFA', 'DWG', 'DWF', 'DWFX', 'DXF', 'NWD', 'NWC',
  '3DM', 'IPT', 'IAM', 'SLDPRT', 'SLDASM', 'STEP', 'STP',
  'STL', 'OBJ', 'FBX', 'DAE', '3DS', 'IGES', 'IGS'
]);

// Computed properties
const readyModels = computed(() => {
  if (!userModels.value) return 0;
  return userModels.value.filter(model => model.status === 'ready').length;
});

const processingModels = computed(() => {
  if (!userModels.value) return 0;
  return userModels.value.filter(model => 
    model.status === 'processing' || 
    model.translationStatus === 'inprogress'
  ).length;
});

const totalSize = computed(() => {
  if (!userModels.value) return '0 B';
  const total = userModels.value.reduce((sum, model) => sum + (model.fileSize || 0), 0);
  return formatBytes(total);
});

// Funções utilitárias
const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
  return `${Math.floor(diffInMinutes / 1440)}d atrás`;
};

const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toUpperCase();
};

// ⭐ FUNÇÕES PRINCIPAIS COM VERIFICAÇÃO CLIENT-SIDE
const loadUserModels = async () => {
  if (!process.client || !modelsAPI) {
    console.log('Carregando modelos apenas no client...');
    return;
  }
  
  try {
    const response = await modelsAPI.getModels();
    
    // ⭐ VERIFICAR SE É MOCK
    if (response.isMock) {
      console.log('🔄 Usando dados mock para desenvolvimento');
      
      // Mostrar notificação visual de que é mock
      uploadStatus.value = {
        type: 'info',
        message: '📍 Modo desenvolvimento: Usando dados de exemplo'
      };
      
      // Remover notificação após 3 segundos
      setTimeout(() => {
        if (uploadStatus.value?.type === 'info') {
          uploadStatus.value = null;
        }
      }, 3000);
    }
    
    userModels.value = response.models || [];
    
  } catch (error) {
    console.error('Erro ao carregar modelos:', error);
    
    // ⭐ FALLBACK FINAL - LISTA VAZIA COM NOTIFICAÇÃO
    userModels.value = [];
    
    uploadStatus.value = {
      type: 'error',
      message: 'Erro ao conectar com servidor. Verifique sua conexão.'
    };
    
    setTimeout(() => {
      if (uploadStatus.value?.type === 'error') {
        uploadStatus.value = null;
      }
    }, 5000);
  }
};

const handleFileUpload = async (event) => {
  if (!process.client || !modelsAPI) return;
  
  try {
    const file = event.target.files[0];
    if (!file) return;
    
    // ⭐ VALIDAÇÃO DE ARQUIVO
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      uploadStatus.value = {
        type: 'error',
        message: 'Arquivo muito grande. Máximo permitido: 500MB'
      };
      event.target.value = ''; // Resetar input
      return;
    }
    
    const allowedTypes = [
      '.rvt', '.rfa', '.dwg', '.nwd', '.3dm', '.ipt', '.iam', 
      '.sldprt', '.sldasm', '.step', '.stp', '.stl', '.obj', 
      '.fbx', '.dae', '.dwf', '.dwfx', '.dxf', '.nwc', '.3ds', 
      '.iges', '.igs'
    ];
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      uploadStatus.value = {
        type: 'error',
        message: `Formato ${fileExtension} não suportado. Tipos aceitos: ${allowedTypes.join(', ')}`
      };
      event.target.value = ''; // Resetar input
      return;
    }
    
    // ⭐ PROGRESS BAR REALISTA
    uploadStatus.value = {
      type: 'progress',
      message: `Enviando ${file.name}...`,
      progress: 0
    };
    
    // Simular progresso durante upload
    const progressInterval = setInterval(() => {
      if (uploadStatus.value && uploadStatus.value.type === 'progress' && uploadStatus.value.progress < 90) {
        uploadStatus.value.progress = Math.min(90, uploadStatus.value.progress + Math.random() * 15);
      }
    }, 500);

    const result = await modelsAPI.uploadModel(file, file.name);
    
    clearInterval(progressInterval);
    
    uploadStatus.value = {
      type: 'success',
      message: result.isMock ? 
        'Upload simulado com sucesso! (modo desenvolvimento)' : 
        'Upload concluído! Processando modelo...',
      progress: 100
    };
    
    // Resetar input
    event.target.value = '';
    
    await loadUserModels();
    
    setTimeout(() => {
      uploadStatus.value = null;
    }, 3000);

  } catch (error) {
    uploadStatus.value = {
      type: 'error',
      message: `Erro: ${error.message || 'Falha no upload'}`
    };
    
    // Resetar input em caso de erro
    event.target.value = '';
    
    console.error('Erro no upload:', error);
    
    // Remover status de erro após 5 segundos
    setTimeout(() => {
      uploadStatus.value = null;
    }, 5000);
  }
};

const handleDeleteModel = async (modelId) => {
  if (!process.client || !modelsAPI) return;
  if (!confirm('Tem certeza que deseja excluir este modelo?')) return;
  
  try {
    await modelsAPI.deleteModel(modelId);
    userModels.value = userModels.value.filter(model => model.id !== modelId);
    
    // Se era o modelo atual, limpar viewer
    const deletedModel = userModels.value.find(m => m.id === modelId);
    if (deletedModel && deletedModel.name === currentModelName.value) {
      currentModelName.value = '';
      if (viewer.value) {
        viewer.value.tearDown();
      }
    }
  } catch (error) {
    console.error('Erro ao excluir modelo:', error);
    alert(`Erro ao excluir: ${error.message}`);
  }
};

const loadModelViewer = async (urn) => {
  if (!process.client) return;
  
  // ⭐ SE URN É NULL, MOSTRAR MENSAGEM PARA MODELOS MOCK
  if (!urn) {
    viewerError.value = 'Este é um modelo de exemplo. Conecte a API backend para visualizar modelos reais.';
    return;
  }
  
  try {
    // ⭐ VERIFICAR SE É UM MODELO VÁLIDO
    const model = userModels.value.find(m => m.urn === urn);
    if (!model) {
      viewerError.value = 'Modelo não encontrado';
      return;
    }
    
    // ⭐ VERIFICAR SE MODELO ESTÁ PRONTO
    if (model.status !== 'ready') {
      viewerError.value = `Modelo ainda está sendo processado (${model.progress || '0%'})`;
      return;
    }
    
    // ⭐ ESTADOS MUTUAMENTE EXCLUSIVOS
    viewerLoading.value = true;
    viewerError.value = '';
    
    currentModelName.value = model.name;
    
    // Verificar se viewer existe e está inicializado
    if (!viewer.value) {
      console.log('Inicializando viewer...');
      await initializeViewer();
    }
    
    // ⭐ AGUARDAR VIEWER ESTAR PRONTO
    let attempts = 0;
    const maxAttempts = 50;
    
    while ((!viewer.value || !viewer.value.impl) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!viewer.value || !viewer.value.impl) {
      throw new Error('Viewer não conseguiu inicializar adequadamente');
    }
    
    const documentId = `urn:${urn}`;
    
    console.log('Carregando documento:', documentId);
    loadDocument(viewer.value, documentId);
    
  } catch (error) {
    console.error('Erro ao carregar modelo:', error);
    viewerError.value = `Erro ao carregar modelo: ${error.message}`;
    viewerLoading.value = false;
    currentModelName.value = '';
  }
};

const initializeViewer = async () => {
  if (!process.client) return;
  
  try {
    // ⭐ LIMPAR ESTADO ANTERIOR
    viewerLoading.value = true;
    viewerError.value = '';
    
    // Destruir viewer anterior se existir
    if (viewer.value) {
      try {
        viewer.value.tearDown();
        viewer.value = null;
      } catch (e) {
        console.warn('Erro ao destruir viewer anterior:', e);
      }
    }
    
    await waitForAutodeskScripts();
    
    // ⭐ VERIFICAR SE TEM API DISPONÍVEL
    if (!modelsAPI) {
      throw new Error('API de modelos não inicializada');
    }
    
    const tokenResponse = await modelsAPI.getForgeToken();
    if (!tokenResponse || !tokenResponse.access_token) {
      throw new Error('Token de acesso não disponível');
    }

    const options = {
      env: 'AutodeskProduction2',
      api: 'streamingV2',
      accessToken: tokenResponse.access_token,
      getAccessToken: async (onSuccess) => {
        // Renovar token se necessário
        try {
          const newToken = await modelsAPI.getForgeToken();
          onSuccess(newToken.access_token, newToken.expires_in);
        } catch (error) {
          console.error('Erro ao renovar token:', error);
        }
      }
    };

    const container = viewerContainer.value;
    if (!container) {
      throw new Error('Container do viewer não encontrado');
    }

    // ⭐ VERIFICAR SE CONTAINER TEM DIMENSÕES
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error('Container do viewer tem dimensões inválidas');
    }

    viewer.value = new window.Autodesk.Viewing.GuiViewer3D(container);
    
    // ⭐ ADICIONAR LISTENERS DE EVENTO
    viewer.value.addEventListener(window.Autodesk.Viewing.VIEWER_INITIALIZED, () => {
      console.log('Viewer inicializado com sucesso');
      viewerLoading.value = false;
    });
    
    viewer.value.addEventListener(window.Autodesk.Viewing.VIEWER_RESIZE_EVENT, () => {
      if (viewer.value) {
        viewer.value.resize();
      }
    });
    
    window.Autodesk.Viewing.Initializer(options, () => {
      const result = viewer.value.start();
      if (result > 0) {
        console.error('Erro ao iniciar viewer:', result);
        viewerError.value = 'Falha ao inicializar o visualizador';
        viewerLoading.value = false;
      }
    });
    
  } catch (error) {
    console.error('Erro ao inicializar viewer:', error);
    viewerError.value = `Erro ao inicializar viewer: ${error.message}`;
    viewerLoading.value = false;
  }
};

const waitForAutodeskScripts = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Autodesk) {
      resolve();
      return;
    }
    
    let attempts = 0;
    const maxAttempts = 100;
    
    const checkScript = () => {
      if (typeof window !== 'undefined' && window.Autodesk) {
        resolve();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkScript, 100);
      } else {
        reject(new Error('Scripts do Autodesk não carregaram'));
      }
    };
    
    checkScript();
  });
};

const loadDocument = (viewerInstance, documentId) => {
  if (!viewerInstance || !documentId) {
    viewerError.value = 'Parâmetros inválidos para carregar documento';
    viewerLoading.value = false;
    return;
  }
  
  window.Autodesk.Viewing.Document.load(
    documentId,
    (doc) => {
      try {
        console.log('Documento carregado:', doc);
        
        // ⭐ BUSCAR GEOMETRIA PADRÃO
        const defaultModel = doc.getRoot().getDefaultGeometry();
        if (defaultModel) {
          console.log('Carregando geometria padrão...');
          
          viewerInstance.loadDocumentNode(doc, defaultModel)
            .then(() => {
              console.log('Modelo carregado com sucesso');
              viewerLoading.value = false;
              
              // ⭐ AJUSTAR VISUALIZAÇÃO AUTOMATICAMENTE
              setTimeout(() => {
                if (viewerInstance) {
                  viewerInstance.fitToView();
                }
              }, 500);
            })
            .catch((error) => {
              console.error('Erro ao carregar nó do documento:', error);
              viewerError.value = `Erro ao carregar modelo: ${error}`;
              viewerLoading.value = false;
            });
        } else {
          // ⭐ BUSCAR OUTRAS GEOMETRIAS DISPONÍVEIS
          const geometries = doc.getRoot().search({'type': 'geometry'});
          if (geometries && geometries.length > 0) {
            console.log('Carregando primeira geometria disponível...');
            viewerInstance.loadDocumentNode(doc, geometries[0])
              .then(() => {
                viewerLoading.value = false;
                setTimeout(() => {
                  if (viewerInstance) {
                    viewerInstance.fitToView();
                  }
                }, 500);
              })
              .catch((error) => {
                viewerError.value = `Erro ao carregar geometria: ${error}`;
                viewerLoading.value = false;
              });
          } else {
            viewerError.value = 'Nenhuma geometria 3D encontrada no modelo';
            viewerLoading.value = false;
          }
        }
      } catch (error) {
        console.error('Erro ao processar documento:', error);
        viewerError.value = `Erro ao processar documento: ${error.message}`;
        viewerLoading.value = false;
      }
    },
    (error, errorCode, errorMsg) => {
      console.error('Erro ao carregar documento:', error, errorCode, errorMsg);
      
      let userMessage = 'Erro ao carregar documento';
      
      // ⭐ MENSAGENS DE ERRO MAIS ESPECÍFICAS
      if (errorCode === 3) {
        userMessage = 'Modelo ainda está sendo processado. Tente novamente em alguns minutos.';
      } else if (errorCode === 6) {
        userMessage = 'Acesso negado ao modelo. Verifique as permissões.';
      } else if (errorCode === 404) {
        userMessage = 'Modelo não encontrado. Pode ter sido removido.';
      } else if (errorMsg) {
        userMessage = errorMsg;
      }
      
      viewerError.value = userMessage;
      viewerLoading.value = false;
    }
  );
};

const resetView = () => {
  if (viewer.value && process.client) {
    viewer.value.fitToView();
  }
};

// ⭐ FUNÇÃO PARA REDIMENSIONAR VIEWER
const resizeViewer = () => {
  if (viewer.value && process.client) {
    try {
      viewer.value.resize();
    } catch (error) {
      console.warn('Erro ao redimensionar viewer:', error);
    }
  }
};

// ⭐ LIFECYCLE HOOKS MELHORADOS
onMounted(async () => {
  isClient.value = true;
  
  await nextTick();
  
  if (process.client) {
    try {
      modelsAPI = useModels3D();
      await loadUserModels();
      
      // Adicionar listener para redimensionamento
      window.addEventListener('resize', resizeViewer);
      
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  }
});

onUnmounted(() => {
  if (viewer.value && process.client) {
    try {
      viewer.value.tearDown();
    } catch (error) {
      console.warn('Erro ao destruir viewer:', error);
    }
  }
  
  if (process.client) {
    window.removeEventListener('resize', resizeViewer);
  }
});

// Metadata da página
useHead({
  title: 'Modelos 3D - Sistema de Gestão Industrial'
});
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>