const { contextBridge, ipcRenderer } = require("electron");
/**
 * To make sure there is no other events are invoked
 * and expose you app or computer to some problem (Attacks)!
 */

// Hidden stop in API action process
const validChannels = [
  "get-aucItems",
  "create-aucItem",
  "edit-aucItem",
  "delete-aucItem",
  "get-bidders",
  "create-bidder",
  "delete-bidder",
  "create-logo",
  "get-logos",
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
