const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Pool } = require('pg');
const data = require('./demo/data');
const isDev = require('electron-is-dev');
const {fork, spawn} = require('child_process');

const myURI = 'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';
const URI = process.env.PG_URI || myURI;
const pool = new Pool({
    connectionString: URI
  });
const pgQuery = async (text, params, callback)=> pool.query(text, params, callback);
console.log('before');
pool.query('SELECT * FROM public.logs;').then((data)=>console.log(data));
console.log('after');

console.log('MicrObserv Desktop is running');
let clientWindow, processWindow;


const createWindow = () => {
  clientWindow = new BrowserWindow({
    width: 1000,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  //loads webpage from
  clientWindow.loadFile(
    isDev?
    './dist/index.html'
    : './index.html'
    );
  
  // ipcMain.handle('getLogs', async (event, endpoint, ...args) => {
  //   for(arg of args){
  //     console.log(arg);
  //   }
  //   clientWindow.webContents.send(endpoint, args);
  // });
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


// console.log(data);
ipcMain.handle('getLogs', (e) => {
  const p = fork(path.join(__dirname, 'getLogs.js'), ['serviceA'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });
  p.stdout.on('data', (d) => {
    console.log(d.toString());
  });
  p.stderr.on('data', (d) => {
    console.log(d.toString());
  });
  p.send([JSON.stringify(data), '']);
  p.on('message', (m) => {
    clientWindow.webContents.send('logs', m);
  });
  // const p = spawn('pwd');
  // p.stdout.on('data', (data) => {
  //   console.log(`child stdout:\n${data}`);
  // });
});
