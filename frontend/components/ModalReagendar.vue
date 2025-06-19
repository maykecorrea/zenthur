<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
      ></div>
      
      <!-- Modal -->
      <div class="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full animate-modal-enter">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-blue-500/20 rounded-xl">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">Reagendar Manutenção</h2>
                <p class="text-gray-300 text-sm">{{ preventiva.titulo }}</p>
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
        
        <!-- Form -->
        <form @submit.prevent="salvar" class="p-6 space-y-6">
          
          <!-- Data Atual -->
          <div class="bg-black/20 rounded-xl p-4 border border-white/10">
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Data Atual:</span>
              <span class="text-white font-semibold">{{ formatDate(preventiva.dataProximaCalculada) }}</span>
            </div>
          </div>
          
          <!-- Nova Data -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">Nova Data</label>
            <input 
              v-model="novaData"
              type="date"
              required
              class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          
          <!-- Observações -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">Motivo do Reagendamento</label>
            <textarea 
              v-model="observacoes"
              rows="3"
              placeholder="Descreva o motivo do reagendamento..."
              class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            ></textarea>
          </div>
          
          <!-- Actions -->
          <div class="flex justify-end space-x-4 pt-4">
            <button 
              type="button"
              @click="$emit('close')"
              class="px-6 py-3 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-300"
            >
              Cancelar
            </button>
            
            <button 
              type="submit"
              :disabled="!novaData"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              Reagendar
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  preventiva: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const novaData = ref('');
const observacoes = ref('');

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

const salvar = () => {
  if (!novaData.value) return;
  
  emit('save', {
    id: props.preventiva.id,
    novaData: novaData.value,
    observacoes: observacoes.value
  });
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