const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Pool } = require('pg');
const data = require('./demo/data');
const isDev = require('electron-is-dev');

// const myURI = 'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';
// const URI = process.env.PG_URI || myURI;
// const pool = new Pool({
  //   connectionString: URI
  // });
// const pgQuery = async (text, params, callback)=> pool.query(text, params, callback);
// console.log('before');
// pool.query('SELECT * FROM Logs;').then((data)=>console.log(data));
// console.log('after');

console.log('MicrObserv Desktop is running');
let clientWindow, processWindow;


const createWindow = () => {
  clientWindow = new BrowserWindow({
    width: 1000,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  //loads webpage from
  clientWindow.loadFile(
    isDev?
    './dist/index.html'
    : './index.html'
    );
    // create hidden window for offloading processes
    processWindow = new BrowserWindow({
        show: true,
        webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  processWindow.loadFile('./process.html');

  ipcMain.handle('sendProcess', async (event, endpoint, ...args) => {
    console.log(endpoint);
    console.log(args);
    // for(arg of args){
    //   console.log(arg);
    // }
    processWindow.webContents.send(endpoint, args);
  });
  
  ipcMain.handle('sendClient', async (event, endpoint, ...args) => {
    for(arg of args){
      console.log(arg);
    }
    clientWindow.webContents.send(endpoint, args);
  });
};

app.whenReady().then(() => {
  createWindow();

  //opening up dev tools in the electron window
  createWindow.webContents.openDevTools();
  //Open a window if none are open (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
});

//Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
