import type { WaveformType } from '../../shared/store/useSettings';

interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number | number[];
}

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export class NotificationService {
  private static audioCtx: AudioContext | null = null;

  public static async requestPermissions(): Promise<void> {
    try {
      if (!('Notification' in window)) return;
      
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    } catch (e) {
      console.warn('Erro ao solicitar permissão de notificação:', e);
    }
  }

  public static notify(title: string, body: string): void {
    try {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      if (!('serviceWorker' in navigator)) return;

      const options: ExtendedNotificationOptions = {
        body,
        icon: './icons/icon-192.png',
        vibrate: [200, 100, 200],
        requireInteraction: true
      };

      navigator.serviceWorker.ready
        .then((registration: ServiceWorkerRegistration) => {
          registration.showNotification(title, options);
        })
        .catch((error: unknown) => {
          console.warn('Erro ao exibir notificação pelo Service Worker:', error);
        });
    } catch (e) {
      console.warn('Falha inesperada na API de Notificação:', e);
    }
  }

  public static initializeAudio(): void {
    try {
      if (!this.audioCtx) {
        const customWindow = window as unknown as WebkitWindow;
        const AudioContextClass = window.AudioContext || customWindow.webkitAudioContext;
        
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn('Falha ao inicializar o motor de áudio:', e);
    }
  }

  public static playBeep(waveform: WaveformType, frequency: number, duration: number, repetitions: number): void {
    try {
      if (!this.audioCtx) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }

      const now = this.audioCtx.currentTime;
      const pauseDuration = 0.3; // Pausa fixa de 300ms entre as repetições

      for (let i = 0; i < repetitions; i++) {
        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, now);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        const startTime = now + (i * (duration + pauseDuration));
        const endTime = startTime + duration;

        // Controle de envelope para evitar ruídos de clique
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05); // Fade in rápido
        gainNode.gain.linearRampToValueAtTime(0, endTime); // Fade out até o fim

        oscillator.start(startTime);
        oscillator.stop(endTime);
      }
    } catch (e) {
      console.warn('Erro ao tocar o sinal sonoro:', e);
    }
  }
}