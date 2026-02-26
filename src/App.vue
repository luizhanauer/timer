<template>
  <main class="min-h-screen flex flex-col items-center justify-center p-4 bg-black selection:bg-gray-800">
    
    <nav class="flex w-full max-w-md bg-gray-900/60 p-1.5 rounded-2xl mb-8 border border-gray-800/80 shadow-inner">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="flex-1 flex flex-col items-center justify-center py-3 gap-1.5 rounded-xl transition-all duration-300 relative overflow-hidden"
        :class="activeTab === tab.id ? 'bg-black shadow-lg scale-100 z-10' : 'hover:bg-gray-800/50 scale-95 opacity-70 hover:opacity-100'"
        :style="activeTab === tab.id ? { 
          borderColor: `${settingsState.glowColor}50`, 
          borderWidth: '1px', 
          color: settingsState.glowColor,
          boxShadow: `0 4px 15px -5px ${settingsState.glowColor}40`
        } : { 
          color: '#9ca3af', 
          border: '1px solid transparent' 
        }"
        @click="switchTab(tab.id)"
      >
        <svg v-if="tab.id === 'timer'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 8 16"></polyline>
        </svg>

        <svg v-else-if="tab.id === 'stopwatch'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="13" r="8"></circle>
          <polyline points="12 9 12 13 14 15"></polyline>
          <line x1="12" y1="2" x2="12" y2="5"></line>
          <line x1="9" y1="2" x2="15" y2="2"></line>
        </svg>

        <svg v-else-if="tab.id === 'settings'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>

        <span class="text-[9px] font-bold uppercase tracking-widest">{{ tab.label }}</span>
      </button>
    </nav>

    <NeonCard class="w-full max-w-md flex flex-col items-center min-h-[300px] justify-center transition-all">
      
      <section v-if="activeTab === 'timer'" class="w-full flex flex-col items-center animate-fade-in py-4">
        
        <NeonClockProgress 
          :progress="timer.progress.value" 
          :color="settingsState.glowColor" 
          :isRunning="timer.isRunning.value"
        >
          <div v-if="!timer.isRunning.value && timer.isPristine.value" class="flex items-center gap-1 text-3xl font-mono">
            <div class="flex flex-col items-center">
              <input type="number" v-model.number="inputHours" min="0" max="99" class="time-input w-16 text-2xl" @input="updateTimerDuration" />
              <span class="text-[10px] text-gray-500 uppercase mt-1 tracking-widest">Hrs</span>
            </div>
            <span class="text-gray-600 pb-4">:</span>
            <div class="flex flex-col items-center">
              <input type="number" v-model.number="inputMinutes" min="0" max="59" class="time-input w-16 text-2xl" @input="updateTimerDuration" />
              <span class="text-[10px] text-gray-500 uppercase mt-1 tracking-widest">Min</span>
            </div>
            <span class="text-gray-600 pb-4">:</span>
            <div class="flex flex-col items-center">
              <input type="number" v-model.number="inputSeconds" min="0" max="59" class="time-input w-16 text-2xl" @input="updateTimerDuration" />
              <span class="text-[10px] text-gray-500 uppercase mt-1 tracking-widest">Seg</span>
            </div>
          </div>

          <h2 v-else class="text-5xl font-mono text-center text-white tracking-wider" :style="{ textShadow: `0 0 20px ${settingsState.glowColor}80` }">
            {{ timer.displayTime.value }}
          </h2>
        </NeonClockProgress>

        <div class="flex justify-center gap-3 mt-6 w-full px-8">
          <button 
            v-for="btn in quickAddButtons" 
            :key="btn.value"
            @click="handleAddTime(btn.value)"
            class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-95 bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-white"
            :style="{ boxShadow: `0 0 5px ${settingsState.glowColor}10` }"
          >
            {{ btn.label }}
          </button>
        </div>

        <div class="flex justify-center gap-4 mt-6 w-full px-4">
          <NeonButton v-if="!timer.isRunning.value" @click="timer.start" class="flex-1">
            {{ timer.isPristine.value ? 'Iniciar' : 'Retomar' }}
          </NeonButton>
          <NeonButton v-else @click="timer.pause" class="flex-1">Pausar</NeonButton>
          <NeonButton @click="resetTimer" class="flex-1">Reset</NeonButton>
        </div>
      </section>

      <section v-else-if="activeTab === 'stopwatch'" class="w-full flex flex-col items-center animate-fade-in py-4">
        <NeonClockProgress 
          :progress="1" 
          :color="settingsState.glowColor" 
          :isRunning="stopwatch.isRunning.value"
        >
          <h2 class="text-5xl font-mono text-center text-white tracking-wider" :style="{ textShadow: `0 0 20px ${settingsState.glowColor}80` }">
            {{ stopwatch.displayTime.value }}
          </h2>
        </NeonClockProgress>
        
        <div class="flex justify-center gap-4 mt-8 w-full px-4">
          <NeonButton v-if="!stopwatch.isRunning.value" @click="stopwatch.start" class="flex-1">
            {{ stopwatch.displayTime.value === '00:00:00' ? 'Iniciar' : 'Retomar' }}
          </NeonButton>
          <NeonButton v-else @click="stopwatch.pause" class="flex-1">Pausar</NeonButton>
          <NeonButton @click="stopwatch.reset" :disabled="stopwatch.displayTime.value === '00:00:00'" class="flex-1">Zerar</NeonButton>
        </div>
      </section>

      <section v-else-if="activeTab === 'settings'" class="w-full flex flex-col gap-4 animate-fade-in pb-8">
        <div class="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
          <span class="text-gray-300 font-medium text-sm">Cor Neon</span>
          <input type="color" v-model="settingsState.glowColor" class="w-8 h-8 cursor-pointer bg-transparent border-none rounded-full overflow-hidden">
        </div>
        
        <label class="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <span class="text-gray-300 font-medium text-sm">Notificações Push</span>
          <input type="checkbox" v-model="settingsState.notificationsEnabled" class="w-4 h-4 rounded accent-current focus:ring-0 cursor-pointer" :style="{ color: settingsState.glowColor }">
        </label>

        <div class="p-4 bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col gap-4">
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-gray-300 font-medium text-sm">Alerta Sonoro</span>
            <input type="checkbox" v-model="settingsState.soundEnabled" class="w-4 h-4 rounded accent-current focus:ring-0 cursor-pointer" :style="{ color: settingsState.glowColor }">
          </label>

          <div v-if="settingsState.soundEnabled" class="flex flex-col gap-3 pt-3 border-t border-gray-800 animate-fade-in">
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500 uppercase tracking-wider">Textura (Onda)</span>
              <select v-model="settingsState.beepWaveform" class="bg-black border border-gray-700 text-white rounded-lg p-2 text-sm outline-none focus:border-white transition-colors">
                <option value="sine">Sine (Suave)</option>
                <option value="square">Square (Grave/Pesado)</option>
                <option value="triangle">Triangle (Alarme)</option>
                <option value="sawtooth">Sawtooth (Metálico)</option>
              </select>
            </label>

            <div class="grid grid-cols-2 gap-3">
              <label class="flex flex-col gap-1">
                <span class="text-xs text-gray-500 uppercase tracking-wider">Freq. (Hz)</span>
                <input type="number" v-model.number="settingsState.beepFrequency" min="20" max="2000" class="bg-black border border-gray-700 text-white rounded-lg p-2 text-sm outline-none focus:border-white transition-colors">
              </label>

              <label class="flex flex-col gap-1">
                <span class="text-xs text-gray-500 uppercase tracking-wider">Duração (s)</span>
                <input type="number" v-model.number="settingsState.beepDuration" min="0.1" max="5" step="0.1" class="bg-black border border-gray-700 text-white rounded-lg p-2 text-sm outline-none focus:border-white transition-colors">
              </label>
            </div>

            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500 uppercase tracking-wider">Repetições</span>
              <input type="number" v-model.number="settingsState.beepRepetitions" min="1" max="10" class="bg-black border border-gray-700 text-white rounded-lg p-2 text-sm outline-none focus:border-white transition-colors">
            </label>

            <button 
              @click="testAudio"
              class="mt-2 py-2 text-xs font-bold text-black rounded-lg transition-transform active:scale-95"
              :style="{ backgroundColor: settingsState.glowColor, boxShadow: `0 0 10px ${settingsState.glowColor}40` }"
            >
              Testar Som
            </button>
          </div>
        </div>
      </section>

    </NeonCard>
    
    <InstallPrompt />
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';
import NeonCard from './components/NeonCard.vue';
import NeonButton from './components/NeonButton.vue';
import NeonClockProgress from './components/NeonClockProgress.vue';
import InstallPrompt from './components/InstallPrompt.vue';
import { settingsState } from './shared/store/useSettings';
import { useTimer } from './shared/composables/useTimer';
import { useStopwatch } from './shared/composables/useStopwatch';
import { NotificationService } from './core/services/NotificationService';

