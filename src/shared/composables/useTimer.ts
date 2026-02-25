import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { TimeFormatter } from '../../core/domain/TimeFormatter';
import { NotificationService } from '../../core/services/NotificationService';
import { settingsState } from '../store/useSettings';

export const useTimer = (initialSeconds: number) => {
  const durationMs: Ref<number> = ref(initialSeconds * 1000);
  const remainingMs: Ref<number> = ref(durationMs.value);
  const isRunning: Ref<boolean> = ref(false);
  const isPristine: Ref<boolean> = ref(true);
  
  let endTime: number | null = null;
  let animationFrameId: number | null = null;

  const displayTime: ComputedRef<string> = computed(() => 
    TimeFormatter.formatMilliseconds(remainingMs.value)
  );

  const progress: ComputedRef<number> = computed(() => {
    if (durationMs.value === 0) return 0;
    return 1 - (remainingMs.value / durationMs.value);
  });

  const tick = (): void => {
    if (!isRunning.value || !endTime) return;

    const now = Date.now();
    const diff = endTime - now;

    if (diff <= 0) {
      finish();
      return;
    }

    remainingMs.value = diff;
    animationFrameId = requestAnimationFrame(tick);
  };

  const start = (): void => {
    if (isRunning.value) return;
    
    if (remainingMs.value <= 0) {
      if (durationMs.value > 0) {
        remainingMs.value = durationMs.value;
      } else {
        return; 
      }
    }
    
    isPristine.value = false;
    
    NotificationService.requestPermissions();
    if (settingsState.soundEnabled) {
      NotificationService.initializeAudio();
    }
    
    isRunning.value = true;
    endTime = Date.now() + remainingMs.value;
    tick();
  };

  const pause = (): void => {
    isRunning.value = false;
    endTime = null;
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
  };

  const reset = (): void => {
    pause();
    remainingMs.value = durationMs.value;
    isPristine.value = true;
  };

  const finish = (): void => {
    pause();
    remainingMs.value = 0;
    isPristine.value = true;
    
    if (settingsState.soundEnabled) {
      NotificationService.playBeep(
        settingsState.beepWaveform,
        settingsState.beepFrequency,
        settingsState.beepDuration,
        settingsState.beepRepetitions
      );
    }
    
    if (settingsState.notificationsEnabled) {
      NotificationService.notify('Timer Concluído!', 'O tempo acabou.');
    }
  };

  const setDuration = (seconds: number): void => {
    if (isRunning.value) return;
    durationMs.value = seconds * 1000;
    remainingMs.value = durationMs.value;
    isPristine.value = true;
  };

  // NOVO: Adiciona tempo dinamicamente ao timer atual
  const addTime = (seconds: number): void => {
    const msToAdd = seconds * 1000;
    durationMs.value += msToAdd; // Aumenta a capacidade total para o gráfico não quebrar
    remainingMs.value += msToAdd;
    
    if (isRunning.value && endTime) {
      endTime += msToAdd;
    }
  };

  return { 
    displayTime, 
    progress, 
    isRunning, 
    isPristine, 
    start, 
    pause, 
    reset, 
    setDuration, 
    addTime 
  };
};