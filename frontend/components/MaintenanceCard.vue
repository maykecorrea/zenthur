<template>
  <div class="relative group card-container">
    <!-- Card Principal -->
    <div 
      class="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      :class="cardClasses"
    >
      <!-- ⭐ HEADER COM TAMANHO AUMENTADO -->
      <div class="relative card-header bg-gradient-to-r" :class="headerGradient">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="equipment-title font-semibold text-white mb-2 truncate">
              {{ maintenance.equipamento?.nome || 'Equipamento' }}
            </h3>
            <p class="equipment-subtitle text-white/80 truncate">
              {{ maintenance.equipamento?.tag || 'N/A' }} • {{ maintenance.equipamento?.localizacao || 'Local não definido' }}
            </p>
          </div>
          
          <!-- Status Badge Maior -->
          <div class="flex items-center justify-start sm:justify-end">
            <span 
              class="status-badge px-3 py-2 rounded-lg font-medium whitespace-nowrap"
              :class="statusBadgeClasses"
            >
              {{ statusText }}
            </span>
          </div>
        </div>

        <!-- Timer com Mais Espaço -->
        <div class="timer-container relative">
          <TimerProgress 
            :days-left="daysLeft"
            :total-days="maintenance.intervaloDias || 30"
            :is-urgent="isUrgent"
            :is-overdue="isOverdue"
            :is-completed="maintenance.status === 'concluida'"
          />
        </div>
      </div>

      <!-- ⭐ CONTEÚDO COM MAIS ESPAÇAMENTO -->
      <div class="card-content">
        <!-- Informações em Grid com Mais Espaço -->
        <div class="info-grid mb-6">
          <!-- Data Programada -->
          <div class="info-row">
            <span class="info-label text-slate-600 flex items-center">
              <svg class="info-icon mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="truncate">Data Programada</span>
            </span>
            <span class="info-value font-medium text-slate-900 text-right">
              {{ formatDate(maintenance.dataHora) }}
            </span>
          </div>
          
          <!-- Intervalo -->
          <div class="info-row">
            <span class="info-label text-slate-600 flex items-center">
              <svg class="info-icon mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span class="truncate">Intervalo</span>
            </span>
            <span class="info-value font-medium text-slate-900 text-right">
              {{ maintenance.intervaloDias || 30 }} dias
            </span>
          </div>

          <!-- Tempo Restante -->
          <div class="info-row">
            <span class="info-label text-slate-600 flex items-center">
              <svg class="info-icon mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="truncate">Tempo Restante</span>
            </span>
            <span class="info-value font-medium text-right" :class="timeLeftClasses">
              {{ timeLeftText }}
            </span>
          </div>
        </div>

        <!-- Descrição com Mais Espaço -->
        <div v-if="maintenance.descricao" class="description-container mb-6">
          <p class="description-text text-slate-600 truncate-text">
            {{ maintenance.descricao }}
          </p>
        </div>

        <!-- ⭐ AÇÕES COM MAIS ESPAÇAMENTO -->
        <div class="actions-container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
          <!-- Botões de Ação Primários -->
          <div class="action-buttons-left flex items-center justify-center sm:justify-start space-x-3">
            <!-- Botão Editar -->
            <button 
              @click="editarManutencao"
              class="action-btn-small p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            
            <!-- Botão Excluir -->
            <button 
              @click="$emit('delete', maintenance.id)"
              class="action-btn-small p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir"
            >
              <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>

          <!-- Botão Principal Maior -->
          <div class="action-buttons-right flex items-center justify-center sm:justify-end">
            <!-- Se não é concluída - Próxima Fase -->
            <button 
              v-if="maintenance.status !== 'concluida'"
              @click="$emit('nextPhase', maintenance.id)"
              class="action-btn-primary w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <svg class="action-icon-small mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span class="btn-text whitespace-nowrap">Próxima Fase</span>
            </button>
            
            <!-- Se é concluída - Arquivar -->
            <button 
              v-else
              @click="arquivarManutencao"
              class="action-btn-primary w-full sm:w-auto bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
            >
              <svg class="action-icon-small mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l4 4m6-4l-6 6m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="btn-text whitespace-nowrap">Arquivar</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Efeito de Urgência -->
    <div 
      v-if="isUrgent && maintenance.status !== 'concluida'" 
      class="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl lg:rounded-2xl opacity-30 animate-pulse"
    ></div>

    <!-- Modal -->
    <MaintenanceModal
      v-if="showModal"
      :maintenance="maintenance"
      :equipamentos="equipamentos"
      @close="showModal = false"
      @save="salvarEdicao"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TimerProgress from './TimerProgress.vue';
import MaintenanceModal from './MaintenanceModal.vue';

const props = defineProps({
  maintenance: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete', 'nextPhase']);

// Estados internos
const showModal = ref(false);
const equipamentos = ref([]);

// Funções
const editarManutencao = async () => {
  await carregarEquipamentos();
  showModal.value = true;
};

const carregarEquipamentos = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('http://localhost:4001/api/equipamentos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      equipamentos.value = data.equipamentos || data || [];
    }
  } catch (error) {
    console.error('❌ Erro ao carregar equipamentos:', error);
  }
};

