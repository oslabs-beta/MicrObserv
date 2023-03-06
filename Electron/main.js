const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

console.log("MicrObserv Desktop is running");
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1320,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //loads webpage from
  win.loadFile("./dist/index.html");
};

app.whenReady().then(() => {
  createWindow();
  //Open a window if none are open (macOS)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//Quit the app when all windows are closed (Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
