<!-- filepath: d:\PROJETO\frontend\pages\doc2.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Tela de carregamento moderna -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div class="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
          </div>
          <p class="text-slate-600 font-medium">Carregando documento...</p>
        </div>
      </div>
    </div>
    
    <div v-else>
      <!-- Header com gradiente -->
      <div class="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Título com ícone -->
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {{ isEditing ? 'Editar Documento' : 'Novo Documento' }}
                </h1>
                <p class="text-sm text-slate-500 mt-0.5">
                  {{ isEditing ? 'Modificar informações do documento' : 'Criar um novo documento técnico' }}
                </p>
              </div>
            </div>

            <!-- Botão voltar -->
            <NuxtLink 
              to="/dashdoc" 
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Container principal -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Alerta moderno -->
        <div v-if="showAlert" 
             class="mb-8 transform transition-all duration-300 ease-in-out"
             :class="[
               'rounded-2xl border backdrop-blur-sm shadow-lg',
               alertType === 'success' 
                 ? 'bg-green-50/80 border-green-200 text-green-800' 
                 : 'bg-red-50/80 border-red-200 text-red-800'
             ]">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  alertType === 'success' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                ]">
                  <svg v-if="alertType === 'success'" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <h3 class="text-sm font-semibold">
                  {{ alertType === 'success' ? 'Sucesso!' : 'Erro!' }}
                </h3>
                <p class="text-sm mt-1">{{ alertMessage }}</p>
              </div>
              <button 
                @click="showAlert = false" 
                class="ml-auto flex-shrink-0 rounded-lg p-1.5 hover:bg-black/5 focus:outline-none transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Formulário moderno -->
        <form @submit.prevent="salvarDocumento" class="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          <!-- Header do formulário -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-slate-200/60">
            <h2 class="text-xl font-semibold text-slate-900">Informações do Documento</h2>
            <p class="text-sm text-slate-600 mt-1">Preencha todos os campos obrigatórios marcados com *</p>
          </div>

          <div class="p-8 space-y-8">
            
            <!-- Grid principal -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <!-- Coluna esquerda -->
              <div class="space-y-6">
                
                <!-- Título do documento -->
                <div class="space-y-2">
                  <label class="flex items-center text-sm font-semibold text-slate-700">
                    <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Título do documento *
                  </label>
                  <input 
                    v-model="documento.titulo" 
                    type="text" 
                    class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                    placeholder="Ex: Manual do Equipamento X-1001"
                    required
                  />
                  <p v-if="errors.titulo" class="text-sm text-red-600 mt-1">{{ errors.titulo }}</p>
                </div>

                <!-- Tipo de documento -->
                <div class="space-y-2">
                  <label class="flex items-center text-sm font-semibold text-slate-700">
                    <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                    </svg>
                    Tipo de documento
                  </label>
                  <select 
                    v-model="documento.tipo" 
                    class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Manual">📖 Manual</option>
                    <option value="Especificação">📋 Especificação</option>
                    <option value="Desenho">📐 Desenho</option>
                    <option value="Procedimento">📝 Procedimento</option>
                    <option value="Relatório">📊 Relatório</option>
                    <option value="Outro">📄 Outro</option>
                  </select>
                </div>

                <!-- Equipamento -->
                <div class="space-y-2">
                  <label class="flex items-center text-sm font-semibold text-slate-700">
                    <svg class="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Equipamento relacionado *
                  </label>
                  <select 
                    v-model="documento.equipamentoId" 
                    class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Selecione o equipamento</option>
                    <option v-for="equipamento in equipamentos" :key="equipamento.id" :value="equipamento.id">
                      {{ equipamento.tag ? `${equipamento.tag} - ${equipamento.nome}` : equipamento.nome }}
                    </option>
                  </select>
                  <p class="text-xs text-slate-500">Selecione o equipamento ao qual este documento está relacionado</p>
                  <p v-if="errors.equipamentoId" class="text-sm text-red-600 mt-1">{{ errors.equipamentoId }}</p>
                </div>

              </div>

              <!-- Coluna direita -->
              <div class="space-y-6">
                
                <!-- Versão e Revisão -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="flex items-center text-sm font-semibold text-slate-700">
                      <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Versão
                    </label>
                    <input 
                      v-model="documento.versao" 
                      type="text" 
                      class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                      placeholder="1.0"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="flex items-center text-sm font-semibold text-slate-700">
                      <svg class="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Revisão
                    </label>
                    <input 
                      v-model="documento.revisao" 
                      type="text" 
                      class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <!-- Upload de arquivo moderno -->
                <div class="space-y-2">
                  <label class="flex items-center text-sm font-semibold text-slate-700">
                    <svg class="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Arquivo PDF *
                  </label>
                  
                  <div class="relative">
                    <input 
                      type="file" 
                      ref="pdfFileInput"
                      accept="application/pdf"
                      @change="handlePdfFileChange" 
                      class="hidden" 
                    />
                    
                    <!-- Área de drop moderna -->
                    <div 
                      @click="$refs.pdfFileInput.click()"
                      class="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 group"
                    >
                      <div class="flex flex-col items-center space-y-3">
                        <div class="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p class="text-sm font-medium text-slate-900">
                            {{ pdfFileName || 'Clique para selecionar o arquivo PDF' }}
                          </p>
                          <p class="text-xs text-slate-500 mt-1">
                            Tamanho máximo: 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Botão remover arquivo -->
                    <button 
                      v-if="pdfFileName" 
                      @click.stop="pdfFileName = null; pdfFile = null" 
                      type="button" 
                      class="absolute top-2 right-2 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p v-if="errors.pdfFile" class="text-sm text-red-600">{{ errors.pdfFile }}</p>
                </div>

              </div>
            </div>

            <!-- Descrição (full width) -->
            <div class="space-y-2">
              <label class="flex items-center text-sm font-semibold text-slate-700">
                <svg class="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Descrição
              </label>
              <textarea
                v-model="documento.descricao"
                rows="4"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 resize-none"
                placeholder="Descrição detalhada do documento, incluindo sua finalidade, conteúdo principal e informações relevantes..."
              ></textarea>
            </div>

          </div>
          
          <!-- Footer com botões -->
          <div class="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-t border-slate-200/60">
            <div class="flex justify-end space-x-4">
              <NuxtLink 
                to="/dashdoc" 
                class="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancelar
              </NuxtLink>
              
              <button 
                type="submit" 
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                :disabled="saving"
              >
                <svg v-if="saving" class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ isEditing ? 'Atualizar' : 'Salvar' }} Documento
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '~/utils/api';

