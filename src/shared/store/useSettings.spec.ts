import { describe, it, expect, beforeEach, vi } from 'vitest';
import { settingsState } from './useSettings';

// Mock do localStorage e do document
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Ignora a chamada real ao DOM e ao FaviconService durante os testes da store
vi.mock('../../core/services/FaviconService', () => ({
  FaviconService: { updateFavicon: vi.fn() }
}));

describe('Settings Store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('deve carregar as configurações padrão se o localStorage estiver vazio', () => {
    expect(settingsState.glowColor).toBe('#39FF14');
    expect(settingsState.soundEnabled).toBe(true);
    expect(settingsState.beepWaveform).toBe('square');
    expect(settingsState.beepFrequency).toBe(50);
  });

  it('deve reagir a alterações de estado', async () => {
    settingsState.glowColor = '#FF00FF';
    settingsState.soundEnabled = false;
    
    expect(settingsState.glowColor).toBe('#FF00FF');
    expect(settingsState.soundEnabled).toBe(false);
  });
});