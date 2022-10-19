const { Pool } = require('pg');


let dbQuery;
const initElectronDBConnection = async options => {
    try{    
        const pool = new Pool({
            connectionString: options.URI
        });
        dbQuery = (text, params, callback)=> pool.query(text, params, callback);
    }
    catch(err) {console.log('Error connecting URI: ', err) }

        // Create Tracer table
        try{
            await dbQuery(`CREATE TABLE IF NOT EXISTS Tracers(
                             id SERIAL,
                             src VARCHAR NOT NULL,
                             dest VARCHAR,
                             sendTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             resTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             resReceived BOOLEAN DEFAULT FALSE,
                             PRIMARY KEY(id));`
            );
        }
        catch(err) {console.log(err)}
         
        // Create function
         try{
            await dbQuery(`CREATE OR REPLACE FUNCTION update_timestamp()
            RETURNS TRIGGER AS 
            $$
                BEGIN
                    NEW.resTime = now();
                    RETURN NEW;
                END;
            $$ 
            language 'plpgsql'`
            );
        }
        catch(err) {console.log(err)}

        // Create trigger
        // try{
        //     await dbQuery(`CREATE OR REPLACE TRIGGER update_timestamp_on
        //                     BEFORE UPDATE
        //                     ON
        //                         Tracers
        //                     FOR EACH ROW
        //                    EXECUTE PROCEDURE update_timestamp();`
        //     );
        // }
        // catch(err) {console.log(err)}

        // Create Logs table
        try {
            await dbQuery(`CREATE TABLE IF NOT EXISTS Logs(
                            id SERIAL,
                            src VARCHAR NOT NULL,
                            msg VARCHAR NOT NULL,
                            time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY(id));`
            );
        }
        catch(err) {console.log('Error creating Logs table: ', err)}
}


const createTracer = (name) => {
    console.log('Creating Tracer...');
    //insert into db get serial id and then store in cache and with id as key
    try{
        return dbQuery(`INSERT INTO Tracers (src)
                    VALUES ($1) RETURNING id;`, [name])
                    .then(id => {
                        return id.rows[0].id; 
                    });
    }
    catch(err){
        console.log(err);
    }
}
//reassign callback
//once invoked update resReceived to true and the resTime will automatically update with current time

const httpRequestEventListener = (name) =>{
    // save http.request in a tmp variable
    const http = require('http');
    const ogHttp = http.request;
    // reassign http.request to custom function
    http.request = (options, callback)=>{
        // create new tracer object and store in db
        const promise = createTracer(name);
        // create new response event listener for http.request
        const newCallback = async (error, response, body) => {
            // wait until createTracer resolves
            const tracerId = await Promise.resolve(promise);
            // update tracer obj's response time
            await dbQuery(`UPDATE Tracers
                                SET resReceived = TRUE
                                WHERE id = $1;`, [tracerId]);
            // invoke user passed callback
            if(callback) return callback(error, response, body);
        };
        // invoke http.request
        return ogHttp(options, newCallback);
    }

    // Same logic as http but for https
    const https = require('https');
    const ogHttps = https.request;
    https.request = (options, callback)=>{
        let newCallback = callback;
        const promise = createTracer(name);
        newCallback = async (error, response, body) => {
            id = await Promise.resolve(promise);
            await dbQuery(`UPDATE Tracers
                                SET resReceived = TRUE
                                WHERE id = $1;`, [id]);
            if(callback) return callback(error, response, body);
        };
        return ogHttps(options, newCallback);
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
const start = (options, name) => {
    initElectronDBConnection(options);
    httpRequestEventListener(name);
    consoleLogEventListener(options);
}
module.exports = { start: start }