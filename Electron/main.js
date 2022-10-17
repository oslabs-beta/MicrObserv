const { app, BrowserWindow } = require('electron');
console.log('Hello World');

//creates a new window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
  //open a window if non are open (MacOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//quits the app when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});
