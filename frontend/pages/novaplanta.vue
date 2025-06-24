<!-- filepath: d:\PROJETO\frontend\pages\novaplanta.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
    <!-- ⭐ CONTAINER RESPONSIVO PRINCIPAL -->
    <div class="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      
      <!-- Header sempre responsivo -->
      <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
        <div class="w-full max-w-7xl mx-auto px-4 py-6">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div class="flex items-center space-x-4 min-w-0">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-slate-900 to-teal-600 bg-clip-text text-transparent">
                  {{ editMode ? 'Editar Planta' : 'Nova Planta' }}
                </h1>
                <p class="text-sm lg:text-base text-slate-600 truncate">
                  {{ editMode ? 'Atualize as informações da planta' : 'Crie uma nova planta interativa' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ⭐ CONTAINER PRINCIPAL COM RESPONSIVIDADE TOTAL -->
      <div class="w-full max-w-6xl mx-auto py-8">
        
        <!-- ⭐ GRID RESPONSIVO CORRIGIDO -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          
          <!-- ⭐ COLUNA 1: FORMULÁRIO -->
          <div class="space-y-8">
            
            <!-- Card Informações Básicas -->
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-slate-600 to-slate-700 px-6 lg:px-8 py-6">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg lg:text-xl font-bold text-white">Informações Básicas</h2>
                    <p class="text-slate-300 text-sm">Dados principais da planta</p>
                  </div>
                </div>
              </div>
              
              <div class="p-6 lg:p-8 space-y-6">
                <!-- Título -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">
                    Título da Planta
                  </label>
                  <input 
                    v-model="planta.titulo" 
                    type="text" 
                    class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm lg:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all"
                    placeholder="Ex: Planta da Produção - Setor A"
                    required
                  />
                  <div v-if="errors.titulo" class="mt-1 text-sm text-red-600">
                    {{ errors.titulo }}
                  </div>
                </div>

                <!-- Descrição -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">
                    Descrição
                  </label>
                  <textarea 
                    v-model="planta.descricao" 
                    rows="4"
                    class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm lg:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all resize-none"
                    placeholder="Breve descrição da planta e sua finalidade..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Card Upload de Imagem -->
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 lg:px-8 py-6">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg lg:text-xl font-bold text-white">Imagem da Planta</h2>
                    <p class="text-purple-100 text-sm">Faça upload da imagem base para adicionar marcadores</p>
                  </div>
                </div>
              </div>
              
              <!-- Upload Area ou Preview -->
              <div class="p-6 lg:p-8">
                <!-- ⭐ ÁREA DE UPLOAD RESPONSIVA -->
                <div v-if="!planta.imageUrl" class="space-y-4">
                  <div 
                    class="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer"
                    @click="$refs.fileInput?.click()"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div class="space-y-4">
                      <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="text-base lg:text-lg font-medium text-slate-900">
                          Clique para fazer upload ou arraste a imagem
                        </p>
                        <p class="text-sm text-slate-500 mt-1">
                          PNG, JPG, GIF até 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <input 
                    ref="fileInput"
                    type="file" 
                    accept="image/*" 
                    @change="handleImageUpload" 
                    class="hidden"
                  />
                  
                  <div v-if="errors.imagem" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p class="text-red-600 text-sm flex items-center justify-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                      {{ errors.imagem }}
                    </p>
                  </div>
                </div>
                
                <!-- ⭐ PREVIEW RESPONSIVO -->
                <div v-else class="space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-slate-700">Imagem carregada com sucesso</span>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                      <button 
                        @click="$refs.fileInput?.click()" 
                        type="button" 
                        class="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-xl hover:bg-blue-100 transition-all duration-200 font-medium flex items-center"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                        Alterar
                      </button>
                      
                      <button 
                        @click="removeImage" 
                        type="button" 
                        class="px-4 py-2 bg-red-50 text-red-700 text-sm rounded-xl hover:bg-red-100 transition-all duration-200 font-medium flex items-center"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ⭐ COLUNA 2: PREVIEW DA IMAGEM -->
          <div class="space-y-8">
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div class="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 lg:px-8 py-6">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg lg:text-xl font-bold text-white">Preview da Planta</h2>
                    <p class="text-teal-100 text-sm">Visualização da imagem carregada</p>
                  </div>
                </div>
              </div>
              
              <!-- ⭐ CONTAINER DE PREVIEW TOTALMENTE RESPONSIVO -->
              <div class="p-6 lg:p-8">
                <div v-if="planta.imageUrl" class="space-y-4">
                  <!-- ⭐ CONTAINER RESPONSIVO PARA IMAGEM -->
                  <div class="relative w-full">
                    <div class="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg">
                      <div class="relative w-full" ref="imageContainer">
                        <img 
                          :src="planta.imageUrl" 
                          :alt="planta.titulo" 
                          class="w-full h-auto max-h-[60vh] object-contain"
                          style="display: block;"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Informações da Imagem -->
                  <div class="bg-slate-50 rounded-xl p-4">
                    <div class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {{ planta.imageUrl ? 'Imagem carregada' : 'Sem imagem' }}
                    </div>
                  </div>
                </div>
                
                <!-- Estado Vazio -->
                <div v-else class="text-center py-12">
                  <div class="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-slate-600 mb-2">Nenhuma imagem carregada</h3>
                  <p class="text-slate-500 text-sm">Faça upload de uma imagem para visualizar o preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⭐ BOTÕES DE AÇÃO RESPONSIVOS -->
        <div class="mt-8 pt-8 bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-6 lg:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Informações de Status -->
            <div class="flex items-center text-sm text-slate-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ planta.imageUrl ? 'Imagem carregada' : 'Sem imagem' }}
            </div>
            
            <!-- Botões de Ação -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                type="button" 
                class="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-white hover:shadow-sm transition-all duration-200 font-medium"
                @click="$router.push('/plantainterativa')"
                :disabled="loading"
              >
                Cancelar
              </button>
              <button
                type="button" 
                @click="salvarPlanta"
                :disabled="loading || !planta.titulo || !planta.imageUrl"
                class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </span>
                <span v-else>
                  {{ editMode ? 'Atualizar Planta' : 'Criar Planta' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/utils/api';

const router = useRouter();

// Estados
const loading = ref(false);
const editMode = ref(false);

// Dados da planta
const planta = reactive({
  id: null,
  titulo: '',
  descricao: '',
  imageUrl: null,
  marcadores: []
});

// Erros de validação
const errors = reactive({
  titulo: '',
  descricao: '',
  imagem: ''
});

// Validação
const validarFormulario = () => {
  errors.titulo = '';
  errors.descricao = '';
  errors.imagem = '';
  
  let valid = true;
  
  if (!planta.titulo.trim()) {
    errors.titulo = 'O título é obrigatório';
    valid = false;
  }
  
  if (!planta.imageUrl) {
    errors.imagem = 'Uma imagem é obrigatória';
    valid = false;
  }
  
  return valid;
};

// Upload de imagem
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validar tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    errors.imagem = 'Apenas arquivos JPG, PNG e GIF são permitidos';
    return;
  }

  // Validar tamanho (10MB)
  if (file.size > 10 * 1024 * 1024) {
    errors.imagem = 'O arquivo deve ter no máximo 10MB';
    return;
  }

  planta.imagemFile = file;

  // Preview local
  const reader = new FileReader();
  reader.onload = (e) => {
    planta.imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);

  errors.imagem = '';
};

// Drag and drop
const handleDrop = (event) => {
  console.log('🎯 [NOVAPLANTA] Arquivo arrastado e solto');
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    console.log('📁 [NOVAPLANTA] Processando arquivo via drag&drop:', file.name);
    
    // Simular evento de change
    const fakeEvent = {
      target: {
        files: [file]
      }
    };
    handleImageUpload(fakeEvent);
  }
};

// Remover imagem
const removeImage = () => {
  console.log('🗑️ [NOVAPLANTA] Removendo imagem atual');
  
  planta.imageUrl = null;
  errors.imagem = '';
  
  // Limpar input file
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = '';
  }
  
  console.log('✅ [NOVAPLANTA] Imagem removida com sucesso');
};

