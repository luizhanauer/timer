import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useStopwatch } from './useStopwatch';

describe('useStopwatch Composable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Ajustado de 16ms para 10ms para criar divisões matemáticas exatas (ex: 5000 / 10 = 500 frames cravados)
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 10));
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve inicializar zerado e sem estar a correr', () => {
    const { displayTime, isRunning } = useStopwatch();
    
    expect(displayTime.value).toBe('00:00:00');
    expect(isRunning.value).toBe(false);
  });

  it('deve iniciar e acumular tempo corretamente', () => {
    const { displayTime, start, isRunning } = useStopwatch();
    
    start();
    expect(isRunning.value).toBe(true);
    
    vi.advanceTimersByTime(5000);
    
    expect(displayTime.value).toBe('00:00:05');
  });

  it('deve pausar e retomar mantendo o tempo acumulado', () => {
    const { displayTime, start, pause } = useStopwatch();
    
    start();
    vi.advanceTimersByTime(3000); 
    pause();
    
    expect(displayTime.value).toBe('00:00:03');
    
    vi.advanceTimersByTime(5000); 
    expect(displayTime.value).toBe('00:00:03'); 
    
    start(); 
    vi.advanceTimersByTime(2000); 
    
    expect(displayTime.value).toBe('00:00:05'); 
  });

  it('deve zerar o cronómetro corretamente', () => {
    const { displayTime, start, reset, isRunning } = useStopwatch();
    
    start();
    vi.advanceTimersByTime(10000); 
    reset();
    
    expect(displayTime.value).toBe('00:00:00');
    expect(isRunning.value).toBe(false);
  });
});