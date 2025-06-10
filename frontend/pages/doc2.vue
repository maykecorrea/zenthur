<!-- filepath: d:\PROJETO\frontend\pages\doc2.vue -->
<template>
  <div class="p-4 sm:p-6 bg-gray-50 min-h-screen">
    <!-- Tela de carregamento -->
    <div v-if="loading" class="flex justify-center my-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
    
    <div v-else>
      <!-- Alerta para feedback ao usuário -->
      <div v-if="showAlert" 
           :class="['p-4 mb-4 rounded-md', 
                   alertType === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 
                   'bg-red-100 border border-red-400 text-red-700']">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg v-if="alertType === 'success'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm">{{ alertMessage }}</p>
          </div>
          <div class="ml-auto pl-3">
            <button @click="showAlert = false" class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Cabeçalho -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
            {{ isEditing ? 'Editar Documento' : 'Criar Novo Documento' }}
          </h1>
        </div>
        <div class="flex space-x-2">
          <NuxtLink to="/dashdoc" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </NuxtLink>
        </div>
      </div>

      <!-- Formulário de documento -->
      <form @submit.prevent="salvarDocumento" class="bg-white p-6 rounded-lg shadow-sm mb-8">
        <!-- Título do documento -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1 required">Título do documento</label>
          <input 
            v-model="documento.titulo" 
            type="text" 
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Manual do Equipamento X-1001"
            required>
        </div>

        <!-- Tipo de documento -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
          <select 
            v-model="documento.tipo" 
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione o tipo</option>
            <option value="Manual">Manual</option>
            <option value="Especificação">Especificação</option>
            <option value="Desenho">Desenho</option>
            <option value="Procedimento">Procedimento</option>
            <option value="Relatório">Relatório</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <!-- Equipamento (OBRIGATÓRIO) -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1 required">Equipamento relacionado</label>
          <select 
            v-model="documento.equipamentoId" 
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required>
            <option value="">Selecione o equipamento</option>
            <option v-for="equipamento in equipamentos" :key="equipamento.id" :value="equipamento.id">
              {{ equipamento.tag ? `${equipamento.tag} - ${equipamento.nome}` : equipamento.nome }}
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-1">Selecione o equipamento ao qual este documento está relacionado</p>
        </div>

        <!-- Versão e Revisão -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Versão</label>
            <input 
              v-model="documento.versao" 
              type="text" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1.0">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Revisão</label>
            <input 
              v-model="documento.revisao" 
              type="text" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0">
          </div>
        </div>
        
        <!-- Seleção de arquivo PDF -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1 required">Arquivo PDF</label>
          <div class="flex items-center">
            <input 
              type="file" 
              ref="pdfFileInput"
              accept="application/pdf"
              @change="handlePdfFileChange" 
              class="hidden" 
            />
            <button 
              type="button"
              @click="$refs.pdfFileInput.click()"
              class="bg-blue-50 text-blue-700 px-4 py-2 border border-blue-300 rounded-md hover:bg-blue-100 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {{ pdfFileName || 'Selecionar arquivo PDF' }}
            </button>
            <button 
              v-if="pdfFileName" 
              @click="pdfFileName = null; pdfFile = null" 
              type="button" 
              class="ml-2 text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p v-if="errors.pdfFile" class="mt-1 text-sm text-red-600">{{ errors.pdfFile }}</p>
        </div>

        <!-- Descrição -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            v-model="documento.descricao"
            rows="4"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição detalhada do documento"
          ></textarea>
        </div>
      
        <!-- Botões -->
        <div class="mt-8 flex justify-end space-x-3">
          <NuxtLink 
            to="/dashdoc" 
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
            Cancelar
          </NuxtLink>
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            :disabled="saving">
            <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isEditing ? 'Atualizar' : 'Salvar' }} Documento
          </button>
        </div>
      </form>
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

