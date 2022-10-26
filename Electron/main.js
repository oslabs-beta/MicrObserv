const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Pool } = require('pg');
console.log('MicrObserv Desktop is running');

const myURI = 'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';
const URI = process.env.PG_URI || myURI;
const pool = new Pool({
  connectionString: URI
});

const pgQuery = async (text, params, callback)=> pool.query(text, params, callback);
console.log('before');
pool.query('SELECT * FROM Logs;').then((data)=>console.log(data));
console.log('after');
let win;

const getData = async (serviceName) => {
  try{
    console.log(serviceName);
    let results = await pgQuery('SELECT * FROM Logs;');
    return results;
  }
  catch(err){
    console.log(err);
  }
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
    getData(serviceName)
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
