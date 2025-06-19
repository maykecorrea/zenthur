<!-- filepath: d:\PROJETO\frontend\pages\equipamento2.vue -->
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useAuth } from '~/composables/useAuth';
import api from '~/utils/api';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { getAuthHeaders } = useAuth();

// Estado para categorias
const categorias = ref([]);
const novaCategoria = ref('');
const showCategoriaModal = ref(false);
const categoriaSaving = ref(false);

// Determinação se está editando ou criando novo
const isEditing = ref(false);
const equipamentoId = ref(null);

// Estado do equipamento
const equipamento = reactive({
  nome: '',
  categoriaId: '',
  tag: '',
  numeroSerie: '',
  fabricante: '',
  modelo: '',
  dataAquisicao: '',
  localizacao: '',
  area: '',
  unidade: '',
  disciplina: '',
  detalhes: ''
});

// Estado da interface
const loading = ref(false);
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('success');

// Carregar categorias ao montar o componente
onMounted(async () => {
  await carregarCategorias();
  
  if (route.query.id) {
    equipamentoId.value = parseInt(route.query.id);
    isEditing.value = true;
    await carregarEquipamento(equipamentoId.value);
  }
});

// Função para validar e formatar data
const validarData = (dataString) => {
  if (!dataString || dataString.trim() === '') {
    return null;
  }
  
  try {
    // Verificar se a data está no formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dataString)) {
      return null;
    }
    
    // Criar objeto Date para validar
    const [ano, mes, dia] = dataString.split('-').map(Number);
    
    // Validar se é uma data válida
    if (ano < 1900 || ano > 2100) {
      return null;
    }
    
    if (mes < 1 || mes > 12) {
      return null;
    }
    
    if (dia < 1 || dia > 31) {
      return null;
    }
    
    // Criar data e verificar se é válida
    const data = new Date(ano, mes - 1, dia);
    if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
      return null;
    }
    
    // Retornar no formato ISO-8601
    return `${dataString}T00:00:00.000Z`;
  } catch (error) {
    console.error('Erro ao validar data:', error);
    return null;
  }
};

// Carregar categorias do backend
const carregarCategorias = async () => {
  try {
    const response = await api.get('/categorias');
    categorias.value = response.data || response;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    mostrarAlerta('Erro ao carregar categorias', 'error');
  }
};

// Cadastrar nova categoria
const cadastrarCategoria = async () => {
  if (!novaCategoria.value.trim()) {
    mostrarAlerta('Nome da categoria é obrigatório', 'error');
    return;
  }
  
  categoriaSaving.value = true;
  
  try {
    const response = await api.post('/categorias', {
      nome: novaCategoria.value.trim()
    });
    
    // Adicionar a nova categoria à lista
    categorias.value.push(response.data || response);
    
    // Selecionar automaticamente a nova categoria
    equipamento.categoriaId = (response.data || response).id;
    
    // Limpar e fechar modal
    novaCategoria.value = '';
    showCategoriaModal.value = false;
    
    mostrarAlerta('Categoria cadastrada com sucesso!', 'success');
  } catch (error) {
    console.error('Erro ao cadastrar categoria:', error);
    mostrarAlerta('Erro ao adicionar categoria', 'error');
  } finally {
    categoriaSaving.value = false;
  }
};

// Exibir alerta
const mostrarAlerta = (mensagem, tipo = 'success') => {
  alertMessage.value = mensagem;
  alertType.value = tipo;
  showAlert.value = true;
  
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};

