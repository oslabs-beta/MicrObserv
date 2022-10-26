const { contextBridge, ipcRenderer } = require('electron');
const { Pool } = require('pg');

const myURI =
  'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

const pgQuery = (text, params, callback) => pool.query(text, params, callback);
const server = {
  pgQuery: pgQuery,
};
// contextBridge.exposeInMainWorld('server', server);
console.log('Inside PreLoad');

contextBridge.exposeInMainWorld('versions', {
  everything: () => process.getSystemMemoryInfo().total,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  pgQuery: pgQuery,
  // we can also expose variables, not just functions
});

