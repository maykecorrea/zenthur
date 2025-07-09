<!-- filepath: d:\PROJETO\frontend\pages\novomanu.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Nova Manutenção
              </h1>
              <p class="text-slate-500 text-sm">Cadastre uma nova ordem de manutenção</p>
            </div>
          </div>
          
          <router-link 
            to="/manutencao" 
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Voltar
          </router-link>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-red-700">{{ error }}</span>
        </div>
      </div>

      <!-- Formulário Principal -->
      <form @submit.prevent="salvarManutencao" v-if="!loading" class="space-y-8">
        <!-- Seção 1: Informações Básicas -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Informações Básicas</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Título -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Título da Manutenção *
              </label>
              <input 
                type="text" 
                v-model="form.titulo"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ex: Manutenção preventiva do motor principal"
              />
            </div>

            <!-- Descrição -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea 
                v-model="form.descricao"
                required
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                placeholder="Descreva detalhadamente o que deve ser feito..."
              ></textarea>
            </div>

            <!-- Tipo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Manutenção *
              </label>
              <select 
                v-model="form.tipo" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o tipo...</option>
                <option value="preventiva">Preventiva</option>
                <option value="corretiva">Corretiva</option>
                <option value="preditiva">Preditiva</option>
              </select>
            </div>

            <!-- Criticidade -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Criticidade *
              </label>
              <select 
                v-model="form.criticidade" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione a criticidade...</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Seção 2: Equipamento e Localização -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Equipamento e Localização</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Equipamento -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Equipamento *
              </label>
              <select 
                v-model="form.equipamentoId" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecione um equipamento...</option>
                <option v-for="equipamento in equipamentos" :key="equipamento.id" :value="equipamento.id">
                  {{ equipamento.nome }} - {{ equipamento.tag || 'S/N' }}
                </option>
              </select>
            </div>

            <!-- Área do Equipamento (readonly) -->
            <div v-if="equipamentoSelecionado">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Área
              </label>
              <input 
                type="text" 
                :value="equipamentoSelecionado.area || 'Não informada'"
                readonly
                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600"
              />
            </div>

            <!-- Tag do Equipamento (readonly) -->
            <div v-if="equipamentoSelecionado">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <input 
                type="text" 
                :value="equipamentoSelecionado.tag || 'Não informada'"
                readonly
                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600"
              />
            </div>
          </div>
        </div>

        <!-- Seção 3: Cronograma -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Cronograma</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Data -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data da Manutenção *
              </label>
              <input 
                type="date" 
                v-model="form.data"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <!-- Hora -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Hora da Manutenção *
              </label>
              <input 
                type="time" 
                v-model="form.hora"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <!-- Data Primeira Revisão -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data Primeira Revisão
              </label>
              <input 
                type="date" 
                v-model="form.dataPrimeiraRevisao"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <!-- Data Próxima Manutenção -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data Próxima Manutenção
              </label>
              <input 
                type="date" 
                v-model="form.dataProximaManutencao"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Seção 4: Responsáveis -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Responsáveis</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Solicitante -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Solicitante *
              </label>
              <input 
                type="text" 
                v-model="form.solicitante"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Nome do solicitante"
              />
            </div>

            <!-- Técnico Responsável -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Técnico Responsável
              </label>
              <input 
                type="text" 
                v-model="form.responsavel"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Nome do técnico responsável"
              />
            </div>
          </div>
        </div>

        <!-- Seção 5: Observações -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <div class="bg-gradient-to-r from-gray-600 to-slate-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Observações</h2>
          </div>
          
          <div class="p-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Observações Adicionais
            </label>
            <textarea 
              v-model="form.observacoes"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              placeholder="Adicione observações importantes, instruções especiais, materiais necessários, etc..."
            ></textarea>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end space-x-4 pt-6">
          <router-link 
            to="/manutencao" 
            class="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            Cancelar
          </router-link>
          
          <button 
            type="submit"
            :disabled="loading"
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ loading ? 'Salvando...' : 'Criar Manutenção' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  ssr: false
});

const router = useRouter();
const authStore = useAuthStore();

// Estados reativos
const loading = ref(false);
const error = ref('');

// Formulário completo com todos os campos
const form = reactive({
  titulo: '',
  descricao: '',
  tipo: 'preventiva', // ⭐ VALOR PADRÃO
  criticidade: 'media', // ⭐ VALOR PADRÃO
  equipamentoId: '',
  data: '',
  hora: '',
  dataPrimeiraRevisao: '',
  dataProximaManutencao: '',
  solicitante: '',
  responsavel: '',
  observacoes: ''
});

// Dados dos equipamentos
const equipamentos = ref([]);

// Equipamento selecionado computado
const equipamentoSelecionado = computed(() => {
  if (!form.equipamentoId) return null;
  return equipamentos.value.find(eq => eq.id === parseInt(form.equipamentoId));
});

