const express = require('express');
const parse = require('url');
const ws = require('ws');
const path = require('path');
const controller = require('./controllers/controller.js');
const PORT = 3000;
const app = express();
const connections = []

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const wss = new ws.Server({ 
  server: app.listen(3001),
  host: 'localhost',
  path: '/'
 });
// const wss = new ws.Server({ noServer: true });
wss.on('connection', function connection(ws) {
    console.log("New Connection Client");
    connections.push(ws)
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
    // send all logs and tracers from db
    ws.send(JSON.stringify({
      logs: [{src: 'Service A', msg: 'hi', time: 'today'}],
      tracers: {
        names: ['Service A to B', 'Service B to A'],
        nTracerVals: [70, 90],
        pTracerVals: [40, 10],
      },
    }));
  });

app.use('/',express.static(path.join(__dirname, '../Electron/dist/')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../Electron/dist/index.html')));

app.get('/getLogs', controller.getLogs, (req, res) => {
  res.status(200).json(JSON.stringify(res.locals.logs));
});

app.get('/getTracers', controller.getTracers, (req, res) => {
  res.status(200).json(JSON.stringify(res.locals.tracers));
});

app.post('/addLog', controller.addLog, (req, res) => {
  res.status(200).json(JSON.stringify(req.body));
});

app.post('/addTracer', controller.addTracer, (req, res) => {
  res.status(200).json(JSON.stringify(req.body));
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
app.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});