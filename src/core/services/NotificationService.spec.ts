import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { NotificationService } from "./NotificationService";

interface MockOscillator {
  type: string;
  frequency: { setValueAtTime: Mock };
  connect: Mock;
  start: Mock;
  stop: Mock;
}

interface MockGain {
  gain: {
    setValueAtTime: Mock;
    linearRampToValueAtTime: Mock;
    exponentialRampToValueAtTime: Mock;
  };
  connect: Mock;
}

describe("NotificationService", () => {
  let mockAudioContext: any;
  let mockOscillator: MockOscillator;
  let mockGain: MockGain;
  let showNotificationMock: Mock;

  beforeEach(() => {
    mockOscillator = {
      type: "sine",
      frequency: { setValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockGain = {
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };

    mockAudioContext = {
      state: "suspended",
      currentTime: 0,
      destination: {},
      resume: vi.fn().mockResolvedValue(undefined),
      createOscillator: vi.fn().mockReturnValue(mockOscillator),
      createGain: vi.fn().mockReturnValue(mockGain),
    };

    // CORREÇÃO: Usar a palavra-chave 'function' em vez de arrow function '() =>'
    // Isto permite que o Vitest e o JS consigam chamar esta função com o operador 'new'
    const AudioContextMock = vi.fn(function () {
      return mockAudioContext;
    });

    vi.stubGlobal("AudioContext", AudioContextMock);

    showNotificationMock = vi.fn();

    const mockServiceWorker = {
      ready: Promise.resolve({
        showNotification: showNotificationMock,
      }),
    };

    Object.defineProperty(navigator, "serviceWorker", {
      value: mockServiceWorker,
      writable: true,
    });

    const mockNotification = {
      permission: "default",
      requestPermission: vi.fn().mockResolvedValue("granted"),
    };

    vi.stubGlobal("Notification", mockNotification);

    (NotificationService as any).audioCtx = null;
  });

  it("deve inicializar o AudioContext e tentar retoma-lo (resume)", () => {
    NotificationService.initializeAudio();

    expect(window.AudioContext).toHaveBeenCalled();
    expect(mockAudioContext.resume).toHaveBeenCalled();
  });

  it("deve agendar os osciladores corretamente ao tocar o beep", () => {
    NotificationService.initializeAudio();

    NotificationService.playBeep("square", 50, 1, 2);

    expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(2);
    expect(mockAudioContext.createGain).toHaveBeenCalledTimes(2);

    expect(mockOscillator.type).toBe("square");
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(50, 0);
    expect(mockOscillator.start).toHaveBeenCalledTimes(2);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(2);
  });

  it("deve solicitar permissões de notificação se o estado for default", async () => {
    await NotificationService.requestPermissions();
    expect(window.Notification.requestPermission).toHaveBeenCalled();
  });

  it("deve exibir notificação via ServiceWorker se as permissões estiverem concedidas", async () => {
    vi.stubGlobal("Notification", { permission: "granted" });

    NotificationService.notify("Teste", "Corpo do teste");

    // E substitua por isto:
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(showNotificationMock).toHaveBeenCalledWith(
      "Teste",
      expect.objectContaining({
        body: "Corpo do teste",
        icon: "./icons/icon-192.png",
        requireInteraction: true,
      }),
    );
  });
});
