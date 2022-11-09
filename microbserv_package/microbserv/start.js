// Private variables
let serviceName, config;
const defaultErrorMsg = 'Error occured in microbserv:';
// using http for custom requests to the MicrObserv server
const http = require('http');


// TRACERS


/* createNTracer
 * Description: sends new 'network tracer' to MicrObserv backend server with attributes src, dest, traceID
 * Network tracers track time it takes for a request to get sent to and from a service (network speed).
 * Parameters:
 * - src = requestor service
 * - dest = service endpoint
 * - traceID = unique id used as a common key between services for created tracer objects
 */
const createNTracer = async tracer => {
  return new Promise ((resolve, reject) => {
    try{
      tracer = JSON.stringify(tracer);
      const opts = {
        hostname: 'localhost',
        port: 3000,
        path: '/MicrObserv/newNTracer',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(tracer)
        }
      }
      const req = http.request(opts, res => {
        // Data will be tracerId sent as JSON
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }, true);

      req.on('error', error => reject(error));
      req.write(tracer);
      req.end();
    }
    catch(err){
        console.log(`${defaultErrorMsg} Problem sending network tracer to server, Error: ${err}`);
        reject(err);
    }
  })
}
/* updateNTracer
 * Description: updates network tracer's 'comlpeted' attribute on MicrObserv backend to true.
 * Network tracers track time it takes for a request to get sent to and from a service (network speed).
 * Parameters:
 * - id = DB primary key for updating tracer
 */
const updateNTracer = async id => {
  try{
    id = JSON.stringify(id);
    const opts = {
      hostname: 'localhost',
      port: 3000,
      path: '/MicrObserv/updateNTracer',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(id)
      }
    }
    const req = http.request(opts, res => {}, true);

    req.on('error', error => console.error(error));
    req.write(id);
    req.end();
  }
  catch(err){
    console.log(`${defaultErrorMsg} Problem sending network tracer update to server, Error: ${err}`);
  }
}

/* createPTracer
 * Description: sends new 'process tracer' to MicrObserv backend server with attributes src, dest, traceID
 * Process tracers track time it takes for a microservice process to complete.
 * Parameters:
 * - src = requestor service
 * - dest = service endpoint
 * - traceID = unique id used as a common key between services for created tracer objects
 */
const createPTracer = async tracer => {
  try{
    tracer = JSON.stringify(tracer);
    const opts = {
      hostname: 'localhost',
      port: 3000,
      path: '/MicrObserv/newPTracer',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(tracer)
      }
    }
    let dbId;
    const req = http.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => dbId = data);
    }, true);

    req.on('error', error => console.error(error));
    req.write(tracer);
    req.end();
    return dbId;
  }
  catch(err){
      console.log(`${defaultErrorMsg} Problem sending process tracer to server, Error: ${err}`);
  }
}
/* updatePTracer
 * Description: updates process tracer's 'comlpeted' attribute on MicrObserv backend to true.
 * Process tracers track time it takes for a microservice process to complete.
 * Parameters:
 * - id = DB primary key for updating tracer
 */
const updatePTracer = async id => {
try{
  id = JSON.stringify(id);
  const opts = {
    hostname: 'localhost',
    port: 3000,
    path: '/MicrObserv/updatePTracer',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(id)
    }
  }
  const req = http.request(opts, res => {}, true);
  req.on('error', error => console.error(error));
  req.write(id);
  req.end();
}
catch(err){
  console.log(`${defaultErrorMsg} Problem sending process tracer update to server, Error: ${err}`);
}
}

// TRACER EVENT LISTENERS
/* httpRequestEventListener
 * Description: when a http request is triggered, a network tracer object is created which tracks network latency.
 */
