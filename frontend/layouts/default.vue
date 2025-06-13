<!-- filepath: d:\PROJETO\frontend\layouts\default.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Menu Lateral com funcionalidade de minimização -->
    <sidebarmenu />
    
    <!-- Conteúdo principal com headerbar -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Bar -->
      <headerbar />
      
      <!-- Conteúdo da página - ajustado para não rolar excessivamente -->
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebarmenu from '~/components/layout/sidebarmenu.vue'
import headerbar from '~/components/layout/headerbar.vue'
</script>