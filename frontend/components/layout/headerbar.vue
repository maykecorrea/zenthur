<!-- filepath: d:\PROJETO\frontend\components\layout\headerbar.vue -->
<template>
  <div class="bg-white h-16 shadow-sm flex items-center justify-between px-6">
    <!-- Espaço à esquerda (sem logo) -->
    <div class="flex items-center">
      <h1 class="text-xl font-semibold text-gray-800">
        {{ pageTitle }}
      </h1>
    </div>
    
    <!-- Botões à direita -->
    <div class="flex items-center space-x-2">
      <!-- Ícone de Sino (Alertas) -->
      <button class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
        <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      
      <!-- Ícone de Interrogação (Ajuda) -->
      <button class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
        <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      <!-- Botão de configurações -->
      <button class="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
        <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Configurações</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Obter o nome da página atual
const route = useRoute();
const pageTitle = computed(() => {
  // Mapear rotas para títulos mais amigáveis
  const titles = {
    '/': 'Dashboard',
    '/map': 'Mapa Interativo',
    '/model': 'Modelo 3D',
    '/docs': 'Documentação',
    '/doc': 'Documentação',   // Adicionado mapeamento para /doc
    '/doc2': 'Detalhes do Documento',  // Adicionado mapeamento para /doc2
    '/maintenance': 'Manutenção',
    '/assets': 'Ativos'
  };
  
  return titles[route.path] || '';  // Retorna string vazia em vez de 'Zenthur'
});
</script>