// Carregar dados do equipamento para edição
const carregarEquipamento = async (id) => {
  loading.value = true;
  
  try {
    const response = await api.get(`/equipamentos/${id}`);
    
    const equipamentoData = response.data || response;
    
    // Preencher formulário
    equipamento.nome = equipamentoData.nome || '';
    equipamento.categoriaId = equipamentoData.categoriaId || '';
    equipamento.tag = equipamentoData.tag || '';
    equipamento.numeroSerie = equipamentoData.numeroSerie || '';
    equipamento.fabricante = equipamentoData.fabricante || '';
    equipamento.modelo = equipamentoData.modelo || '';
    equipamento.area = equipamentoData.area || '';
    equipamento.localizacao = equipamentoData.localizacao || '';
    equipamento.unidade = equipamentoData.unidade || '';
    equipamento.disciplina = equipamentoData.disciplina || '';
    equipamento.detalhes = equipamentoData.detalhes || '';
    
    // Tratar data de aquisição
    if (equipamentoData.dataAquisicao) {
      try {
        const data = new Date(equipamentoData.dataAquisicao);
        if (!isNaN(data.getTime())) {
          // Formatar para YYYY-MM-DD
          equipamento.dataAquisicao = data.toISOString().split('T')[0];
        } else {
          equipamento.dataAquisicao = '';
        }
      } catch (error) {
        console.error('Erro ao processar data:', error);
        equipamento.dataAquisicao = '';
      }
    } else {
      equipamento.dataAquisicao = '';
    }
  } catch (error) {
    console.error('Erro ao carregar equipamento:', error);
    mostrarAlerta('Erro ao carregar dados do equipamento', 'error');
  } finally {
    loading.value = false;
  }
};

// Salvar equipamento (criar ou atualizar)
const salvarEquipamento = async () => {
  try {
    // Validação básica
    if (!equipamento.nome || equipamento.nome.trim() === '') {
      mostrarAlerta('Nome do equipamento é obrigatório!', 'error');
      return;
    }

    console.log('🔍 Estado do equipamento antes de salvar:', equipamento);

    // Montar dados para envio
    const dadosEquipamento = {
      nome: equipamento.nome.trim(),
      tag: equipamento.tag?.trim() || '',
      numeroSerie: equipamento.numeroSerie?.trim() || '',
      fabricante: equipamento.fabricante?.trim() || '',
      modelo: equipamento.modelo?.trim() || '',
      localizacao: equipamento.localizacao?.trim() || '',
      unidade: equipamento.unidade?.trim() || '',
      disciplina: equipamento.disciplina?.trim() || '',
      detalhes: equipamento.detalhes?.trim() || '',
      area: equipamento.area?.trim() || '',
      tipo: 'Equipamento'
    };

    // Adicionar categoriaId apenas se selecionado
    if (equipamento.categoriaId && 
        equipamento.categoriaId !== '' && 
        equipamento.categoriaId !== null && 
        equipamento.categoriaId !== 'null') {
      dadosEquipamento.categoriaId = parseInt(equipamento.categoriaId);
    }

    // Validar e adicionar data de aquisição
    if (equipamento.dataAquisicao && equipamento.dataAquisicao.trim() !== '') {
      const dataValidada = validarData(equipamento.dataAquisicao.trim());
      if (dataValidada) {
        dadosEquipamento.dataAquisicao = dataValidada;
      } else {
        mostrarAlerta('Data de aquisição inválida. Use o formato correto (YYYY-MM-DD)', 'error');
        return;
      }
    }

    console.log('📤 Dados a enviar:', dadosEquipamento);

    loading.value = true;

    // Enviar para API
    let response;
    if (isEditing.value && equipamentoId.value) {
      response = await api.put(`/equipamentos/${equipamentoId.value}`, dadosEquipamento);
      console.log('✅ Equipamento atualizado:', response);
    } else {
      response = await api.post('/equipamentos', dadosEquipamento);
      console.log('✅ Equipamento criado:', response);
    }
    
    mostrarAlerta(
      isEditing.value ? 'Equipamento atualizado com sucesso!' : 'Equipamento cadastrado com sucesso!', 
      'success'
    );
    
    // Aguardar um pouco e redirecionar
    setTimeout(() => {
      router.push('/equipamentos');
    }, 1500);

  } catch (error) {
    console.error('❌ Erro ao salvar equipamento:', error);
    
    let mensagemErro = 'Erro ao salvar equipamento';
    
    if (error.response?.data?.message) {
      mensagemErro = error.response.data.message;
    } else if (error.message) {
      if (error.message.includes('dataAquisicao')) {
        mensagemErro = 'Erro: Data de aquisição em formato inválido. Verifique a data informada.';
      } else if (error.message.includes('categoriaId should not exist')) {
        mensagemErro = 'Erro: Campo categoria não suportado pelo sistema.';
      } else if (error.message.includes('tipo should not exist')) {
        mensagemErro = 'Erro: Campo tipo não suportado pelo sistema.';
      } else {
        mensagemErro = error.message;
      }
    }
    
    mostrarAlerta(mensagemErro, 'error');
  } finally {
    loading.value = false;
  }
};

