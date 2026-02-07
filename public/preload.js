const { contextBridge, ipcRenderer } = require("electron");
/**
 * To make sure there is no other events are invoked
 * and expose you app or computer to some problem (Attacks)!
 */

// Hidden in API action process
const validChannels = [
  "get-aucItems",
  "create-aucItem",
  "delete-aucItem",
  "get-bidders",
  "create-bidder",
  "delete-bidder",
];

contextBridge.exposeInMainWorld("ipc", {
  invoke: (channel, args) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args);
    }
  },
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
