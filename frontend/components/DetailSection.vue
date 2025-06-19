<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-white flex items-center space-x-2">
      <span>{{ title }}</span>
    </h3>
    <div class="space-y-3">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>