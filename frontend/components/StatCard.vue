<template>
  <div class="group cursor-pointer">
    <div :class="`bg-gradient-to-br ${color} p-4 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/20`">
      <div class="flex items-center justify-between">
        <div>
          <div :class="`text-2xl font-bold ${textColor} group-hover:scale-110 transition-transform duration-300`">
            {{ value }}
          </div>
          <div :class="`text-xs ${textColor} opacity-80`">
            {{ label }}
          </div>
        </div>
        <div class="text-2xl group-hover:animate-bounce">
          {{ icon }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'from-blue-600 to-blue-800'
  },
  textColor: {
    type: String,
    default: 'text-white'
  }
});
</script>