// Voltar para a listagem
const voltar = () => {
  router.push('/equipamentos');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Moderno -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {{ isEditing ? 'Editar Equipamento' : 'Novo Equipamento' }}
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                {{ isEditing ? 'Modifique as informações do equipamento' : 'Cadastre um novo equipamento no sistema' }}
              </p>
            </div>
          </div>
          
          <button 
            @click="voltar" 
            class="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>
      </div>
    </div>

    <!-- Container Principal -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alerta Modernizado -->
      <div v-if="showAlert" 
           class="mb-8 p-6 rounded-2xl shadow-lg border transform transition-all duration-300 animate-in slide-in-from-top-4"
           :class="alertType === 'success' 
             ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' 
             : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800'">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg v-if="alertType === 'success'" class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="font-semibold">{{ alertMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Formulário Principal -->
      <form @submit.prevent="salvarEquipamento" class="space-y-8">
        <!-- Card Principal -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Informações Básicas
            </h2>
            <p class="text-blue-100 mt-1">Dados principais do equipamento</p>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Nome do Equipamento -->
              <div class="col-span-full">
                <label class="block text-sm font-bold text-gray-900 mb-3" for="nome">
                  Nome do Equipamento *
                </label>
                <input 
                  v-model="equipamento.nome" 
                  class="w-full px-4 py-4 text-lg bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="nome" 
                  type="text" 
                  required
                  placeholder="Digite o nome do equipamento"
                >
              </div>
              
              <!-- Categoria -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="categoria">
                  Categoria *
                </label>
                <div class="flex space-x-3">
                  <select 
                    v-model="equipamento.categoriaId" 
                    class="flex-1 px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                    id="categoria" 
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                      {{ categoria.nome }}
                    </option>
                  </select>
                  <button 
                    type="button" 
                    @click="showCategoriaModal = true" 
                    class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                    title="Adicionar nova categoria"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Tag -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="tag">
                  Tag de Identificação
                </label>
                <input 
                  v-model="equipamento.tag" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="tag" 
                  type="text" 
                  placeholder="Ex: EQP-001"
                >
              </div>
              
              <!-- Número de Série -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="numeroSerie">
                  Número de Série
                </label>
                <input 
                  v-model="equipamento.numeroSerie" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="numeroSerie" 
                  type="text" 
                  placeholder="Número de série do fabricante"
                >
              </div>
              
              <!-- Data de Aquisição -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="dataAquisicao">
                  Data de Aquisição
                </label>
                <input 
                  v-model="equipamento.dataAquisicao" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="dataAquisicao" 
                  type="date"
                  min="1900-01-01"
                  max="2100-12-31"
                >
                <p class="text-xs text-gray-500 mt-1">Formato: DD/MM/AAAA</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Fabricante e Modelo -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Dados do Fabricante
            </h2>
            <p class="text-green-100 mt-1">Informações técnicas e de origem</p>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Fabricante -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="fabricante">
                  Fabricante
                </label>
                <input 
                  v-model="equipamento.fabricante" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="fabricante" 
                  type="text" 
                  placeholder="Nome do fabricante"
                >
              </div>
              
              <!-- Modelo -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="modelo">
                  Modelo
                </label>
                <input 
                  v-model="equipamento.modelo" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="modelo" 
                  type="text" 
                  placeholder="Modelo do equipamento"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Card Localização -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Localização e Área
            </h2>
            <p class="text-purple-100 mt-1">Onde o equipamento está instalado</p>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Localização -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="localizacao">
                  Localização
                </label>
                <input 
                  v-model="equipamento.localizacao" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="localizacao" 
                  type="text" 
                  placeholder="Ex: Prédio A - Sala 101"
                >
              </div>

              <!-- Área -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-3" for="area">
                  Área de Operação
                </label>
                <input 
                  v-model="equipamento.area" 
                  class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                  id="area" 
                  type="text" 
                  placeholder="Ex: Produção, Manutenção, Laboratório"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Card Detalhes -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div class="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Informações Adicionais
            </h2>
            <p class="text-orange-100 mt-1">Detalhes técnicos e observações</p>
          </div>
          
          <div class="p-8">
            <label class="block text-sm font-bold text-gray-900 mb-3" for="detalhes">
              Detalhes e Observações
            </label>
            <textarea 
              v-model="equipamento.detalhes" 
              class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none" 
              id="detalhes" 
              rows="6"
              placeholder="Informações técnicas adicionais, especificações, observações de manutenção, etc..."
            ></textarea>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end space-x-4 pt-4">
          <button 
            type="button" 
            @click="voltar" 
            class="px-8 py-4 bg-gray-200 text-gray-700 text-sm font-semibold rounded-2xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cancelar
          </button>
          
          <button 
            type="submit" 
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            :disabled="loading"
          >
            <svg v-if="loading" class="w-4 h-4 mr-2 inline animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span v-if="loading">{{ isEditing ? 'Atualizando...' : 'Salvando...' }}</span>
            <span v-else>{{ isEditing ? 'Atualizar Equipamento' : 'Salvar Equipamento' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Modal Categoria Modernizado -->
    <div v-if="showCategoriaModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-200/50 overflow-hidden">
        <!-- Header do Modal -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            Nova Categoria
          </h2>
          <p class="text-blue-100 mt-1">Adicione uma nova categoria de equipamento</p>
        </div>
        
        <!-- Conteúdo do Modal -->
        <div class="p-8">
          <label class="block text-sm font-bold text-gray-900 mb-3" for="novaCategoria">
            Nome da Categoria *
          </label>
          <input 
            v-model="novaCategoria" 
            class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
            id="novaCategoria" 
            type="text" 
            placeholder="Ex: Bombas, Compressores, Motores..."
            @keyup.enter="cadastrarCategoria"
          >
        </div>
        
        <!-- Footer do Modal -->
        <div class="flex justify-end space-x-3 px-8 py-6 bg-gray-50 border-t border-gray-200">
          <button 
            type="button" 
            @click="showCategoriaModal = false; novaCategoria = ''" 
            class="px-6 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            @click="cadastrarCategoria" 
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            :disabled="categoriaSaving || !novaCategoria.trim()"
          >
            <svg v-if="categoriaSaving" class="w-4 h-4 mr-2 inline animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span v-if="categoriaSaving">Salvando...</span>
            <span v-else>Salvar Categoria</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}

.slide-in-from-top-4 {
  transform: translateY(-1rem);
}

/* Transições suaves para inputs */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
}

/* Efeito glass nos cards */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
}

/* Select customizado */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

select:focus {
  outline: none;
}

select::-ms-expand {
  display: none;
}

select:hover {
  background-color: rgb(249, 250, 251);
}

/* Estilo para inputs de data */
input[type="date"] {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/%3e%3c/svg%3e");
  background-size: 1.2em 1.2em;
  cursor: pointer;
}
</style>