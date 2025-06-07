<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click="$emit('close')">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal -->
      <div 
        class="relative inline-block w-full max-w-2xl p-0 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl"
        @click.stop
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Editar Manutenção Preventiva</h3>
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

        <!-- Form -->
        <form @submit.prevent="save" class="p-6">
          <div class="space-y-6">
            <!-- Equipamento -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Equipamento</label>
              <select 
                v-model="form.equipamentoId" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione um equipamento...</option>
                <option v-for="eq in equipamentos" :key="eq.id" :value="eq.id">
                  {{ eq.nome }} - {{ eq.tag || 'S/N' }}
                </option>
              </select>
            </div>

            <!-- Data e Intervalo -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Data Programada</label>
                <input 
                  type="date" 
                  v-model="formattedDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Intervalo (dias)</label>
                <input 
                  type="number" 
                  v-model="form.intervaloDias"
                  min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
            </div>

            <!-- Título -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
              <input 
                type="text" 
                v-model="form.titulo"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>

            <!-- Descrição -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea 
                v-model="form.descricao"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descrição detalhada da manutenção..."
              ></textarea>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                v-model="form.status" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="agendada">Agendada</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <!-- Datas de Revisão e Próxima Manutenção -->
            <div class="space-y-4">
              <!-- Data Primeira Revisão -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Data Primeira Revisão
                </label>
                <input 
                  type="date" 
                  v-model="form.dataPrimeiraRevisao"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <!-- Data Próxima Manutenção -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Data Próxima Manutenção
                </label>
                <input 
                  type="date" 
                  v-model="form.dataProximaManutencao"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              @click="$emit('close')"
              class="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-lg"
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
  dataPrimeiraRevisao: '',
  dataProximaManutencao: '',
  intervaloDias: 30,
  status: 'agendada',
  tipo: 'preventiva',
  criticidade: 'media'
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
      dataPrimeiraRevisao: newMaintenance.dataPrimeiraRevisao || '',
      dataProximaManutencao: newMaintenance.dataProximaManutencao || '',
      intervaloDias: newMaintenance.intervaloDias || 30,
      status: newMaintenance.status || 'agendada',
      tipo: newMaintenance.tipo || 'preventiva',
      criticidade: newMaintenance.criticidade || 'media'
    };
  }
}, { immediate: true });
</script>