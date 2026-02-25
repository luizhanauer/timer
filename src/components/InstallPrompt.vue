<template>
  <div
    v-if="isInstallable"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-950 border rounded-2xl p-4 flex flex-col gap-3 z-50 animate-slide-up"
    :style="{
      borderColor: `${settingsState.glowColor}80`,
      boxShadow: `0 10px 30px -5px ${settingsState.glowColor}40`,
    }"
  >
    <div class="flex items-center gap-4">
      <div
        class="w-12 h-12 bg-gray-900 rounded-xl p-2 border border-gray-800 flex items-center justify-center shrink-0"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="neon-glow-prompt"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            :stroke="settingsState.glowColor"
            stroke-width="4"
            fill="none"
            filter="url(#neon-glow-prompt)"
          >
            <circle cx="50" cy="55" r="30" />
            <path d="M40 20 H60" stroke-linecap="round" />
            <path d="M50 20 V25" stroke-linecap="round" />
            <path d="M50 55 L65 40" stroke-linecap="round" />
            <circle cx="50" cy="32" r="1" :fill="settingsState.glowColor" />
            <circle cx="73" cy="55" r="1" :fill="settingsState.glowColor" />
            <circle cx="50" cy="78" r="1" :fill="settingsState.glowColor" />
            <circle cx="27" cy="55" r="1" :fill="settingsState.glowColor" />
          </g>
        </svg>
      </div>
      <div>
        <h3 class="text-white font-bold text-sm">Instalar App</h3>
        <p class="text-xs text-gray-400 mt-0.5">
          Adicione à tela inicial para acesso rápido e offline.
        </p>
      </div>
    </div>

    <div class="flex gap-3 mt-2">
      <button
        @click="dismiss"
        class="flex-1 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        Agora não
      </button>
      <button
        @click="promptInstall"
        class="flex-1 py-2 text-xs font-bold text-black rounded-lg transition-transform active:scale-95"
        :style="{
          backgroundColor: settingsState.glowColor,
          boxShadow: `0 0 10px ${settingsState.glowColor}80`,
        }"
      >
        Instalar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePwaInstall } from "../shared/composables/usePwaInstall";
import { settingsState } from "../shared/store/useSettings";

const { isInstallable, promptInstall, dismiss } = usePwaInstall();
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
