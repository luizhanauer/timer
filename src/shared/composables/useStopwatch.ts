import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { TimeFormatter } from '../../core/domain/TimeFormatter';

export const useStopwatch = () => {
  const elapsedMs: Ref<number> = ref(0);
  const isRunning: Ref<boolean> = ref(false);
  
  let startTime: number | null = null;
  let accumulatedMs: number = 0;
  let animationFrameId: number | null = null;

  const displayTime: ComputedRef<string> = computed(() => 
    TimeFormatter.formatMilliseconds(elapsedMs.value)
  );

  const tick = (): void => {
    if (!isRunning.value) return;
    if (startTime === null) return;

    const now = Date.now();
    elapsedMs.value = accumulatedMs + (now - startTime);
    
    animationFrameId = requestAnimationFrame(tick);
  };

  const start = (): void => {
    if (isRunning.value) return;

    isRunning.value = true;
    startTime = Date.now();
    tick();
  };

const pause = (): void => {
    if (!isRunning.value) return;

    isRunning.value = false;
    
    if (startTime !== null) {
      accumulatedMs += Date.now() - startTime;
    }
    
    startTime = null;

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    elapsedMs.value = accumulatedMs;
  };

  const reset = (): void => {
    pause();
    accumulatedMs = 0;
    elapsedMs.value = 0;
  };

  return { displayTime, isRunning, start, pause, reset };
};