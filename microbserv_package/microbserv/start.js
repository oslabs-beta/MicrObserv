const { Pool } = require('pg');

let dbQuery;
const initElectronDBConnection = async options => {
        const pool = new Pool({
            connectionString: options.URI
        });
        dbQuery = (text, params, callback)=> pool.query(text, params, callback);

        // Create Tracer table
        await dbQuery(`CREATE TABLE IF NOT EXISTS Tracers(
                       id SERIAL,
                       src VARCHAR NOT NULL,
                       dest VARCHAR NOT NULL,
                       sendTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       resTime TIMESTAMP,
                       PRIMARY KEY(id));`
        );
        // Create Logs table
        await dbQuery(`CREATE TABLE IF NOT EXISTS Logs(
                id SERIAL,
                src VARCHAR NOT NULL,
                msg VARCHAR NOT NULL,
                time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(id));`
        );
}


const createTracer = options => {
    console.log('Creating Tracer...');
    const defaultTracer = {
        // src: config.microserviceName,
        // dest:config.m
        // sendTime:
    }
}

const httpRequestEventListener = options =>{
    const http = require('http');
    const ogHttp = http.request;
    http.request = (options, callback)=>{
        console.log(options);
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

const consoleLogEventListener = options =>{
    const console = require('console');
    const log = console.log;
    console.log = (message, args) =>{
        const newLog = {
            logMsg: message
        };
        log(newLog);
    }
}
const start = options => {
    initElectronDBConnection(options);
    httpRequestEventListener(options);
    consoleLogEventListener(options);
}
module.exports = { start: start }