// ⭐ FUNÇÃO CORRIGIDA - ENVIAR CAMPO 'titulo'
const salvarDocumento = async () => {
  if (!validateForm()) return;
  
  saving.value = true;
  
  try {
    let resultado;
    
    if (pdfFile.value) {
      // ===== COM ARQUIVO: USA /upload (Express) =====
      console.log('📤 Salvando COM arquivo via Express...');
      
      const formData = new FormData();
      formData.append('titulo', documento.titulo.trim()); // ⭐ CORRIGIDO: 'titulo' ao invés de 'nome'
      formData.append('tipo', documento.tipo || 'manual'); // ⭐ ADICIONAR tipo
      formData.append('descricao', documento.descricao.trim());
      formData.append('equipamentoId', documento.equipamentoId.toString());
      formData.append('versao', documento.versao || '1'); // ⭐ ADICIONAR versao
      formData.append('revisao', documento.revisao || '0'); // ⭐ ADICIONAR revisao
      formData.append('arquivo', pdfFile.value);
      
      if (isEditing.value) {
        resultado = await api.put(`/documentos/${documento.id}`, formData);
      } else {
        resultado = await api.post('/documentos/upload', formData);
      }
    } else {
      // ===== SEM ARQUIVO: USA /documentos (Express) =====
      console.log('📄 Salvando SEM arquivo via Express...');
      
      // ⚠️ PROBLEMA CORRIGIDO: Garantir que os dados estão no formato esperado
      const dadosJson = {
        id: parseInt(documento.id),
        titulo: documento.titulo.trim(),
        nome: documento.titulo.trim(), // Incluir 'nome' também (backend pode usar este campo)
        tipo: documento.tipo || 'Manual',
        type: documento.tipo || 'Manual', // Duplicar em 'type' para compatibilidade
        equipamentoId: parseInt(documento.equipamentoId),
        equipamentoid: parseInt(documento.equipamentoId), // Duplicar em 'equipamentoid'
        versao: documento.versao || '1',
        version: documento.versao || '1', // Duplicar em 'version'
        revisao: documento.revisao || '0',
        revision: documento.revisao || '0', // Duplicar em 'revision'
        descricao: documento.descricao.trim()
      };
      
      console.log('📤 Dados exatos sendo enviados para atualização:', JSON.stringify(dadosJson));
      
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
      // Redirecionamento simples sem parâmetros
      router.push('/dashdoc');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro ao salvar documento:', error);
    
    // ⭐ MELHOR TRATAMENTO DE ERRO
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

// Adicione esta função para diagnóstico e chame antes de salvar
const diagnosticarDocumento = async (id) => {
  try {
    console.log('🔍 Iniciando diagnóstico para documento ID:', id);
    
    // Buscar documento antes da atualização
    const beforeUpdate = await api.get(`/documentos/${id}`);
    console.log('📄 ANTES da atualização:', beforeUpdate);
    
    // Aguardar seu processo de atualização...
    
    // Após atualização, limpar cache e buscar novamente
    await new Promise(r => setTimeout(r, 1000)); // Espera 1s
    
    if (typeof api.clearCache === 'function') {
      api.clearCache();
    }
    
    // Recuperar documento novamente com novo fetch
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiBase}/documentos/${id}?_t=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const afterUpdate = await response.json();
    console.log('📄 APÓS a atualização:', afterUpdate);
    
    // Comparar campos específicos
    console.log('📊 COMPARAÇÃO dos campos principais:');
    console.log('Título: antes=', beforeUpdate.titulo, 'depois=', afterUpdate.titulo);
    console.log('Tipo: antes=', beforeUpdate.tipo, 'depois=', afterUpdate.tipo);
    console.log('Versão: antes=', beforeUpdate.versao, 'depois=', afterUpdate.versao);
    console.log('Revisão: antes=', beforeUpdate.revisao, 'depois=', afterUpdate.revisao);
    
    return {before: beforeUpdate, after: afterUpdate};
  } catch (error) {
    console.error('❌ Erro durante diagnóstico:', error);
    return null;
  }
};

// Função para exibir alerta
const mostrarAlerta = (mensagem, tipo = 'success') => {
  alertMessage.value = mensagem;
  alertType.value = tipo;
  showAlert.value = true;
  
  // Auto-ocultar após 5 segundos
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};

// Inicialização
onMounted(async () => {
  await carregarEquipamentos();
  
  // Verificar se é modo de edição
  if (route.query.id) {
    isEditing.value = true;
    await carregarDocumento(route.query.id);
  }
  
  loading.value = false;
});
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>