// ⭐ FUNÇÃO PARA BUSCAR EQUIPAMENTOS
const fetchEquipamentos = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    const token = authStore.token;
    if (!token) {
      error.value = 'Você precisa estar autenticado.';
      router.push('/login');
      return;
    }
    
    const response = await fetch('/api/equipamentos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar equipamentos: ${response.status}`);
    }
    
    const data = await response.json();
    equipamentos.value = Array.isArray(data) ? data : (data.equipamentos || []);
    
    console.log('✅ Equipamentos carregados:', equipamentos.value.length);
    
  } catch (err) {
    console.error('❌ Erro ao buscar equipamentos:', err);
    error.value = 'Erro ao carregar equipamentos. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

// ⭐ FUNÇÃO PARA SALVAR MANUTENÇÃO - TOTALMENTE CORRIGIDA
const salvarManutencao = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    // Validações básicas
    if (!form.titulo.trim()) {
      error.value = 'Título é obrigatório';
      return;
    }
    
    if (!form.descricao.trim()) {
      error.value = 'Descrição é obrigatória';
      return;
    }
    
    if (!form.equipamentoId) {
      error.value = 'Selecione um equipamento';
      return;
    }
    
    if (!form.data || !form.hora) {
      error.value = 'Data e hora são obrigatórias';
      return;
    }
    
    if (!form.solicitante.trim()) {
      error.value = 'Solicitante é obrigatório';
      return;
    }
    
    if (!form.tipo) {
      error.value = 'Tipo de manutenção é obrigatório';
      return;
    }
    
    if (!form.criticidade) {
      error.value = 'Criticidade é obrigatória';
      return;
    }
    
    const token = authStore.token;
    if (!token) {
      error.value = 'Você precisa estar autenticado.';
      router.push('/login');
      return;
    }
    
    console.log('💾 Iniciando salvamento da manutenção...');
    
    // ⭐ PREPARAR DADOS CORRETOS PARA ENVIO - GARANTINDO TODOS OS CAMPOS
    const dadosParaEnvio = {
      titulo: String(form.titulo).trim(),
      descricao: String(form.descricao).trim(),
      tipo: String(form.tipo),
      criticidade: String(form.criticidade),
      equipamentoId: parseInt(form.equipamentoId),
      data: String(form.data),
      hora: String(form.hora),
      solicitante: String(form.solicitante).trim(),
      // Campos opcionais - garantindo que sejam strings ou null
      responsavel: form.responsavel ? String(form.responsavel).trim() : null,
      observacoes: form.observacoes ? String(form.observacoes).trim() : null,
      dataPrimeiraRevisao: form.dataPrimeiraRevisao ? String(form.dataPrimeiraRevisao) : null,
      dataProximaManutencao: form.dataProximaManutencao ? String(form.dataProximaManutencao) : null
    };
    
    console.log('📤 Dados para envio:', dadosParaEnvio);
    
    // Fazer requisição
    const response = await fetch('/api/manutencoes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dadosParaEnvio)
    });
    
    console.log('📡 Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API:', errorText);
      
      let mensagemErro = 'Erro desconhecido';
      try {
        const errorData = JSON.parse(errorText);
        mensagemErro = errorData.message || errorData.error || 'Erro no servidor';
      } catch (e) {
        mensagemErro = errorText || `Erro HTTP ${response.status}`;
      }
      
      throw new Error(mensagemErro);
    }
    
    const resultado = await response.json();
    console.log('✅ Manutenção criada com sucesso:', resultado);
    
    // Redirecionar para a página de manutenções
    alert('✅ Manutenção criada com sucesso!');
    router.push('/manutencao');
    
  } catch (err) {
    console.error('❌ Erro ao salvar manutenção:', err);
    error.value = err.message || 'Erro ao criar manutenção. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

// ⭐ DEFINIR VALORES PADRÃO
const definirValoresPadrao = () => {
  const agora = new Date();
  const hoje = agora.toISOString().split('T')[0];
  const horaAtual = agora.toTimeString().slice(0, 5);
  
  form.data = hoje;
  form.hora = horaAtual;
  form.criticidade = 'media';
  form.tipo = 'preventiva';
  
  console.log('✅ Valores padrão definidos:', {
    data: form.data,
    hora: form.hora,
    criticidade: form.criticidade,
    tipo: form.tipo
  });
};

// ⭐ LIFECYCLE
onMounted(async () => {
  if (process.client) {
    console.log('🚀 Componente montado');
    
    // Verificar autenticação
    if (!authStore.token) {
      await router.push('/login');
      return;
    }
    
    // Definir valores padrão
    definirValoresPadrao();
    
    // Carregar equipamentos
    await fetchEquipamentos();
  }
});
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Estilo para campos obrigatórios */
input:required:invalid,
select:required:invalid,
textarea:required:invalid {
  box-shadow: none;
}

/* Transições suaves */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* Focus states melhorados */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>