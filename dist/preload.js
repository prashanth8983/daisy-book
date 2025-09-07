"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
// Example: Add IPC methods here if needed for communication between main and renderer
// invoke: (channel: string, data?: any) => ipcRenderer.invoke(channel, data),
// send: (channel: string, data?: any) => ipcRenderer.send(channel, data),
// on: (channel: string, func: (...args: any[]) => void) => {
//   const validChannels = ['update-available', 'update-downloaded'];
//   if (validChannels.includes(channel)) {
//     ipcRenderer.on(channel, (event, ...args) => func(...args));
//   }
// },
});
