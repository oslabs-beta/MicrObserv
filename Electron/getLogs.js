const { Pool } = require('pg');
const myURI = 'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';
const URI = process.env.PG_URI || myURI;
const pool = new Pool({
    connectionString: URI
  });
const pgQuery = async (text, params, callback)=> pool.query(text, params, callback);
const data = require('./demo/data');
// console.log(data);
process.on('message', async (m) => {
  console.log(m);
  // console.log('before');
  // await pool.query('SELECT * FROM Logs;').then((data)=>console.log(data));
  // console.log('after');
  // Generate mock logs data
  const getLogs = async (serviceName) => {
    // console.log(data);
    data.generateLogs(serviceName);
    console.log(data.logs);
    if(serviceName === '') process.send(data.logs);
    const serviceLogs = [];
    for(const log of data.logs){
      if(log.src === serviceName) serviceLogs.push(log);
    }
    // console.log(serviceLogs);
    process.send(serviceLogs);
    // window.ipcBridge.send('sendClient', 'res', serviceLogs);
  }
  // Generate mock tracers data
  const getTracers = async (serviceName) => {
    data.generateTracers(serviceName);
    if(!serviceName) return data.tracers;
    const serviceTracers = [];
    for(const tracer of data.tracers){
      if(tracer.src === serviceName || tracer.dest === serviceName)
        serviceTracers.push(tracer);
    }
    console.log(serviceTracers);
    process.send(serviceTracers);
  }
  getLogs(m[1]);
  // getTracers(m);
})