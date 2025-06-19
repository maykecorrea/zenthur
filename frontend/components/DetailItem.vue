<template>
  <div class="flex justify-between items-center py-2 px-3 bg-black/10 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200">
    <span class="text-gray-400 text-sm font-medium">{{ label }}:</span>
    <span class="text-white text-sm font-semibold">{{ value || 'N/A' }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: ''
  }
});
</script>