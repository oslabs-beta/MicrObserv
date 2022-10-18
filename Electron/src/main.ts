const { app, BrowserWindow } = require('electron');
console.log('Hello World');

//creates a new window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile('./index.html');

  // Open the DevTools.
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

//quits the app when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their
  // menu bar to stay active until the user quits
  // explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the
  // app when the dock icon is clicked and there are no
  // other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
