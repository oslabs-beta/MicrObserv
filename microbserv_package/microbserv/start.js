// Private variables
let serviceName, config;
const defaultErrorMsg = 'Error occured in microbserv:';
const fetch = require('node-fetch');

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
    try{
      const dbId = await fetch('', {
        method: 'POST',
        body: tracer
      });
      return dbId;
    }
    catch(err){
        console.log(`${defaultErrorMsg} Problem sending network tracer to server, Error: ${err}`);
    }
}
/* updateNTracer
 * Description: updates network tracer's 'comlpeted' attribute on MicrObserv backend to true.
 * Network tracers track time it takes for a request to get sent to and from a service (network speed).
 * Parameters:
 * - id = DB primary key for updating tracer
 */
const updateNTracer = async id => {
  try{
    fetch('', {
      method: 'POST',
      body: id
    })
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
    const dbId = await fetch('', {
      method: 'POST',
      body: tracer
    });
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
  fetch('', {
    method: 'POST',
    body: id
  })
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
    http.request = (options, callback)=>{
        // create tracerId for synchronizing tracers created on both sender and receiver
        const tracerId = options.href + Date.now(); //option.href = receiver endpoint
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
            await updateNTracer({id: id});
            // invoke user passed response event listener
            if(callback) return callback(error, response, body);
        };
        // invoke http.request
        return ogHttp(options, onResponse);
    }

    // Same logic as http but for https
    const https = require('https');
    const ogHttps = https.request;
    https.request = (options, callback)=>{
        let newCallback = callback;
        const tracer = {
          src: serviceName,
          dest: options.href,
          tracerId: tracerId
        };
        const promise = createNTracer(tracer);
        newCallback = async (error, response, body) => {
            const id = await Promise.resolve(promise);
            await updateNTracer({id: id});
            if(callback) return callback(error, response, body);
        };
        return ogHttps(options, newCallback);
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
            // Send new process tracer to server
            const tracer = {
              src: serviceName,
              dest: options.href,
              tracerId: tracerId
            };
            const promise = createPTracer(tracer);
            const callback = async (error, response, body) => {
                id = await Promise.resolve(promise);
                await updatePTracer({id: id});
            };
            // set event listener for when response is sent to client
            response.on('finish', callback);
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
const createLog = async (log) => {
  try{
    await fetch('', {
      method: 'POST',
      body: log
    });
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
    connectToDesktopAppDB();
    httpRequestEventListener();
    expressServerEventListener();
    consoleLogEventListener();
}
module.exports = { start: start }