// Salvar planta
const salvarPlanta = async () => {
  if (!validarFormulario()) return;

  try {
    loading.value = true;

    const formData = new FormData();
    formData.append('titulo', planta.titulo.trim());
    formData.append('descricao', planta.descricao.trim());
    // Supondo que você salvou o arquivo em planta.imagemFile no handleImageUpload
    if (planta.imagemFile) {
      formData.append('imagem', planta.imagemFile);
    }

    let response;
    if (editMode.value) {
      response = await api.put(`/plantas/${planta.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await api.post('/plantas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    router.push('/plantainterativa');
  } catch (error) {
    alert('Erro ao salvar planta: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  console.log('🚀 [NOVAPLANTA] Componente Nova Planta montado');
});
</script>

<style scoped>
/* ⭐ RESPONSIVIDADE TOTAL PARA DESKTOP */
@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
  
  .xl\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ⭐ AJUSTES PARA ZOOM */
@media (min-width: 1280px) {
  .max-w-6xl {
    max-width: 80rem;
  }
}

@media (min-width: 1536px) {
  .max-w-6xl {
    max-width: 90rem;
  }
}

/* ⭐ IMAGENS RESPONSIVAS */
img {
  max-width: 100%;
  height: auto;
}

/* ⭐ GLASSMORPHISM */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* ⭐ CUSTOM SCROLLBAR */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>