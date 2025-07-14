declare global {
  interface Window {
    electronAPI: {
      sendMessage: (message: string) => void;
      onMessage: (callback: (message: string) => void) => void;
      getVersion: () => Promise<string>;
      openFile: () => Promise<string | undefined>;
      saveFile: (content: string) => Promise<string | undefined>;
    };
  }
}

export {}; 