definePageMeta({
  layout: 'default'
});

const router = useRouter();
const route = useRoute();

// Estados
const loading = ref(true);
const saving = ref(false);
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('success');
const isEditing = ref(false);

// Referência para upload de arquivo
const pdfFileInput = ref(null);
const pdfFile = ref(null);
const pdfFileName = ref(null);

// Lista de equipamentos
const equipamentos = ref([]);

// Dados do documento
const documento = reactive({
  id: null,
  titulo: '',
  tipo: '',
  equipamentoId: '',
  versao: '1.0',
  revisao: '0',
  descricao: ''
});

// Erros de validação
const errors = reactive({
  titulo: '',
  equipamentoId: '',
  pdfFile: ''
});

// Função para limpar erros
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
};

// Função para lidar com upload de PDF
const handlePdfFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf') {
      errors.pdfFile = 'O arquivo deve ser um PDF';
      pdfFile.value = null;
      pdfFileName.value = null;
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      errors.pdfFile = 'O arquivo não pode ser maior que 10MB';
      pdfFile.value = null;
      pdfFileName.value = null;
      return;
    }

    errors.pdfFile = '';
    pdfFile.value = file;
    pdfFileName.value = file.name;
  }
};

// Validação do formulário
const validateForm = () => {
  clearErrors();
  let isValid = true;

  if (!documento.titulo.trim()) {
    errors.titulo = 'O título é obrigatório';
    isValid = false;
  }

  if (!documento.equipamentoId) {
    errors.equipamentoId = 'Selecione um equipamento';
    isValid = false;
  }

  if (!pdfFile.value && !isEditing.value) {
    errors.pdfFile = 'O arquivo PDF é obrigatório';
    isValid = false;
  }

  return isValid;
};

