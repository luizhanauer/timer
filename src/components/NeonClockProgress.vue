<template>
  <div class="relative flex items-center justify-center w-[300px] h-[300px]">
    <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      
      <circle 
        cx="50" cy="50" r="46" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="1.5" 
        class="text-gray-900" 
      />

      <circle 
        cx="50" cy="50" r="46" 
        fill="none" 
        :stroke="color" 
        stroke-width="3"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="currentOffset"
        class="transition-all duration-200 ease-linear"
        :style="{ filter: `drop-shadow(0 0 10px ${color}80)` }" 
      />

      <circle 
        v-if="isRunning"
        cx="50" cy="50" r="46" 
        fill="none" 
        :stroke="color" 
        stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="`0.5 ${circumference}`"
        class="origin-center animate-orbit"
        :style="{ filter: `drop-shadow(0 0 15px ${color})` }" 
      />
      
    </svg>

    <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  progress: number; // 0.0 até 1.0
  color: string;
  isRunning: boolean;
}>();

// Circunferência de um círculo com r=46 (2 * PI * 46)
const circumference: number = 289.026;

// O offset determina quanto da borda está "escondida". 
// Como queremos que ENCHA, quando o progresso é 0, o offset é igual a circunferência inteira (escondido).
const currentOffset: ComputedRef<number> = computed(() => {
  return circumference - (props.progress * circumference);
});
</script>