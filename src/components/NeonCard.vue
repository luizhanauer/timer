<template>
  <div 
    class="bg-gray-950 rounded-2xl p-6 border border-gray-800"
    :style="{ boxShadow: `0 0 25px -5px ${settingsState.glowColor}40` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { settingsState } from '../shared/store/useSettings';
</script>