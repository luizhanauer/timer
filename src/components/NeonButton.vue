<template>
  <button
    class="px-6 py-3 font-bold text-white rounded-xl transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
    :style="{
      backgroundColor: 'transparent',
      borderColor: settingsState.glowColor,
      borderWidth: '2px',
      boxShadow: `0 0 10px ${settingsState.glowColor}80, inset 0 0 10px ${settingsState.glowColor}30`,
      textShadow: `0 0 5px ${settingsState.glowColor}`
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { settingsState } from '../shared/store/useSettings';

defineProps<{ disabled?: boolean }>();
const emit = defineEmits<{ (e: 'click'): void }>();

const onClick = (): void => {
  emit('click');
};
</script>