const salvarEdicao = async (dadosEditados) => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`http://localhost:4001/api/manutencoes/${dadosEditados.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosEditados)
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar manutenção');
    }

    console.log('✅ Manutenção editada com sucesso');
    showModal.value = false;
    window.location.reload();
    
  } catch (error) {
    console.error('❌ Erro ao salvar:', error);
    alert('Erro ao salvar manutenção. Tente novamente.');
  }
};

const arquivarManutencao = async () => {
  if (!confirm('Tem certeza que deseja arquivar esta manutenção? Ela será movida para o histórico.')) {
    return;
  }

  try {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`http://localhost:4001/api/manutencoes/${props.maintenance.id}/arquivar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao arquivar manutenção');
    }

    console.log('✅ Manutenção arquivada com sucesso');
    window.location.reload();
    
  } catch (error) {
    console.error('❌ Erro ao arquivar:', error);
    alert('Erro ao arquivar manutenção. Tente novamente.');
  }
};

// Computed Properties
const daysLeft = computed(() => {
  const targetDate = new Date(props.maintenance.dataHora);
  const today = new Date();
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const isUrgent = computed(() => daysLeft.value <= 3 && daysLeft.value > 0);
const isOverdue = computed(() => daysLeft.value < 0);

const cardClasses = computed(() => ({
  'ring-2 ring-red-500 ring-opacity-50': isOverdue.value,
  'ring-2 ring-orange-500 ring-opacity-50': isUrgent.value,
  'ring-2 ring-green-500 ring-opacity-50': props.maintenance.status === 'concluida'
}));

const headerGradient = computed(() => {
  if (props.maintenance.status === 'concluida') return 'from-green-500 to-emerald-600';
  if (isOverdue.value) return 'from-red-500 to-red-600';
  if (isUrgent.value) return 'from-orange-500 to-red-500';
  return 'from-blue-500 to-indigo-600';
});

const statusText = computed(() => {
  if (props.maintenance.status === 'concluida') return 'Concluída';
  if (isOverdue.value) return 'Atrasada';
  if (isUrgent.value) return 'Urgente';
  return 'Agendada';
});

const statusBadgeClasses = computed(() => {
  if (props.maintenance.status === 'concluida') return 'bg-green-100 text-green-800';
  if (isOverdue.value) return 'bg-red-100 text-red-800';
  if (isUrgent.value) return 'bg-orange-100 text-orange-800';
  return 'bg-blue-100 text-blue-800';
});

const timeLeftText = computed(() => {
  if (props.maintenance.status === 'concluida') return 'Concluída';
  if (isOverdue.value) return `${Math.abs(daysLeft.value)} dias atrasado`;
  if (daysLeft.value === 0) return 'Hoje';
  if (daysLeft.value === 1) return 'Amanhã';
  return `${daysLeft.value} dias`;
});

const timeLeftClasses = computed(() => {
  if (props.maintenance.status === 'concluida') return 'text-green-600';
  if (isOverdue.value) return 'text-red-600';
  if (isUrgent.value) return 'text-orange-600';
  return 'text-slate-900';
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<style scoped>
/* ====== CONTAINER PRINCIPAL REDUZIDO ====== */
.card-container {
  width: 100%;
  max-width: 100%;
  font-size: 0.9em; /* Redução proporcional de texto */
}

/* ====== HEADER REDUZIDO ====== */
.card-header {
  padding: 0.6rem 0.8rem; /* Era 0.75rem 1rem - redução de 20% */
}

.equipment-title {
  font-size: 0.85rem; /* Era ~0.94rem - redução de 10% */
  line-height: 1.4;
  margin-bottom: 0.2rem; /* Era 0.25rem - reduzido */
}

.equipment-subtitle {
  font-size: 0.75rem; /* Era 0.8125rem - reduzido */
  line-height: 1.4;
}

.status-badge {
  font-size: 0.7rem; /* Era 0.75rem - reduzido */
  padding: 0.2rem 0.4rem; /* Era 0.25rem 0.5rem - reduzido */
}

.timer-container {
  margin-top: 0.4rem; /* Era 0.5rem - reduzido */
}

/* ====== CONTEÚDO REDUZIDO ====== */
.card-content {
  padding: 0.6rem 0.8rem; /* Era 0.75rem 1rem - redução de 20% */
}

.info-grid {
  gap: 0.4rem; /* Era 0.5rem - reduzido */
  margin-bottom: 0.6rem; /* Era 0.75rem - reduzido */
}

.info-row {
  padding: 0.1rem 0; /* Era 0.125rem - reduzido */
}

.info-label, .info-value {
  font-size: 0.7rem; /* Era 0.75rem - reduzido */
}

.info-icon {
  width: 0.7rem; /* Era 0.875rem - reduzido */
  height: 0.7rem;
  margin-right: 0.4rem; /* Era 0.5rem - reduzido */
}

/* ====== DESCRIÇÃO COMPACTA ====== */
.description-container {
  margin-bottom: 0.6rem; /* Era 0.75rem - reduzido */
}

.description-text {
  font-size: 0.7rem; /* Era 0.75rem - reduzido */
  line-height: 1.3;
  padding: 0.4rem; /* Era 0.5rem - reduzido */
}

/* ====== AÇÕES MAIS COMPACTAS ====== */
.actions-container {
  padding-top: 0.5rem; /* Era 0.625rem - reduzido */
  gap: 0.4rem; /* Era 0.5rem - reduzido */
}

.action-btn-small {
  padding: 0.3rem; /* Era 0.375rem - reduzido */
}

.action-icon {
  width: 0.7rem; /* Era 0.875rem - reduzido */
  height: 0.7rem;
}

.action-btn-primary {
  padding: 0.3rem 0.6rem; /* Era 0.375rem 0.75rem - reduzido */
}

.action-icon-small {
  width: 0.6rem; /* Era 0.75rem - reduzido */
  height: 0.6rem;
  margin-right: 0.3rem; /* Era 0.375rem - reduzido */
}

.btn-text {
  font-size: 0.7rem; /* Era 0.75rem - reduzido */
}
</style>