const { contextBridge, ipcRenderer } = require('electron');

const invoke = (channel, callback = () => {return}, ...args) => {
  console.log(channel);
  ipcRenderer.invoke(channel, ...args).then((res) => callback(res));
};

const handle = (channel, callback) => {
  ipcRenderer.on(channel, (event, message) => callback(event, message));
};

const send = (channel, ...args) => {
  ipcRenderer.send(channel, args);
};

contextBridge.exposeInMainWorld('ipcBridge', {
  invoke: invoke,
  handle: handle,
  send: send
});

