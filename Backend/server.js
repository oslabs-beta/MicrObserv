const express = require('express');
const ws = require('ws');
const path = require('path');

const PORT = 3000;
const app = express();

// start headless websocker
const wsServer =  new ws.Server({ noServer: true });

app.use('/dist', express.static(path.join(__dirname, '../Electron/dist')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../Electron/dist/index.html')));


const server = app.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));