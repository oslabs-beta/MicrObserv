const createTracer = () => {
    console.log('Creating Tracer...');
}

const httpRequestEventListener = ()=>{
    const http = require('http');
    const ogHttp = http.request;
    http.request = (options, callback)=>{
        createTracer();
        return ogHttp(options, callback);
    }

    const https = require('https');
    const ogHttps = https.request;
    https.request = (options, callback)=>{
        createTracer();
        return ogHttps(options, callback);
    }
}

const consoleLogEventListener = ()=>{
    const console = require('console');
    const log = console.log;
    console.log = (message, args) =>{
        const newLog = {
            logMsg: message,
            attributeA: 'A'
        };
        log(newLog);
    }
}

module.exports = {
    httpRequestEventListener: httpRequestEventListener,
    consoleLogEventListener: consoleLogEventListener
}