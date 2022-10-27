const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Pool } = require('pg');
const data = require('./demo/data');

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
let win;

const getLogs = async (serviceName) => {
  data.generateLogs(serviceName);
  if(!serviceName) return data.logs;
  const serviceLogs = [];
  for(const log of data.logs){
    if(log.src === serviceName) serviceLogs.push(log);
  }
  return serviceLogs;
}
const getTracers = async (serviceName) => {
  data.generateTracers(serviceName);
  if(!serviceName) return data.tracers;
  const serviceTracers = [];
  for(const tracer of data.tracers){
    if(tracer.src === serviceName || tracer.dest === serviceName)
      serviceTracers.push(tracer);
  }
  return serviceTracers;
}

// getData('serviceA').then((data)=>console.log(data));

const createWindow = () => {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('pgLogs', async (event, serviceName) => {
    // win.webContents.send('res', 'dbLogs');
    getLogs(serviceName)
    .then((data) => {
      console.log(data);
      win.webContents.send('res', data);
    });
  });

  ipcMain.handle('pgTracers', async (event, serviceName) => {
    // win.webContents.send('res', 'dbLogs');
    getTracers(serviceName)
    .then((data) => {
      console.log(data);
      win.webContents.send('res', data);
    });
  });
  
  //loads webpage from
  win.loadFile('./dist/index.html');
};

app.whenReady().then(() => {
  createWindow();
  //Open a window if none are open (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
});

//Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
