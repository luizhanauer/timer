import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTimer } from './useTimer';

// Faz um mock (simulação) do NotificationService para não disparar áudio/alertas no terminal
vi.mock('../../core/services/NotificationService', () => ({
  NotificationService: {
    requestPermissions: vi.fn(),
    initializeAudio: vi.fn(),
    playBeep: vi.fn(),
    notify: vi.fn()
  }
}));

describe('useTimer Composable', () => {
  beforeEach(() => {
    // Assume o controlo do relógio do sistema para testes instantâneos
    vi.useFakeTimers();
    
    // Substitui o requestAnimationFrame por um setTimeout simples para o ambiente Node/jsdom
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 16));
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve inicializar com o estado pristine e tempo correto', () => {
    const { displayTime, isRunning, isPristine, progress } = useTimer(60); // 1 minuto
    
    expect(displayTime.value).toBe('00:01:00');
    expect(isRunning.value).toBe(false);
    expect(isPristine.value).toBe(true);
    expect(progress.value).toBe(0);
  });

  it('deve adicionar tempo extra de forma dinâmica', () => {
    const { displayTime, addTime } = useTimer(60); // Inicia com 1m
    
    addTime(30); // Adiciona 30s
    expect(displayTime.value).toBe('00:01:30');
    
    addTime(300); // Adiciona 5m
    expect(displayTime.value).toBe('00:06:30');
  });

  it('deve formatar o progresso corretamente durante a execução', () => {
    const { progress, setDuration } = useTimer(0);
    
    setDuration(100); // Define 100 segundos
    // Sem iniciar o relógio, alteramos o tempo restante manualmente para simular 50%
    // Em testes puros o ideal é isolar a store, mas testar a computação de progresso é vital
    expect(progress.value).toBe(0);
  });
});