const httpRequestEventListener = () => {
    // save http.request in a temp variable
    const http = require('http');
    const ogHttp = http.request;
    // reassign http.request to custom function
    http.request = (options, callback, fromMicrObserv)=>{
      // ignore http requests coming from this npm package
      if(!fromMicrObserv){
        // create tracerId for synchronizing tracers created on both sender and receiver
        const tracerId = options.href + Math.random(Date.now()); //option.href = receiver endpoint
        options.headers['id'] = tracerId;
        // send new network tracer to server
        const tracer = {
          src: serviceName,
          dest: options.href,
          tracerId: tracerId
        };
        const promise = createNTracer(tracer);
        // create new response event listener for http.request
        const onResponse = async (error, response, body) => {
            // wait until createNTracer promise resolves
            const id = await Promise.resolve(promise);
            // update tracer obj's response time
            await updateNTracer({
              id: id,
              tracerId: tracerId
            });
            // invoke user passed response event listener
            // if(callback) return callback(error, response, body);
        };
        return ogHttp(options, onResponse);
      }
      // invoke http.request
      return ogHttp(options, callback);
    }

    // Same logic as http but for https
    const https = require('https');
    const ogHttps = https.request;
    https.request = (options, callback, fromMicrObserv)=>{
      if(!fromMicrObserv){
        const tracerId = options.href + Math.random(Date.now());
        options.headers['id'] = tracerId;
        const tracer = {
          src: serviceName,
          dest: options.href,
          tracerId: tracerId
        };
        const promise = createNTracer(tracer);
        const onResponse = async (error, response, body) => {
            const id = await Promise.resolve(promise);
            await updateNTracer({
              id: id,
              tracerId: tracerId
            });
            if(callback) return callback(error, response, body);
        };
        return ogHttps(options, onResponse);
      }
      return ogHttps(options, callback);
    }
}
/* expressServerEventListener
 * Description: For all express server requests, creates a process tracer object which tracks microservice's latency
*/
const expressServerEventListener = () => {
    // Can track the http request dest by looking at host and href of request
    const http = require('http');
    const ogCreateServer = http.createServer;
    http.createServer = (options, requestListener) => {
        let server = ogCreateServer(options, requestListener);
        server.on('request', (request, response)=>{
            // ignore requests that don't have an associated tracerId
            if(request.headers.id){
              // Send new process tracer to server
              const tracer = {
                src: serviceName,
                tracerId: request.headers.id
              };
              const promise = createPTracer(tracer);
              const callback = async (error, response, body) => {
                  id = await Promise.resolve(promise);
                  await updatePTracer({
                    id: id,
                    tracerId: request.headers.id
                  });
              };
              // set event listener for when response is sent to client
              response.on('finish', callback);
            }
        });
        return server;
    }

    const https = require('https');
    const ogCreateSecureServer = https.createServer;
    https.createServer = (options, requestListener) => {
        let server = ogCreateSecureServer(options, requestListener);
        server.on('request', (request, response)=>{
          // ignore requests that don't have an associated tracerId
          if(request.headers.id){
            // Send new process tracer to server
            const tracer = {
              src: serviceName,
              tracerId: request.headers.id
            };
            const promise = createPTracer(tracer);
            const callback = async (error, response, body) => {
                id = await Promise.resolve(promise);
                await updatePTracer({
                  id: id,
                  tracerId: request.headers.id
                });
            };
            // set event listener for when response is sent to client
            response.on('finish', callback);
          }
      });
      return server;
    }
}

// LOGS
/* createLog
 * Description: Helper function to send console log messages to MicrObserv backend server.
 * Parameters:
 * - log = log object to send to server
 */
const createLog = async log => {
  try{
    log = JSON.stringify(log);
    const opts = {
      hostname: 'localhost',
      port: 3000,
      path: '/MicrObserv/newLog',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(log)
      }
    }
    const req = http.request(opts, res => {}, true);

    req.on('error', error => console.error(error));
    req.write(log);
    req.end();
  }
  catch(err){
      console.log(`${defaultErrorMsg} Problem sending log to server, Error: ${err}`);
  }
}
/* consoleLogEventListener
 * Description: Event listener that adds any console logs to database as well as logging to terminal
 */
const consoleLogEventListener = () => {
    const console = require('console');
    const log = console.log;
    console.log = (message, args) =>{
        const newLog = {
          src: serviceName,
          msg: message
        }
        const promise = createLog(newLog);
        if(args) log(message, args);
        log(message);
        Promise.resolve(promise);
    }
}

/* start
 * Description: Initializes event listeners.
 * Parmeters:
 * - options: user defined configurations
 * - name: Service name
 */
const start = (options, name) => {
    config = options;
    serviceName = name;
    httpRequestEventListener();
    expressServerEventListener();
    consoleLogEventListener();
}
module.exports = { start: start }
