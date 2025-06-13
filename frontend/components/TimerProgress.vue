<template>
  <div class="w-full">
    <div class="flex justify-between text-xs mb-2">
      <span class="text-gray-900 font-medium">
        {{ isOverdue ? `${Math.abs(daysLeft)} dias atrasado` : `${daysLeft} dias restantes` }}
      </span>
      <span class="text-gray-900">
        {{ Math.round(progress) }}%
      </span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div 
        class="h-2 rounded-full transition-all duration-300"
        :class="progressBarClass"
        :style="{ width: Math.min(progress, 100) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  daysLeft: { type: Number, required: true },
  totalDays: { type: Number, required: true },
  isUrgent: { type: Boolean, default: false },
  isOverdue: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

const progress = computed(() => {
  if (props.isCompleted) return 100;
  if (props.isOverdue) return 100;
  
  const progressPercent = ((props.totalDays - props.daysLeft) / props.totalDays) * 100;
  return Math.max(0, Math.min(100, progressPercent));
});

const progressBarClass = computed(() => {
  if (props.isCompleted) return 'bg-green-500';
  if (props.isOverdue) return 'bg-red-500';
  if (props.isUrgent) return 'bg-orange-500';
  return 'bg-blue-500';
});
</script>
