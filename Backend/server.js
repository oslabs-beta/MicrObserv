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

const data = [
  {
    id: 1,
    src: "service A",
    msg: "log1",
    time: "12:50"
  },
  {
    id: 2,
    src: "service A",
    msg: "log2",
    time: "12:55"
  },
  {
    id: 3,
    src: "service A",
    msg: "log3",
    time: "13:00"
  },
]


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
    ws.send(JSON.stringify(data));
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

app.listen(() => console.log(`Started server listening on port: ${PORT}`));