type TabId = 'timer' | 'stopwatch' | 'settings';
interface Tab { id: TabId; label: string; }
interface QuickAddBtn { label: string; value: number; }

const tabs: Tab[] = [
  { id: 'timer', label: 'Timer' },
  { id: 'stopwatch', label: 'Cronômetro' },
  { id: 'settings', label: 'Ajustes' }
];

const quickAddButtons: QuickAddBtn[] = [
  { label: '+30s', value: 30 },
  { label: '+1m', value: 60 },
  { label: '+5m', value: 300 }
];

const activeTab: Ref<TabId> = ref('timer');

const switchTab = (id: TabId): void => {
  activeTab.value = id;
};

const timer = useTimer(0);
const stopwatch = useStopwatch();

const inputHours: Ref<number> = ref(0);
const inputMinutes: Ref<number> = ref(0); 
const inputSeconds: Ref<number> = ref(0);

const updateTimerDuration = (): void => {
  const h = inputHours.value || 0;
  const m = inputMinutes.value || 0;
  const s = inputSeconds.value || 0;
  
  const totalSeconds = (h * 3600) + (m * 60) + s;
  timer.setDuration(totalSeconds);
};

const handleAddTime = (secondsToAdd: number): void => {
  if (timer.isRunning.value || !timer.isPristine.value) {
    timer.addTime(secondsToAdd);
  } 
  
  // Mantém os inputs sempre sincronizados com o total de tempo adicionado
  const currentTotal = (inputHours.value || 0) * 3600 + (inputMinutes.value || 0) * 60 + (inputSeconds.value || 0);
  const newTotal = currentTotal + secondsToAdd;
  
  inputHours.value = Math.floor(newTotal / 3600);
  inputMinutes.value = Math.floor((newTotal % 3600) / 60);
  inputSeconds.value = newTotal % 60;
  
  if (!timer.isRunning.value && timer.isPristine.value) {
    updateTimerDuration();
  }
};