// Carregar equipamentos
const carregarEquipamentos = async () => {
  try {
    const response = await api.get('/equipamentos');
    equipamentos.value = response?.data || response || [];
  } catch (error) {
    console.error('❌ Erro ao carregar equipamentos:', error);
    mostrarAlerta('Erro ao carregar equipamentos', 'error');
  }
};

// Carregar documento para edição
const carregarDocumento = async (id) => {
  try {
    const response = await api.get(`/documentos/${id}`);
    const doc = response?.data || response;
    
    if (doc) {
      documento.id = doc.id;
      documento.titulo = doc.titulo || '';
      documento.tipo = doc.tipo || '';
      documento.equipamentoId = doc.equipamentoId || '';
      documento.versao = doc.versao || '1.0';
      documento.revisao = doc.revisao || '0';
      documento.descricao = doc.descricao || '';
    }
  } catch (error) {
    console.error('❌ Erro ao carregar documento:', error);
    mostrarAlerta('Erro ao carregar documento', 'error');
    setTimeout(() => router.push('/dashdoc'), 3000);
  }
};

// Função de salvar (mantém a lógica original)
const salvarDocumento = async () => {
  if (!validateForm()) return;
  
  saving.value = true;
  
  try {
    let resultado;
    
    if (pdfFile.value) {
      console.log('📤 Salvando COM arquivo via Express...');
      
      const formData = new FormData();
      formData.append('titulo', documento.titulo.trim());
      formData.append('tipo', documento.tipo || 'manual');
      formData.append('descricao', documento.descricao.trim());
      formData.append('equipamentoId', documento.equipamentoId.toString());
      formData.append('versao', documento.versao || '1');
      formData.append('revisao', documento.revisao || '0');
      formData.append('arquivo', pdfFile.value);
      
      if (isEditing.value) {
        resultado = await api.put(`/documentos/${documento.id}`, formData);
      } else {
        resultado = await api.post('/documentos/upload', formData);
      }
    } else {
      console.log('📄 Salvando SEM arquivo via Express...');
      
      const dadosJson = {
        titulo: documento.titulo.trim(),
        tipo: documento.tipo || 'manual',
        equipamentoId: parseInt(documento.equipamentoId),
        versao: documento.versao || '1',
        revisao: documento.revisao || '0',
        descricao: documento.descricao.trim()
      };
      
      if (isEditing.value) {
        resultado = await api.put(`/documentos/${documento.id}`, dadosJson);
      } else {
        resultado = await api.post('/documentos', dadosJson);
      }
    }
    
    console.log('✅ Documento salvo:', resultado);
    mostrarAlerta(
      isEditing.value ? 'Documento atualizado com sucesso!' : 'Documento criado com sucesso!', 
      'success'
    );
    
    setTimeout(() => {
      router.push('/dashdoc');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro ao salvar documento:', error);
    
    let errorMessage = 'Erro desconhecido';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      try {
        const parsed = JSON.parse(error.message);
        errorMessage = parsed.message || parsed.error || error.message;
      } catch {
        errorMessage = error.message;
      }
    }
    
    mostrarAlerta(`Erro ao salvar documento: ${errorMessage}`, 'error');
  } finally {
    saving.value = false;
  }
};

// Função para exibir alerta
const mostrarAlerta = (mensagem, tipo = 'success') => {
  alertMessage.value = mensagem;
  alertType.value = tipo;
  showAlert.value = true;
  
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};

// Inicialização
onMounted(async () => {
  await carregarEquipamentos();
  
  if (route.query.id) {
    isEditing.value = true;
    await carregarDocumento(route.query.id);
  }
  
  loading.value = false;
});
</script>