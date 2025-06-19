<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click="$emit('close')">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal com tamanho fixo -->
      <div 
        class="relative inline-block w-full max-w-2xl p-0
          overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl
          rounded-xl"
        style="width: 700px;"
        @click.stop
      >
        <!-- Header simplificado -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center space-x-3 min-w-0">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white truncate">Editar Manutenção</h3>
            </div>
            <button 
              @click="$emit('close')"
              class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Form simplificado -->
        <form @submit.prevent="save" class="p-4">
          <div class="space-y-4">
            <!-- Equipamento -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Equipamento</label>
              <select 
                v-model="form.equipamentoId" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              >
                <option value="">Selecione um equipamento...</option>
                <option v-for="eq in equipamentos" :key="eq.id" :value="eq.id">
                  {{ eq.nome }} - {{ eq.tag || 'S/N' }}
                </option>
              </select>
            </div>

            <!-- Grid simplificado -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Data Programada</label>
                <input 
                  type="date" 
                  v-model="formattedDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Intervalo (dias)</label>
                <input 
                  type="number" 
                  v-model="form.intervaloDias"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                >
              </div>
            </div>

            <!-- Título -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input 
                type="text" 
                v-model="form.titulo"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              >
            </div>

            <!-- Descrição -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                v-model="form.descricao"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                placeholder="Descrição detalhada da manutenção..."
              ></textarea>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                v-model="form.status" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="agendada">Agendada</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <!-- Botões simplificados -->
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg text-sm"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  maintenance: {
    type: Object,
    required: true
  },
  equipamentos: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  id: '',
  titulo: '',
  descricao: '',
  equipamentoId: '',
  dataHora: '',
  intervaloDias: 30,
  status: 'agendada'
});

const formattedDate = computed({
  get() {
    return form.value.dataHora ? new Date(form.value.dataHora).toISOString().split('T')[0] : '';
  },
  set(value) {
    form.value.dataHora = new Date(value).toISOString();
  }
});

const save = () => {
  emit('save', { ...form.value });
};

// Watch para popular o form quando a manutenção muda
watch(() => props.maintenance, (newMaintenance) => {
  if (newMaintenance) {
    form.value = {
      id: newMaintenance.id,
      titulo: newMaintenance.titulo || '',
      descricao: newMaintenance.descricao || '',
      equipamentoId: newMaintenance.equipamentoId || '',
      dataHora: newMaintenance.dataHora || '',
      intervaloDias: newMaintenance.intervaloDias || 30,
      status: newMaintenance.status || 'agendada'
    };
  }
}, { immediate: true });
</script>

<style scoped>
/* Estilo fixo para o modal */
.relative.inline-block.w-full {
  max-width: 700px !important;
  width: 700px !important;
}

/* Reduzir padding */
form {
  padding: 0.75rem !important;
}

/* Ajustar formulário */
input, select, textarea {
  font-size: 0.875rem !important;
  padding: 0.375rem 0.75rem !important;
}

/* Botões compactos */
button {
  padding: 0.375rem 0.75rem !important;
  font-size: 0.875rem !important;
}

/* ⭐ RESPONSIVIDADE PARA MODAL */
@media (max-width: 640px) {
  .fixed.inset-0 {
    padding: 1rem;
  }
}

/* ⭐ TRANSIÇÕES SUAVES */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
}
</style>