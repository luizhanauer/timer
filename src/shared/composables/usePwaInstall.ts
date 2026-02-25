import { ref, onMounted, onUnmounted, type Ref } from 'vue';

// Estendendo o tipo Event para suportar a API específica do PWA
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePwaInstall = () => {
  const deferredPrompt: Ref<BeforeInstallPromptEvent | null> = ref(null);
  const isInstallable: Ref<boolean> = ref(false);

  const capturePrompt = (e: Event): void => {
    // Previne que o mini-infobar padrão do Chrome apareça
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent;
    isInstallable.value = true;
  };

  const promptInstall = async (): Promise<void> => {
    if (!deferredPrompt.value) return;

    // Exibe o prompt nativo de instalação
    await deferredPrompt.value.prompt();
    
    // Aguarda a resposta do usuário
    const { outcome } = await deferredPrompt.value.userChoice;

    if (outcome === 'accepted') {
      isInstallable.value = false;
    }
    
    // Limpa o prompt salvo, pois só pode ser usado uma vez
    deferredPrompt.value = null;
  };

  const dismiss = (): void => {
    isInstallable.value = false;
  };

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', capturePrompt);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', capturePrompt);
  });

  return { isInstallable, promptInstall, dismiss };
};