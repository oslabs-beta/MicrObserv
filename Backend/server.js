const express = require('express');
const parse = require('url');
const ws = require('ws');
require('dotenv').config()
const path = require('path');
const npmPackRouter = require('./routes');
const PORT = 3000;
const app = express();
const electronController = require('./controllers/electronController');
const dbController = require('./controllers/dbController');

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
    electronController.connections.push(ws)
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
    // send all logs and tracers from db
    dbController.getLogs(ws);
    dbController.getTracers(ws);
    //dummy data for now
    // ws.send(JSON.stringify({
    //   logs: [{src: 'Service A', msg: 'hi1', time: 'today'}],
    //   tracers: {
    //     names: ['Service A to B', 'Service B to A'],
    //     nTracerVals: [70, 90],
    //     pTracerVals: [40, 10],
    //   },
    // }));
  });

app.use('/',express.static(path.join(__dirname, '../Electron/dist/')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../Electron/dist/index.html')));

app.use('/MicrObserv', npmPackRouter)

// Global error handler, will trigger if any errors occur when handling requests
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error occured during middleware execution',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
