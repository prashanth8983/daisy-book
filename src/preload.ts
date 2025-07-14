import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example API methods
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('message', (_event, message) => callback(message));
  },
  // Add more API methods as needed
  getVersion: () => ipcRenderer.invoke('get-version'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string) => ipcRenderer.invoke('dialog:saveFile', content)
});

// Type definitions for the exposed API
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