const express = require('express');
// const ws = require('ws');
const path = require('path');
const controller = require('./controllers/controller.js');

const PORT = 3000;
const app = express();

// start headless websocker
// const wsServer =  new ws.Server({ noServer: true });
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/dist', express.static(path.join(__dirname, '../Electron/dist')));
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

const server = app.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
