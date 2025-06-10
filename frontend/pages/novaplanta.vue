<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
    <!-- Header Moderno -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button 
              @click="router.push('/plantainterativa')" 
              class="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">
                {{ editMode ? 'Editar Planta' : 'Nova Planta Interativa' }}
              </h1>
              <p class="text-slate-600 text-sm">
                {{ editMode ? 'Modifique os dados da planta' : 'Crie uma nova planta com marcadores interativos' }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
              Beta
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Card Principal -->
      <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <!-- Seção: Informações Básicas -->
        <div class="p-8 border-b border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-slate-800">Informações da Planta</h2>
              <p class="text-slate-600 text-sm">Dados básicos e identificação</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Título -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Título da Planta <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="planta.titulo"
                type="text" 
                class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all"
                :class="{ 'border-red-500 ring-red-500': errors.titulo }"
                placeholder="Ex: Planta Baixa - Andar Térreo"
              />
              <p v-if="errors.titulo" class="mt-1 text-sm text-red-600">{{ errors.titulo }}</p>
            </div>

            <!-- Descrição -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
              <textarea 
                v-model="planta.descricao"
                rows="3"
                class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all resize-none"
                placeholder="Breve descrição da planta e sua finalidade..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Seção: Upload de Imagem -->
        <div class="p-8 border-b border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-slate-800">Imagem da Planta</h2>
              <p class="text-slate-600 text-sm">Faça upload da imagem para adicionar marcadores</p>
            </div>
          </div>

          <div v-if="!planta.imageUrl" class="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300">
            <label for="file-upload" class="cursor-pointer block">
              <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <span class="text-lg font-medium text-slate-700 block mb-2">
                Clique para selecionar uma imagem
              </span>
              <span class="text-emerald-600 font-medium flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Selecionar Imagem
              </span>
              <input 
                id="file-upload" 
                ref="fileInput"
                type="file" 
                accept="image/*" 
                class="sr-only" 
                @change="handleImageUpload"
              />
            </label>
            
            <p class="text-slate-500 text-sm mt-4 max-w-md mx-auto">
              Formatos suportados: PNG, JPG, GIF. Tamanho máximo: 10MB
            </p>
            <p v-if="errors.imagem" class="mt-2 text-sm text-red-600">{{ errors.imagem }}</p>
          </div>

          <!-- Preview da Imagem -->
          <div v-else class="space-y-4">
            <!-- Controles da Imagem -->
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-slate-700">Imagem carregada com sucesso</span>
              </div>
              
              <div class="flex items-center space-x-3">
                <!-- Botão Remover Imagem -->
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

            <!-- Container da Imagem com Marcadores RESPONSIVO -->
            <div 
              ref="imageContainer"
              class="relative bg-slate-100 rounded-2xl overflow-hidden shadow-lg border-2 border-transparent transition-all duration-300 w-full"
              :class="{ 'border-emerald-400 shadow-emerald-200': modoAdicao }"
            >
              <!-- ✅ IMAGEM RESPONSIVA CORRIGIDA -->
              <div class="relative w-full">
                <img 
                  :src="planta.imageUrl" 
                  alt="Planta"
                  class="w-full h-auto max-w-full object-contain max-h-[60vh] sm:max-h-[70vh] lg:max-h-[80vh]"
                  :class="{ 'cursor-crosshair': modoAdicao }"
                  @click="modoAdicao && addMarker($event)"
                  draggable="false"
                  style="display: block; margin: 0 auto;"
                />
                
                <!-- ✅ MARCADORES RESPONSIVOS -->
                <div 
                  v-for="(marcador, index) in planta.marcadores" 
                  :key="index"
                  class="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200 z-10 flex items-center justify-center"
                  :style="{ 
                    backgroundColor: marcador.cor, 
                    left: `${marcador.posicaoX}%`, 
                    top: `${marcador.posicaoY}%` 
                  }"
                  @click="openMarkerEditModal(index)"
                  :title="marcador.texto"
                >
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>

                <!-- Overlay quando em modo de adição RESPONSIVO -->
                <div 
                  v-if="modoAdicao" 
                  class="absolute inset-0 bg-emerald-500/10 flex items-center justify-center"
                >
                  <div class="bg-white/90 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 shadow-lg mx-4">
                    <p class="text-xs sm:text-sm font-medium text-emerald-700 text-center">
                      <span class="hidden sm:inline">Clique na imagem para adicionar um marcador</span>
                      <span class="sm:hidden">Clique para marcar</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lista de Marcadores -->
            <div v-if="planta.marcadores.length > 0" class="mt-6">
              <h3 class="text-lg font-semibold text-slate-800 mb-4">Marcadores Adicionados</h3>
              <div class="space-y-3">
                <div 
                  v-for="(marcador, index) in planta.marcadores" 
                  :key="index"
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-4 h-4 rounded-full border border-white shadow-sm"
                      :style="{ backgroundColor: marcador.cor }"
                    ></div>
                    <div>
                      <p class="font-medium text-slate-800">{{ marcador.texto }}</p>
                      <p v-if="marcador.url" class="text-sm text-slate-600">
                        <a :href="marcador.url" target="_blank" class="text-blue-600 hover:underline">
                          {{ marcador.url }}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="openMarkerEditModal(index)"
                      class="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar marcador"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button 
                      @click="removeMarcador(index)"
                      class="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir marcador"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="p-6 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3">
          <button 
            @click="router.push('/plantainterativa')" 
            type="button"
            class="px-6 py-3 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="salvarPlanta"
            type="button"
            class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
          >
            {{ editMode ? 'Atualizar Planta' : 'Criar Planta' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para Edição de Marcador -->
    <div 
      v-if="marcadorModal.visible"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      @click="closeMarcadorModal"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        @click.stop
      >
        <!-- Header do Modal -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
          <h3 class="text-lg font-bold text-slate-900">
            {{ marcadorModal.isEdit ? 'Editar Marcador' : 'Novo Marcador' }}
          </h3>
        </div>
        
        <!-- Formulário -->
        <div class="p-6 space-y-6">
          <!-- Campo Texto -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Texto do Marcador *
            </label>
            <input 
              v-model="marcadorModal.texto"
              type="text" 
              placeholder="Digite o texto do marcador..."
              class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              :class="{ 'border-red-300 focus:ring-red-500': marcadorModal.errors.texto }"
            />
            <p v-if="marcadorModal.errors.texto" class="text-red-600 text-sm mt-1">
              {{ marcadorModal.errors.texto }}
            </p>
          </div>
          
          <!-- Campo URL -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Link (opcional)
            </label>
            <input 
              v-model="marcadorModal.url"
              type="text" 
              placeholder="https://exemplo.com ou email@exemplo.com"
              class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <!-- Seleção de Cor -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">
              Cor do Marcador
            </label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="cor in coresMarcadores" 
                :key="cor.value"
                @click="marcadorModal.cor = cor.value"
                class="w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110"
                :style="{ backgroundColor: cor.value }"
                :class="marcadorModal.cor === cor.value ? 'border-slate-400 ring-2 ring-slate-300' : 'border-slate-200'"
                :title="cor.name"
              ></button>
            </div>
          </div>
        </div>
        
        <!-- Ações do Modal -->
        <div class="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div class="flex space-x-3">
            <button 
              @click="closeMarcadorModal"
              class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            
            <button 
              @click="saveMarcador"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              {{ marcadorModal.isEdit ? 'Atualizar' : 'Adicionar' }}
            </button>
          </div>
          
          <button 
            v-if="marcadorModal.isEdit"
            @click="deleteMarcador"
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Estados
const editMode = ref(false);
const plantaId = ref(null);
const fileInput = ref(null);
const imageContainer = ref(null);
const modoAdicao = ref(false);

// Dados da planta
const planta = reactive({
  id: '',
  titulo: '',
  descricao: '',
  imageUrl: '',
  marcadores: []
});

// Erros
const errors = reactive({
  titulo: '',
  imagem: ''
});

// Modal de marcador
const marcadorModal = reactive({
  visible: false,
  isEdit: false,
  index: -1,
  texto: '',
  url: '',
  cor: '#ef4444',
  posicaoX: 0,
  posicaoY: 0,
  errors: { texto: '' }
});

// Cores para marcadores
const coresMarcadores = [
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Laranja', value: '#f97316' },
  { name: 'Amarelo', value: '#eab308' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Cinza', value: '#6b7280' }
];

// Funções
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 10 * 1024 * 1024) {
    errors.imagem = 'A imagem deve ter menos de 10MB';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    planta.imageUrl = e.target.result;
    errors.imagem = '';
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  planta.imageUrl = '';
  planta.marcadores = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// ✅ FUNÇÃO PARA ADICIONAR MARCADOR
const addMarker = (event) => {
  if (!modoAdicao.value || !imageContainer.value) return;
  
  // Obter as dimensões e posição da imagem
  const imgRect = imageContainer.value.querySelector('img').getBoundingClientRect();
  
  // Calcular posição relativa à imagem (0-100%)
  const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
  const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;
  
  // Garantir que os valores estejam dentro dos limites
  const posX = Math.max(0, Math.min(100, x));
  const posY = Math.max(0, Math.min(100, y));
  
  // Abrir modal de marcador
  marcadorModal.isEdit = false;
  marcadorModal.index = -1;
  marcadorModal.texto = '';
  marcadorModal.url = '';
  marcadorModal.cor = '#ef4444';
  marcadorModal.posicaoX = posX;
  marcadorModal.posicaoY = posY;
  marcadorModal.errors.texto = '';
  marcadorModal.visible = true;
  
  // Desativar modo de adição temporariamente
  modoAdicao.value = false;
};

// ✅ FUNÇÃO PARA EDITAR MARCADOR
const openMarkerEditModal = (index) => {
  const marcador = planta.marcadores[index];
  
  marcadorModal.isEdit = true;
  marcadorModal.index = index;
  marcadorModal.texto = marcador.texto;
  marcadorModal.url = marcador.url || '';
  marcadorModal.cor = marcador.cor;
  marcadorModal.posicaoX = marcador.posicaoX;
  marcadorModal.posicaoY = marcador.posicaoY;
  marcadorModal.errors.texto = '';
  marcadorModal.visible = true;
};

// ✅ FUNÇÃO PARA FECHAR MODAL
const closeMarcadorModal = () => {
  marcadorModal.visible = false;
  marcadorModal.errors.texto = '';
  
  // Reativar modo de adição se estava ativo antes
  if (!marcadorModal.isEdit) {
    modoAdicao.value = true;
  }
};

// ✅ FUNÇÃO PARA SALVAR MARCADOR
const saveMarcador = () => {
  marcadorModal.errors.texto = '';
  
  if (!marcadorModal.texto.trim()) {
    marcadorModal.errors.texto = 'O texto do marcador é obrigatório';
    return;
  }
  
  const marcadorData = {
    texto: marcadorModal.texto.trim(),
    url: marcadorModal.url.trim(),
    cor: marcadorModal.cor,
    posicaoX: marcadorModal.posicaoX,
    posicaoY: marcadorModal.posicaoY
  };
  
  if (marcadorModal.isEdit) {
    // Atualizar marcador existente
    planta.marcadores[marcadorModal.index] = marcadorData;
  } else {
    // Adicionar novo marcador
    planta.marcadores.push(marcadorData);
  }
  
  closeMarcadorModal();
};

// ✅ FUNÇÃO PARA EXCLUIR MARCADOR
const deleteMarcador = () => {
  if (confirm('Tem certeza que deseja excluir este marcador?')) {
    planta.marcadores.splice(marcadorModal.index, 1);
    closeMarcadorModal();
  }
};

// ✅ SALVAR PLANTA VIA API (mantendo toda lógica da versão antiga)
const salvarPlanta = async () => {
  // Validar (mantendo validação da versão antiga)
  errors.titulo = '';
  errors.imagem = '';
  
  if (!planta.titulo.trim()) {
    errors.titulo = 'O título da planta é obrigatório';
    return;
  }
  
  if (!planta.imageUrl) {
    errors.imagem = 'É necessário adicionar uma imagem para a planta';
    return;
  }
  
  try {
    // ✅ PREPARAR DADOS (mantendo estrutura da versão antiga)
    const formData = new FormData();
    formData.append('titulo', planta.titulo.trim());
    formData.append('descricao', planta.descricao.trim());
    
    // ✅ CONVERTER imageUrl para File (se necessário)
    if (planta.imageUrl && planta.imageUrl.startsWith('data:')) {
      const response = await fetch(planta.imageUrl);
      const blob = await response.blob();
      formData.append('image', blob, 'planta.jpg');
    }
    
    // ✅ CHAMAR API
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.apiBase}/api/plantas`, {
      method: editMode.value ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      },
      body: formData
    });
    
    if (response.success) {
      // ✅ SALVAR MARCADORES SE EXISTIREM
      if (planta.marcadores.length > 0) {
        for (const marcador of planta.marcadores) {
          await $fetch(`${config.public.apiBase}/api/plantas/${response.data.id}/marcadores`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json'
            },
            body: {
              texto: marcador.texto,
              url: marcador.url || '',
              cor: marcador.cor || '#ef4444',
              posicaoX: marcador.posicaoX,
              posicaoY: marcador.posicaoY
            }
          });
        }
      }
      
      // ✅ REDIRECIONAR (mantendo comportamento da versão antiga)
      router.push('/plantainterativa');
    }
    
  } catch (error) {
    console.error('Erro ao salvar planta:', error);
    alert('Ocorreu um erro ao salvar a planta. Por favor, tente novamente.');
  }
};

onMounted(() => {
  if (route.query.id) {
    editMode.value = true;
    plantaId.value = parseInt(route.query.id);
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
</style>