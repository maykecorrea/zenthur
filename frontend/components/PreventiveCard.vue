<template>
  <div 
    class="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
    :class="cardClasses"
    style="min-width: calc(100%);"
  >
    <!-- Efeito de brilho no hover -->
    <div class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" :class="glowClasses"></div>
    
    <!-- Header -->
    <div class="relative flex items-start justify-between mb-6">
      <div class="flex-1 space-y-2">
        <h3 class="text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
          {{ preventiva.titulo || 'Manutenção Preventiva' }}
        </h3>
        <div class="space-y-1">
          <p class="text-gray-300 font-medium">
            {{ preventiva.equipamento?.nome || 'Equipamento não definido' }}
          </p>
          <p class="text-gray-400 text-sm flex items-center space-x-2">
            <span>{{ preventiva.equipamento?.tag }}</span>
            <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{{ preventiva.equipamento?.area }}</span>
          </p>
        </div>
      </div>
      
      <!-- Status Badge -->
      <div class="relative">
        <span 
          class="px-4 py-2 text-sm font-bold rounded-xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-105"
          :class="badgeClasses"
        >
          {{ badgeText }}
        </span>
        <div class="absolute inset-0 rounded-xl blur opacity-50" :class="badgeGlow"></div>
      </div>
    </div>

    <!-- Informações em Grid -->
    <div class="relative grid grid-cols-2 gap-4 mb-6">
      <InfoItem 
        label="Primeira Revisão" 
        :value="formatDate(preventiva.dataPrimeiraRevisao)"
        icon="📅"
      />
      <InfoItem 
        label="Próxima Manutenção" 
        :value="formatDate(preventiva.dataProximaCalculada)"
        icon="🔧"
      />
      <InfoItem 
        label="Status" 
        :value="preventiva.timeLeftText"
        icon="⏱️"
        :textClass="timeClasses"
      />
      <InfoItem 
        label="Intervalo" 
        :value="`${preventiva.totalDays} dias`"
        icon="📊"
      />
    </div>

    <!-- Progress Bar Futurística -->
    <div v-if="!preventiva.isCompleted" class="relative mb-6">
      <div class="flex justify-between text-sm text-gray-300 mb-2">
        <span class="font-medium">Progresso do Ciclo</span>
        <span class="font-bold">{{ Math.round(progressPercentage) }}%</span>
      </div>
      <div class="relative h-3 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <div 
          class="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
          :class="progressBarClasses"
          :style="{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Descrição -->
    <div v-if="preventiva.descricao" class="relative mb-6">
      <p class="text-gray-300 text-sm leading-relaxed line-clamp-2 bg-black/20 rounded-lg p-3 border border-white/5">
        {{ preventiva.descricao }}
      </p>
    </div>

    <!-- Actions Futurísticas -->
    <div class="relative flex justify-end space-x-3 pt-4 border-t border-white/10">
      <ActionButton
        v-if="!preventiva.isCompleted"
        @click="$emit('marcarConcluida', preventiva.id)"
        icon="✅"
        label="Concluir"
        variant="success"
      />
      
      <ActionButton
        v-if="!preventiva.isCompleted"
        @click="$emit('reagendar', preventiva)"
        icon="📅"
        label="Reagendar"
        variant="primary"
      />
      
      <ActionButton
        @click="$emit('verDetalhes', preventiva)"
        icon="👁️"
        label="Detalhes"
        variant="secondary"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  preventiva: {
    type: Object,
    required: true
  },
  statusType: {
    type: String,
    default: 'normal'
  },
  theme: {
    type: String,
    default: 'blue'
  }
});

defineEmits(['marcarConcluida', 'reagendar', 'verDetalhes']);

const cardClasses = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'hover:bg-red-900/10';
    case 'urgente':
      return 'hover:bg-orange-900/10';
    case 'concluida':
      return 'hover:bg-green-900/10';
    default:
      return 'hover:bg-blue-900/10';
  }
});

const glowClasses = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'from-red-500 to-red-700';
    case 'urgente':
      return 'from-orange-500 to-red-500';
    case 'concluida':
      return 'from-green-500 to-emerald-500';
    default:
      return 'from-blue-500 to-purple-500';
  }
});

const badgeClasses = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'urgente':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'concluida':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    default:
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  }
});

const badgeGlow = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'bg-red-500/20';
    case 'urgente':
      return 'bg-orange-500/20';
    case 'concluida':
      return 'bg-green-500/20';
    default:
      return 'bg-blue-500/20';
  }
});

const badgeText = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'VENCIDA';
    case 'urgente':
      return 'URGENTE';
    case 'concluida':
      return 'CONCLUÍDA';
    default:
      return 'NORMAL';
  }
});

const timeClasses = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'text-red-400 font-bold';
    case 'urgente':
      return 'text-orange-400 font-bold';
    case 'concluida':
      return 'text-green-400 font-bold';
    default:
      return 'text-blue-400 font-bold';
  }
});

const progressPercentage = computed(() => {
  if (props.preventiva.isCompleted) return 100;
  
  const total = props.preventiva.totalDays || 90;
  const remaining = props.preventiva.daysLeft || 0;
  
  if (remaining < 0) return 100;
  
  const elapsed = total - remaining;
  return Math.max(0, Math.min(100, (elapsed / total) * 100));
});

const progressBarClasses = computed(() => {
  switch (props.statusType) {
    case 'vencida':
      return 'bg-gradient-to-r from-red-500 to-red-600';
    case 'urgente':
      return 'bg-gradient-to-r from-orange-500 to-red-500';
    case 'concluida':
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    default:
      return 'bg-gradient-to-r from-blue-500 to-purple-500';
  }
});

const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'Data inválida';
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>