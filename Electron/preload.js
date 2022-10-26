const { contextBridge, ipcRenderer } = require('electron');

const invoke = (channel, args, callback = () => {return}) => {
  ipcRenderer.invoke(channel, args).then((res) => callback(res));
};

const handle = (channel, callback) => {
  ipcRenderer.on(channel, (event, message) => callback(event, message));
};

contextBridge.exposeInMainWorld('ipcBridge', {
  invoke: invoke,
  handle: handle
});

