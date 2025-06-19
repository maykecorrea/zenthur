<template>
  <div class="text-center py-20">
    <div class="relative mb-8">
      <!-- Ícone central com efeitos -->
      <div class="w-32 h-32 mx-auto bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
        <svg class="w-16 h-16 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      </div>
      
      <!-- Círculos decorativos -->
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-ping"></div>
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-ping delay-1000"></div>
    </div>
    
    <div class="space-y-4 max-w-md mx-auto">
      <h3 class="text-2xl font-bold text-white mb-2">
        Nenhuma Manutenção Encontrada
      </h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        Não há manutenções preventivas cadastradas no sistema. 
        Crie uma nova manutenção para começar o monitoramento.
      </p>
      
      <button 
        @click="$router.push('/manutencao')"
        class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
      >
        <!-- Efeito de brilho -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        <!-- Conteúdo -->
        <div class="relative flex items-center space-x-3">
          <span class="text-xl group-hover:scale-110 transition-transform duration-300">🔧</span>
          <span>Ir para Manutenções</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
// Componente puramente visual, sem lógica
</script>