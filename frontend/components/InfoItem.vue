<template>
  <div class="bg-black/20 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-all duration-300 group">
    <div class="flex items-center space-x-2 mb-1">
      <span class="text-lg group-hover:scale-110 transition-transform duration-300">{{ icon }}</span>
      <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">{{ label }}</span>
    </div>
    <div :class="`text-sm font-semibold text-white ${textClass}`">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  textClass: {
    type: String,
    default: ''
  }
});
</script>