export {};

declare global {
  interface SoundCloudWidget {
    play: () => void;
    pause: () => void;
    toggle: () => void;
    setVolume: (volume: number) => void;
    bind: (event: string, callback: () => void) => void;
    unbind: (event: string) => void;
  }

  interface SoundCloudWidgetConstructor {
    (iframe: HTMLIFrameElement): SoundCloudWidget;

    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      PLAY_PROGRESS: string;
    };
  }

  interface Window {
    SC: {
      Widget: SoundCloudWidgetConstructor;
    };
  }
}
