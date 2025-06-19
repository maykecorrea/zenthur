<template>
  <div class="relative">
    <!-- Barra de Progresso Base -->
    <div class="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
      <!-- Progresso Animado -->
      <div 
        class="h-full transition-all duration-1000 ease-out rounded-full"
        :class="progressClasses"
        :style="{ width: `${progressWidth}%` }"
      >
        <div class="h-full w-full bg-gradient-to-r opacity-50 animate-pulse" :class="progressGradient"></div>
      </div>
    </div>

    <!-- Indicador de Posição -->
    <div 
      class="absolute top-0 h-3 w-1 bg-white rounded-full transition-all duration-1000 ease-out"
      :style="{ left: `${indicatorPosition}%` }"
    ></div>

    <!-- Ícone da Ampulheta -->
    <div 
      class="absolute -top-1 transition-all duration-1000 ease-out"
      :style="{ left: `calc(${hourglassPosition}% - 10px)` }"
    >
      <div 
        class="w-5 h-5 rounded-full flex items-center justify-center"
        :class="hourglassClasses"
      >
        <svg 
          class="w-3 h-3 text-white"
          :class="{ 'animate-bounce': isUrgent || isOverdue }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M10 2L3 7v6l7 5 7-5V7l-7-5zM8 8h4l-2 2-2-2zm4 4H8l2-2 2 2z"/>
        </svg>
      </div>
    </div>

    <!-- Partículas Animadas (quando urgente) -->
    <div v-if="isUrgent || isOverdue" class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 3" 
        :key="`particle-${i}`"
        class="absolute w-1 h-1 bg-white rounded-full animate-ping"
        :style="{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`
        }"
      ></div>
    </div>

    <!-- Texto do Timer -->
    <div class="mt-2 flex items-center justify-between text-xs text-white/90">
      <span class="flex items-center">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ timerText }}
      </span>
      
      <span class="text-white/70">
        {{ totalDays }} dias
      </span>
    </div>

    <!-- Efeito de Fluxo -->
    <div 
      v-if="!isOverdue && !isCompleted"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"
      style="animation-duration: 3s;"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  daysLeft: {
    type: Number,
    required: true
  },
  totalDays: {
    type: Number,
    default: 30
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isOverdue: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

// Computed Properties
const progressWidth = computed(() => {
  if (props.isCompleted) return 100;
  if (props.isOverdue) return 100;
  
  const progress = ((props.totalDays - props.daysLeft) / props.totalDays) * 100;
  return Math.max(0, Math.min(100, progress));
});

const indicatorPosition = computed(() => {
  if (props.isOverdue) return 100;
  return progressWidth.value;
});

const hourglassPosition = computed(() => {
  if (props.isCompleted) return 100;
  if (props.isOverdue) return 95;
  
  // A ampulheta se move conforme o tempo passa
  const position = ((props.totalDays - props.daysLeft) / props.totalDays) * 90;
  return Math.max(5, Math.min(95, position));
});

const progressClasses = computed(() => {
  if (props.isCompleted) return 'bg-green-500';
  if (props.isOverdue) return 'bg-red-500 animate-pulse';
  if (props.isUrgent) return 'bg-orange-500';
  return 'bg-blue-500';
});

const progressGradient = computed(() => {
  if (props.isCompleted) return 'from-green-400 to-green-600';
  if (props.isOverdue) return 'from-red-400 to-red-600';
  if (props.isUrgent) return 'from-orange-400 to-orange-600';
  return 'from-blue-400 to-blue-600';
});

const hourglassClasses = computed(() => {
  if (props.isCompleted) return 'bg-green-600 shadow-lg';
  if (props.isOverdue) return 'bg-red-600 shadow-lg animate-pulse';
  if (props.isUrgent) return 'bg-orange-600 shadow-lg';
  return 'bg-blue-600 shadow-lg';
});

const timerText = computed(() => {
  if (props.isCompleted) return 'Concluído';
  if (props.isOverdue) return `${Math.abs(props.daysLeft)} dias atrasado`;
  if (props.daysLeft === 0) return 'Hoje!';
  if (props.daysLeft === 1) return 'Amanhã';
  return `${props.daysLeft} dias restantes`;
});
</script>

<style scoped>
@keyframes flowing {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-flow {
  animation: flowing 2s linear infinite;
}
</style>