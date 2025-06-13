<!-- filepath: d:\PROJETO\frontend\components\manutencao\CardManutencao.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <!-- Cabeçalho do card - cor baseada na criticidade -->
    <div 
      class="p-3 text-white flex justify-between items-center"
      :class="{
        'bg-red-600': manutencao.criticidade === 'Alta',
        'bg-yellow-500': manutencao.criticidade === 'Média',
        'bg-blue-500': manutencao.criticidade === 'Baixa'
      }"
    >
      <div>
        <h3 class="font-medium text-sm">{{ manutencao.tag }}</h3>
        <p class="text-xs opacity-90">{{ manutencao.nomeEquipamento }}</p>
      </div>
      <div 
        class="rounded-full w-8 h-8 flex items-center justify-center"
        :class="{
          'bg-red-800': manutencao.criticidade === 'Alta',
          'bg-yellow-600': manutencao.criticidade === 'Média',
          'bg-blue-600': manutencao.criticidade === 'Baixa'
        }"
      >
        <span class="font-bold text-xs">{{ manutencaoVencida ? '!' : manutencao.criticidade.charAt(0) }}</span>
      </div>
    </div>
    
    <!-- Conteúdo do card -->
    <div class="p-4 flex-grow">
      <!-- Informações do equipamento -->
      <div class="mb-3">
        <p class="text-xs text-gray-500">Local:</p>
        <p class="text-sm font-medium">{{ manutencao.local }}</p>
      </div>
      
      <!-- Datas -->
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p class="text-xs text-gray-500">Última manutenção:</p>
          <p class="text-sm">{{ formatDate(manutencao.dataUltima) }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Próxima manutenção:</p>
          <p class="text-sm font-medium" :class="{ 'text-red-600': manutencaoVencida, 'text-amber-600': manutencaoProxima }">
            {{ formatDate(manutencao.dataProxima) }}
          </p>
        </div>
      </div>
      
      <!-- Tipo e Responsável -->
      <div class="mb-3">
        <p class="text-xs text-gray-500">Tipo:</p>
        <p class="text-sm">{{ manutencao.tipo }}</p>
      </div>
      
      <div class="mb-3">
        <p class="text-xs text-gray-500">Responsável:</p>
        <p class="text-sm">{{ manutencao.responsavel }}</p>
      </div>
      
      <!-- Barra de status -->
      <div class="mt-4">
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full"
            :class="{
              'bg-red-500': manutencaoVencida,
              'bg-amber-500': manutencaoProxima && !manutencaoVencida,
              'bg-green-500': !manutencaoProxima && !manutencaoVencida
            }"
            :style="`width: ${statusBarWidth}`"
          ></div>
        </div>
        <p class="text-xs mt-1 text-right" :class="{ 'text-red-600': manutencaoVencida, 'text-amber-600': manutencaoProxima }">
          {{ statusText }}
        </p>
      </div>
    </div>
    
    <!-- Botões de ação -->
    <div class="border-t border-gray-200 flex justify-between p-2">
      <button class="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Ordem de manutenção">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>
      <button class="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Manutenção">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button class="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Documentação">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  manutencao: {
    type: Object,
    required: true
  }
});

// Formatar data para exibição
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Verificar se a manutenção está vencida
const manutencaoVencida = computed(() => {
  if (!props.manutencao.dataProxima) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataProxima = new Date(props.manutencao.dataProxima);
  dataProxima.setHours(0, 0, 0, 0);
  return dataProxima < hoje;
});

// Verificar se a manutenção está próxima (próximos 7 dias)
const manutencaoProxima = computed(() => {
  if (!props.manutencao.dataProxima) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataProxima = new Date(props.manutencao.dataProxima);
  dataProxima.setHours(0, 0, 0, 0);
  
  // Se já venceu, não está "próxima"
  if (dataProxima < hoje) return false;
  
  // Verifica se está dentro dos próximos 7 dias
  const diasDiferenca = Math.ceil((dataProxima - hoje) / (1000 * 60 * 60 * 24));
  return diasDiferenca <= 7;
});

// Texto de status
const statusText = computed(() => {
  if (manutencaoVencida.value) {
    return 'Manutenção vencida';
  }
  if (manutencaoProxima.value) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataProxima = new Date(props.manutencao.dataProxima);
    dataProxima.setHours(0, 0, 0, 0);
    const diasDiferenca = Math.ceil((dataProxima - hoje) / (1000 * 60 * 60 * 24));
    return `A vencer em ${diasDiferenca} dia${diasDiferenca > 1 ? 's' : ''}`;
  }
  return 'Dentro do prazo';
});

// Largura da barra de status
const statusBarWidth = computed(() => {
  if (manutencaoVencida.value) {
    return '100%';
  }
  
  if (!props.manutencao.dataProxima || !props.manutencao.dataUltima) {
    return '0%';
  }
  
  const dataUltima = new Date(props.manutencao.dataUltima);
  const dataProxima = new Date(props.manutencao.dataProxima);
  const hoje = new Date();
  
  const periodoTotal = dataProxima - dataUltima;
  const periodoDecorrido = hoje - dataUltima;
  
  let percentual = (periodoDecorrido / periodoTotal) * 100;
  percentual = Math.min(Math.max(percentual, 0), 100);
  
  return `${percentual}%`;
});
</script>