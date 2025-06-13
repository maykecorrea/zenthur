<template>
  <div class="relative group">
    <!-- Card Principal -->
    <div 
      class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      :class="cardClasses"
      @click="$emit('click')"
    >
      <!-- Header do Card -->
      <div class="relative p-6 bg-gradient-to-r" :class="headerGradient">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-white mb-1">
              {{ maintenance.titulo || maintenance.equipamento?.nome || 'Manutenção' }}
            </h3>
            <p class="text-white/80 text-sm">
              {{ maintenance.codigo || 'N/A' }} • {{ maintenance.equipamento?.localizacao || 'Local não definido' }}
            </p>
          </div>
          
          <!-- Status Badge -->
          <div class="flex items-center space-x-2">
            <span 
              class="px-2 py-1 rounded-lg text-xs font-medium"
              :class="statusBadgeClasses"
            >
              {{ statusText }}
            </span>
          </div>
        </div>

        <!-- Timer Animado -->
        <div class="mt-4 relative">
          <TimerProgress 
            :days-left="daysLeft"
            :total-days="maintenance.intervaloDias || 30"
            :is-urgent="isUrgent"
            :is-overdue="isOverdue"
            :is-completed="maintenance.status === 'concluida'"
          />
        </div>
      </div>

      <!-- Conteúdo do Card -->
      <div class="p-6">
        <!-- Informações da Manutenção -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Data Programada
            </span>
            <span class="font-medium text-slate-900">
              {{ formatDate(maintenance.dataHora) }}
            </span>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Intervalo
            </span>
            <span class="font-medium text-slate-900">
              {{ maintenance.intervaloDias || 30 }} dias
            </span>
          </div>

          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Tempo Restante
            </span>
            <span class="font-medium" :class="timeLeftClasses">
              {{ timeLeftText }}
            </span>
          </div>
        </div>

        <!-- ⭐ SEÇÃO DE TÉCNICO RESPONSÁVEL -->
        <div v-if="maintenance.responsavel" class="bg-gray-50 rounded-lg p-3 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500">Técnico Responsável</div>
                <div class="text-sm font-medium text-gray-700">{{ maintenance.responsavel }}</div>
              </div>
            </div>
            
            <!-- Botões de Técnico (apenas se não for concluída) -->
            <div v-if="maintenance.status !== 'concluida'" class="flex items-center space-x-1">
              <button
                @click.stop="$emit('edit-technician', maintenance)"
                class="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Editar técnico"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              
              <button
                @click.stop="$emit('view-technician-history', maintenance)"
                class="p-1 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                title="Histórico de técnicos"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Descrição -->
        <div v-if="maintenance.descricao" class="mb-6">
          <p class="text-sm text-slate-600 truncate-text">
            {{ maintenance.descricao }}
          </p>
        </div>

        <!-- Informações extras condensadas -->
        <div class="space-y-2 mb-6">
          <!-- Solicitante -->
          <div v-if="maintenance.solicitante" class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-purple-100 rounded flex items-center justify-center">
              <svg class="w-2 h-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"></path>
              </svg>
            </div>
            <span class="text-xs text-gray-600">
              {{ maintenance.solicitante }}
            </span>
          </div>

          <!-- Tipo -->
          <div v-if="maintenance.tipo" class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-orange-100 rounded flex items-center justify-center">
              <svg class="w-2 h-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              </svg>
            </div>
            <span class="text-xs text-gray-600 capitalize">
              {{ maintenance.tipo }}
            </span>
          </div>
        </div>

        <!-- ⭐ SEÇÃO DE AÇÕES - SEPARADA E MELHOR ORGANIZADA -->
        <div class="space-y-3">
          <!-- Primeira linha: Botões de edição (sempre presentes) -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="flex items-center space-x-2">
              <!-- Botão Editar -->
              <button 
                @click.stop="$emit('edit', maintenance)"
                class="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              
              <!-- Botão Excluir -->
              <button 
                @click.stop="$emit('delete', maintenance.id)"
                class="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>

            <!-- Botão Concluir/Status -->
            <div class="flex items-center">
              <button 
                v-if="maintenance.status !== 'concluida'"
                @click.stop="$emit('complete', maintenance.id)"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Concluir
              </button>
              
              <div 
                v-else 
                class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Concluída
              </div>
            </div>
          </div>

          <!-- ⭐ SEGUNDA LINHA: BOTÃO ARQUIVAR (APENAS PARA CONCLUÍDAS) -->
          <div v-if="maintenance.status === 'concluida'" class="pt-2">
            <button
              @click.stop="$emit('archive', maintenance)"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l6 6V9l5 5V9l5-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"></path>
              </svg>
              📦 Arquivar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Efeito de Urgência -->
    <div 
      v-if="isUrgent && maintenance.status !== 'concluida'" 
      class="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-30 animate-pulse"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TimerProgress from './TimerProgress.vue';

