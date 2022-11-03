const express = require('express');
const parse = require('url');
const ws = require('ws');
const app = express();
//const server = require('http').createServer(app);
const path = require('path');
const PORT = 3000;
const connections = []
// start headless websocker

const wss = new ws.Server({ 
  server: app.listen(3000),
  host: 'localhost',
  path: '/'
 });

wss.on('connection', function connection(ws) {
    console.log("New Logs Client");
    connections.push(ws)
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
    ws.send('something, is coming from the BACKEND');
  });

app.use('/',express.static(path.join(__dirname, '../Electron/dist/')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../Electron/dist/index.html')));


// app.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
app.listen(() => console.log("Listening on port 3000"));

