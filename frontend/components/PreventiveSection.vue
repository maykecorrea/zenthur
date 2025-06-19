<template>
  <div class="space-y-6">
    <!-- Header da Seção -->
    <div class="flex items-center justify-between">
      <h2 :class="`text-2xl font-bold ${titleColor} flex items-center space-x-3`">
        <span>{{ title }}</span>
        <span :class="`px-3 py-1 text-sm rounded-full ${badgeColor}`">
          {{ count }}
        </span>
      </h2>
    </div>

    <!-- Grid de Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PreventiveCard
        v-for="item in items"
        :key="item.id"
        :preventiva="item"
        :status-type="statusType"
        :theme="theme"
        @marcarConcluida="$emit('marcarConcluida', $event)"
        @reagendar="$emit('reagendar', $event)"
        @verDetalhes="$emit('verDetalhes', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  statusType: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  }
});

defineEmits(['marcarConcluida', 'reagendar', 'verDetalhes']);

const titleColor = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-red-400';
    case 'orange': return 'text-orange-400';
    case 'green': return 'text-green-400';
    default: return 'text-blue-400';
  }
});

const badgeColor = computed(() => {
  switch (props.theme) {
    case 'red': return 'bg-red-500/20 text-red-300 border border-red-500/30';
    case 'orange': return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
    case 'green': return 'bg-green-500/20 text-green-300 border border-green-500/30';
    default: return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
  }
});
</script>