const props = defineProps({
  maintenance: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click', 'edit', 'delete', 'complete', 'archive', 'edit-technician', 'view-technician-history']);

// ⭐ COMPUTED PROPERTIES CORRIGIDOS PARA KANBAN
const daysLeft = computed(() => {
  const targetDate = new Date(props.maintenance.dataHora);
  const today = new Date();
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const isUrgent = computed(() => daysLeft.value <= 3 && daysLeft.value > 0);
const isOverdue = computed(() => daysLeft.value < 0);

// ⭐ CORES CORRIGIDAS BASEADAS NO STATUS REAL DO KANBAN
const cardClasses = computed(() => {
  const status = props.maintenance.status;
  return {
    'ring-2 ring-blue-500 ring-opacity-50': status === 'recebida',
    'ring-2 ring-yellow-500 ring-opacity-50': status === 'analise',
    'ring-2 ring-green-500 ring-opacity-50': status === 'execucao',
    'ring-2 ring-purple-500 ring-opacity-50': status === 'concluida'
  };
});

const headerGradient = computed(() => {
  const status = props.maintenance.status;
  switch(status) {
    case 'recebida':
      return 'from-blue-500 to-blue-600';
    case 'analise':
      return 'from-yellow-500 to-orange-500';
    case 'execucao':
      return 'from-green-500 to-green-600';
    case 'concluida':
      return 'from-purple-500 to-purple-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
});

const statusText = computed(() => {
  const status = props.maintenance.status;
  switch(status) {
    case 'recebida':
      return 'Recebida';
    case 'analise':
      return 'Em Análise';
    case 'execucao':
      return 'Em Execução';
    case 'concluida':
      return 'Concluída';
    default:
      return 'Indefinido';
  }
});

const statusBadgeClasses = computed(() => {
  const status = props.maintenance.status;
  switch(status) {
    case 'recebida':
      return 'bg-blue-100 text-blue-800';
    case 'analise':
      return 'bg-yellow-100 text-yellow-800';
    case 'execucao':
      return 'bg-green-100 text-green-800';
    case 'concluida':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
});

const timeLeftText = computed(() => {
  const status = props.maintenance.status;
  if (status === 'concluida') return 'Concluída';
  if (isOverdue.value) return `${Math.abs(daysLeft.value)} dias atrasado`;
  if (daysLeft.value === 0) return 'Hoje';
  if (daysLeft.value === 1) return 'Amanhã';
  return `${daysLeft.value} dias`;
});

const timeLeftClasses = computed(() => {
  const status = props.maintenance.status;
  if (status === 'concluida') return 'text-purple-600';
  if (isOverdue.value) return 'text-red-600';
  if (isUrgent.value) return 'text-orange-600';
  return 'text-slate-900';
});

const formatDate = (dateString) => {
  if (!dateString) return 'Não definida';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<style scoped>
.truncate-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

@supports not (-webkit-line-clamp: 2) {
  .truncate-text {
    display: block;
    max-height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>