<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
      ></div>
      
      <!-- Modal -->
      <div class="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-modal-enter">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-blue-500/20 rounded-xl">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Detalhes da Manutenção</h2>
                <p class="text-gray-300">{{ preventiva.codigo }}</p>
              </div>
            </div>
            
            <button 
              @click="$emit('close')"
              class="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 text-gray-400 hover:text-white"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Informações Principais -->
            <div class="space-y-6">
              <DetailSection title="📋 Informações Gerais">
                <DetailItem label="Título" :value="preventiva.titulo" />
                <DetailItem label="Código" :value="preventiva.codigo" />
                <DetailItem label="Status" :value="preventiva.status" />
                <DetailItem label="Tipo" :value="preventiva.tipo" />
              </DetailSection>
              
              <DetailSection title="🔧 Equipamento">
                <DetailItem label="Nome" :value="preventiva.equipamento?.nome" />
                <DetailItem label="Tag" :value="preventiva.equipamento?.tag" />
                <DetailItem label="Área" :value="preventiva.equipamento?.area" />
                <DetailItem label="Tipo" :value="preventiva.equipamento?.tipo" />
              </DetailSection>
            </div>
            
            <!-- Cronograma -->
            <div class="space-y-6">
              <DetailSection title="📅 Cronograma">
                <DetailItem label="Criado em" :value="formatDateTime(preventiva.createdAt)" />
                <DetailItem label="Primeira Revisão" :value="formatDate(preventiva.dataPrimeiraRevisao)" />
                <DetailItem label="Próxima Manutenção" :value="formatDate(preventiva.dataProximaCalculada)" />
                <DetailItem label="Dias Restantes" :value="preventiva.timeLeftText" />
              </DetailSection>
              
              <DetailSection title="👤 Responsável">
                <DetailItem label="Nome" :value="preventiva.user?.nome" />
                <DetailItem label="Email" :value="preventiva.user?.email" />
              </DetailSection>
            </div>
            
            <!-- Descrição -->
            <div v-if="preventiva.descricao" class="lg:col-span-2">
              <DetailSection title="📝 Descrição">
                <div class="bg-black/20 rounded-xl p-4 border border-white/10">
                  <p class="text-gray-300 leading-relaxed">{{ preventiva.descricao }}</p>
                </div>
              </DetailSection>
            </div>
            
            <!-- Progress Visual -->
            <div class="lg:col-span-2">
              <DetailSection title="📊 Progresso do Ciclo">
                <div class="space-y-4">
                  <div class="flex justify-between text-sm text-gray-300">
                    <span>Progresso</span>
                    <span class="font-bold">{{ Math.round(progressPercentage) }}%</span>
                  </div>
                  <div class="relative h-4 bg-black/30 rounded-full overflow-hidden border border-white/10">
                    <div 
                      class="absolute inset-0 rounded-full transition-all duration-1000"
                      :class="progressBarClasses"
                      :style="{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-400">
                    <span>Início</span>
                    <span>{{ preventiva.totalDays }} dias</span>
                  </div>
                </div>
              </DetailSection>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-black/20 border-t border-white/10 p-6">
          <div class="flex justify-end space-x-4">
            <button 
              @click="$emit('close')"
              class="px-6 py-3 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  preventiva: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const progressPercentage = computed(() => {
  if (props.preventiva.isCompleted) return 100;
  
  const total = props.preventiva.totalDays || 90;
  const remaining = props.preventiva.daysLeft || 0;
  
  if (remaining < 0) return 100;
  
  const elapsed = total - remaining;
  return Math.max(0, Math.min(100, (elapsed / total) * 100));
});

const progressBarClasses = computed(() => {
  if (props.preventiva.isOverdue) return 'bg-gradient-to-r from-red-500 to-red-600';
  if (props.preventiva.isUrgent) return 'bg-gradient-to-r from-orange-500 to-red-500';
  if (props.preventiva.isCompleted) return 'bg-gradient-to-r from-green-500 to-emerald-500';
  return 'bg-gradient-to-r from-blue-500 to-purple-500';
});

const formatDate = (date) => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'Data inválida';
  }
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Data inválida';
  }
};
</script>

<style scoped>
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-enter {
  animation: modal-enter 0.3s ease-out;
}
</style>