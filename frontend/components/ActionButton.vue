<template>
  <button 
    @click="$emit('click')"
    class="group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 overflow-hidden border backdrop-blur-sm"
    :class="buttonClasses"
  >
    <!-- Efeito de hover -->
    <div class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300" :class="hoverGradient"></div>
    
    <!-- Conteúdo CENTRALIZADO -->
    <div class="relative flex items-center justify-center space-x-2">
      <span class="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">{{ icon }}</span>
      <span class="flex items-center">{{ label }}</span>
    </div>
    
    <!-- Brilho animado -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger'].includes(value)
  }
});

defineEmits(['click']);

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30 hover:border-green-400/50 hover:text-green-200 hover:shadow-lg hover:shadow-green-500/25';
    case 'danger':
      return 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-400/50 hover:text-red-200 hover:shadow-lg hover:shadow-red-500/25';
    case 'secondary':
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30 hover:bg-gray-500/30 hover:border-gray-400/50 hover:text-gray-200 hover:shadow-lg hover:shadow-gray-500/25';
    default:
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 hover:text-blue-200 hover:shadow-lg hover:shadow-blue-500/25';
  }
});

const hoverGradient = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'from-green-400 to-emerald-400';
    case 'danger':
      return 'from-red-400 to-red-600';
    case 'secondary':
      return 'from-gray-400 to-gray-600';
    default:
      return 'from-blue-400 to-purple-400';
  }
});
</script>