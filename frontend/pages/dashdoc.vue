<!-- filepath: d:\PROJETO\frontend\pages\doc.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header com gradiente -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Título com ícone -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Documentação
              </h1>
              <p class="text-sm text-slate-500 mt-0.5">Gerencie documentos técnicos do sistema</p>
            </div>
          </div>

          <!-- Ações do header -->
          <div class="flex items-center space-x-3">
            <button 
              @click="navigateToNewDocument"
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo Documento
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Container principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Total documentos -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Total de documentos</p>
              <p class="text-3xl font-bold text-slate-900">{{ documentos.length }}</p>
            </div>
          </div>
        </div>

        <!-- Documentos atualizados -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Atualizados este mês</p>
              <p class="text-3xl font-bold text-slate-900">{{ getDocumentosRecentesCount() }}</p>
            </div>
          </div>
        </div>

        <!-- Tipos de documentos -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Tipos de documentos</p>
              <p class="text-3xl font-bold text-slate-900">{{ getTiposUnicos().length }}</p>
            </div>
          </div>
        </div>

        <!-- Equipamentos cadastrados -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Equipamentos</p>
              <p class="text-3xl font-bold text-slate-900">{{ getEquipamentosUnicos().length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros avançados -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center">
          <!-- Busca com ícone -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar documentos..." 
              class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <!-- Filtros -->
          <div class="flex flex-col sm:flex-row gap-3">
            <select 
              v-model="filtroArea"
              class="px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Todas as áreas</option>
              <option value="PROD">Produção</option>
              <option value="MAN">Manutenção</option>
              <option value="QUA">Qualidade</option>
              <option value="SEG">Segurança</option>
              <option value="AMB">Meio Ambiente</option>
            </select>
            
            <select 
              v-model="filtroDisciplina"
              class="px-4 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Todas as disciplinas</option>
              <option value="MEC">Mecânica</option>
              <option value="ELE">Elétrica</option>
              <option value="INS">Instrumentação</option>
              <option value="CIV">Civil</option>
              <option value="QUI">Química</option>
              <option value="SEG">Segurança</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabela moderna -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200/60">
          <h3 class="text-lg font-semibold text-slate-900">Lista de Documentos</h3>
          <p class="text-sm text-slate-500 mt-1">{{ filteredDocuments.length }} documento(s) encontrado(s)</p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/80">
              <tr>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Documento
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Equipamento
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Versão
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Tamanho
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Data
                </th>
                <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white/50 divide-y divide-slate-200/40">
              <tr v-for="doc in filteredDocuments" :key="doc.id" class="hover:bg-blue-50/50 transition-colors duration-200 group">
                <!-- TÍTULO -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-semibold text-slate-900 max-w-[200px] truncate" :title="getTituloDisplay(doc)">
                        {{ getTituloDisplay(doc) }}
                      </div>
                      <div class="text-xs text-slate-500">{{ getCodeDisplay(doc) }}</div>
                    </div>
                  </div>
                </td>
                
                <!-- TIPO -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        :class="getTipoClasses(getTipoDisplay(doc))">
                    {{ formatTipo(getTipoDisplay(doc)) }}
                  </span>
                </td>
                
                <!-- EQUIPAMENTO -->
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-slate-900">{{ getEquipamentoDisplay(doc) }}</div>
                  <div v-if="doc.equipamento && (doc.equipamento.area || doc.equipamento.disciplina)" class="text-xs text-slate-500">
                    {{ doc.equipamento.area || '' }}{{ doc.equipamento.area && doc.equipamento.disciplina ? ' • ' : '' }}{{ doc.equipamento.disciplina || '' }}
                  </div>
                </td>
                
                <!-- VERSÃO -->
                <td class="px-6 py-4 hidden lg:table-cell">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    v{{ getVersaoDisplay(doc) }}
                  </span>
                </td>
                
                <!-- TAMANHO -->
                <td class="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">
                  {{ formatFileSize(doc.tamanho) }}
                </td>
                
                <!-- DATA -->
                <td class="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">
                  {{ formatDate(doc.createdAt) }}
                </td>
                
                <!-- AÇÕES -->
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <!-- Download -->
                    <button 
                      @click="downloadDocument(doc)"
                      :disabled="!doc.arquivo || downloadingId === doc.id"
                      :title="doc.arquivo ? 'Fazer download do PDF' : 'Documento sem arquivo anexado'"
                      class="inline-flex items-center p-2 border border-transparent rounded-lg text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <svg v-if="downloadingId === doc.id" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    
                    <!-- Ver/Editar -->
                    <button 
                      @click="viewDocumentDetails(doc.id)"
                      title="Ver detalhes"
                      class="inline-flex items-center p-2 border border-transparent rounded-lg text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <!-- Editar -->
                    <button 
                      @click="viewDocumentDetails(doc.id)"
                      title="Editar"
                      class="inline-flex items-center p-2 border border-transparent rounded-lg text-orange-600 hover:text-orange-900 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Estado vazio moderno -->
        <div v-if="filteredDocuments.length === 0" class="text-center py-16">
          <div class="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Nenhum documento encontrado</h3>
          <p class="text-slate-500 mb-6">Comece criando seu primeiro documento técnico.</p>
          <button 
            @click="navigateToNewDocument"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Criar Primeiro Documento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

definePageMeta({
  layout: 'default'
});

// Estados
const searchQuery = ref('');
const filtroArea = ref('');
const filtroDisciplina = ref('');
const documentos = ref([]);
const downloadingId = ref(null);

// ⭐ FUNÇÕES DE ESTATÍSTICAS
const getDocumentosRecentesCount = () => {
  const umMesAtras = new Date();
  umMesAtras.setMonth(umMesAtras.getMonth() - 1);
  
  return documentos.value.filter(doc => {
    const dataDoc = new Date(doc.createdAt);
    return dataDoc >= umMesAtras;
  }).length;
};

const getTiposUnicos = () => {
  const tipos = new Set();
  documentos.value.forEach(doc => {
    const tipo = getTipoDisplay(doc);
    if (tipo) tipos.add(tipo);
  });
  return Array.from(tipos);
};

const getEquipamentosUnicos = () => {
  const equipamentos = new Set();
  documentos.value.forEach(doc => {
    const equipamento = getEquipamentoDisplay(doc);
    if (equipamento && equipamento !== 'Sem equipamento') {
      equipamentos.add(equipamento);
    }
  });
  return Array.from(equipamentos);
};

// ⭐ FUNÇÕES DE DISPLAY
const getTituloDisplay = (doc) => {
  return doc.description || doc.titulo || doc.nome || 'Sem título';
};

const getTipoDisplay = (doc) => {
  return doc.type || doc.tipo || 'manual';
};

const getCodeDisplay = (doc) => {
  return doc.code || `DOC-${doc.id}`;
};

const getVersaoDisplay = (doc) => {
  return doc.version || doc.versao || '1';
};

const getEquipamentoDisplay = (doc) => {
  if (doc.asset && doc.asset !== 'Sem equipamento') {
    return doc.asset;
  } else if (doc.equipamento?.nome) {
    return doc.equipamento.nome;
  } else if (doc.equipamento?.tag) {
    return doc.equipamento.tag;
  }
  return 'Sem equipamento';
};

// Funções auxiliares
const formatTipo = (tipo) => {
  const tipos = {
    'manual': 'Manual',
    'especificacao': 'Especificação', 
    'procedimento': 'Procedimento',
    'desenho': 'Desenho',
    'certificado': 'Certificado',
    'relatorio': 'Relatório'
  };
  return tipos[tipo?.toLowerCase()] || tipo || 'Documento';
};

const getTipoClasses = (tipo) => {
  const classes = {
    'manual': 'bg-blue-100 text-blue-800 border border-blue-200',
    'especificacao': 'bg-green-100 text-green-800 border border-green-200',
    'procedimento': 'bg-purple-100 text-purple-800 border border-purple-200',
    'desenho': 'bg-orange-100 text-orange-800 border border-orange-200',
    'certificado': 'bg-red-100 text-red-800 border border-red-200',
    'relatorio': 'bg-gray-100 text-gray-800 border border-gray-200'
  };
  return classes[tipo?.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

const formatFileSize = (bytes) => {
  if (!bytes) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return 'Data inválida';
  }
};

// Fetch documentos
const fetchDocumentos = async () => {
  try {
    const response = await fetch(`/api/documentos`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao carregar documentos');
    }
    
    const data = await response.json();
    documentos.value = data;
    
  } catch (error) {
    console.error('❌ [FETCH] Erro:', error);
  }
};

// Download
const downloadDocument = async (doc) => {
  try {
    if (!doc.arquivo) {
      alert('Este documento não possui arquivo para download');
      return;
    }

    downloadingId.value = doc.id;

    const response = await fetch(`/api/documentos/${doc.id}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.fileName || `${doc.code || doc.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('❌ [DOWNLOAD] Erro:', error);
    alert(`Erro ao fazer download: ${error.message}`);
  } finally {
    downloadingId.value = null;
  }
};

// Navegação
const navigateToNewDocument = () => {
  router.push('/doc2');
};

const viewDocumentDetails = (id) => {
  router.push(`/doc2?id=${id}`);
};

// Filtros
const filteredDocuments = computed(() => {
  let filtered = documentos.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(doc => 
      getTituloDisplay(doc).toLowerCase().includes(query) ||
      getTipoDisplay(doc).toLowerCase().includes(query) ||
      getEquipamentoDisplay(doc).toLowerCase().includes(query)
    );
  }
  
  if (filtroArea.value) {
    filtered = filtered.filter(doc => 
      (doc.area && doc.area.code === filtroArea.value) ||
      (doc.equipamento && doc.equipamento.area === filtroArea.value)
    );
  }
  
  if (filtroDisciplina.value) {
    filtered = filtered.filter(doc => 
      (doc.discipline === filtroDisciplina.value) ||
      (doc.equipamento && doc.equipamento.disciplina === filtroDisciplina.value)
    );
  }
  
  return filtered;
});

onMounted(() => {
  fetchDocumentos();
});
</script>