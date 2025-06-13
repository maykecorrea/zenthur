<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Layout com sidebar quando necessário -->
    <div v-if="mostrarSidebar" class="flex">
      <!-- Sidebar -->
      <ClientOnly>
        <SidebarMenu />
      </ClientOnly>
      
      <!-- Conteúdo principal com sidebar -->
      <div class="flex-1 transition-all duration-300">
        <NuxtPage />
      </div>
    </div>
    
    <!-- Layout sem sidebar para páginas de login -->
    <div v-else class="w-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import SidebarMenu from '~/components/layout/sidebarmenu.vue';

const route = useRoute();
const isHydrated = ref(false);

// ⭐ SIMPLIFICAR LÓGICA - Mostrar sidebar em todas as páginas exceto login
const mostrarSidebar = computed(() => {
  if (!isHydrated.value) return false;
  
  const rota = route.path;
  
  // Lista simples de rotas sem sidebar
  const rotasSemSidebar = [
    '/',
    '/login', 
    '/admin-login',
    '/register'
  ];
  
  // Não mostrar sidebar apenas nessas rotas específicas
  return !rotasSemSidebar.includes(rota);
});

onMounted(() => {
  // Marcar hidratação completa
  isHydrated.value = true;
  
  console.log('App montado - Rota:', route.path);
  console.log('Mostrar sidebar:', mostrarSidebar.value);
});
</script>

<style>
/* Estilos globais */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Remover scroll horizontal */
html, body {
  overflow-x: hidden;
}

/* Melhoria nos scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Transições suaves */
* {
  transition: all 0.2s ease;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

* {
  box-sizing: border-box;
}
</style>