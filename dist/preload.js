"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => electron_1.ipcRenderer.send('message', message),
    onMessage: (callback) => {
        electron_1.ipcRenderer.on('message', (_event, message) => callback(message));
    },
    getVersion: () => electron_1.ipcRenderer.invoke('get-version'),
    openFile: () => electron_1.ipcRenderer.invoke('dialog:openFile'),
    saveFile: (content) => electron_1.ipcRenderer.invoke('dialog:saveFile', content)
});
//# sourceMappingURL=preload.js.map