const resetTimer = (): void => {
  // Força o reset completo para o valor padrão absoluto de 0 minuto
  inputHours.value = 0;
  inputMinutes.value = 0;
  inputSeconds.value = 0;
  
  timer.reset();
  updateTimerDuration();
};

const testAudio = (): void => {
  NotificationService.initializeAudio();
  NotificationService.playBeep(
    settingsState.beepWaveform, 
    settingsState.beepFrequency, 
    settingsState.beepDuration, 
    settingsState.beepRepetitions
  );
};

watchEffect(() => {
  if (timer.isRunning.value) {
    document.title = `⏳ ${timer.displayTime.value} - Timer`;
  } else if (stopwatch.isRunning.value) {
    document.title = `⏱️ ${stopwatch.displayTime.value} - Cronômetro`;
  } else {
    if (activeTab.value === 'timer') {
      document.title = timer.isPristine.value ? 'Timer' : `⏳ Pausado (${timer.displayTime.value})`;
    } else if (activeTab.value === 'stopwatch') {
      document.title = stopwatch.displayTime.value === '00:00:00' ? 'Cronômetro' : `⏱️ Pausado (${stopwatch.displayTime.value})`;
    } else {
      document.title = 'Ajustes';
    }
  }
});

updateTimerDuration();
</script>