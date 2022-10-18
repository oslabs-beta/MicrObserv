

const httpRequestEventListener = ()=>{
    const https = require('https');
    const og = https.request;
    https.request = (options, callback)=>{
        console.log(callback);
        return og(options, callback);
    }
}

httpRequestEventListener();

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

consoleLogEventListener();