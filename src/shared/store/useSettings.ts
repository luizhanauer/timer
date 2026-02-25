import { reactive, watch } from 'vue';
import { FaviconService } from '../../core/services/FaviconService';

export type WaveformType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export interface SettingsState {
  glowColor: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  beepWaveform: WaveformType;
  beepFrequency: number;
  beepDuration: number;
  beepRepetitions: number;
}

const STORAGE_KEY = 'timer_settings_v2';

const loadSettings = (): SettingsState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { 
      glowColor: '#39FF14', 
      soundEnabled: true, 
      notificationsEnabled: true,
      beepWaveform: 'square',
      beepFrequency: 50,
      beepDuration: 2,
      beepRepetitions: 3
    };
  }
  return JSON.parse(saved) as SettingsState;
};

export const settingsState = reactive<SettingsState>(loadSettings());

export const updateRootColor = (color: string): void => {
  document.documentElement.style.setProperty('--app-glow-color', color);
};

watch(settingsState, (newState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  updateRootColor(newState.glowColor);
  FaviconService.updateFavicon(newState.glowColor);
}, { deep: true });

updateRootColor(settingsState.glowColor);
FaviconService.updateFavicon(settingsState.glowColor);