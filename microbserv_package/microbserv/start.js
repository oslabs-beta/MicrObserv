// Private variables
let serviceName, config, dbQuery;
const defaultErrorMsg = 'Error occured in microbserv:';
const { Pool } = require('pg');
// SETUP
/* connectToDesktopAppDB
 * Description: connects package to desktop application db and assigns a query function to global variable dbQuery
 * Parameters:
 * - options = config object containing db Uri
 */
const connectToDesktopAppDB = async () => {
    try{    
        const pool = new Pool({
            connectionString: config.URI
        });
        dbQuery = (text, params, callback)=> pool.query(text, params, callback);
    }
    catch(err) {console.log('Error connecting URI: ', err) }
    // Create tracers table
    try{
        await dbQuery(`CREATE TABLE IF NOT EXISTS Tracers(
                        id SERIAL,
                        src VARCHAR NOT NULL,
                        dest VARCHAR,
                        traceId VARCHAR,
                        sender BOOLEAN NOT NULL,
                        startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        endTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        completed BOOLEAN DEFAULT FALSE,
                        PRIMARY KEY(id));`
                    );
    }
    catch(err) {
        console.log(`${defaultErrorMsg} Problem creating tracers table in db, Error: ${err}`);
    } 
    // Create update endTime function
    try{
        await dbQuery(`CREATE OR REPLACE FUNCTION update_endtime()
                        RETURNS TRIGGER AS 
                        $$
                            BEGIN
                                NEW.endTime = now();
                                RETURN NEW;
                            END;
                        $$ 
                        language 'plpgsql'`
                    );
    }
    catch(err) {
        console.log(`${defaultErrorMsg} Problem creating db function update_endTime, Error: ${err}`);
    }
    // Create on update trigger for endTime function
    try{
        await dbQuery(`CREATE TRIGGER update_endtime_on
                        BEFORE UPDATE
                        ON Tracers
                        FOR EACH ROW
                        EXECUTE PROCEDURE update_endtime();`
                    );
    }
    // Expected trigger already exists error
    catch(err) {}
    // Create logs table
    try {
        await dbQuery(`CREATE TABLE IF NOT EXISTS Logs(
                        id SERIAL,
                        src VARCHAR NOT NULL,
                        msg VARCHAR NOT NULL,
                        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY(id));`
                    );
    }
    catch(err) {
        console.log(`${defaultErrorMsg} Problem creating logs table in db, Error: ${err}`);
    }
}
// TRACERS
/* createTracer
 * Description: inserts new tracer into db with attributes src, dest, traceID, and sender
 * Parameters:
 * - src = requestor service
 * - dest = service endpoint
 * - traceID = unique id used as a common key between services for created tracer objects
 * - sender = specifies if created tracer is the sender
 */
const storeTracer = (name, dest, traceId, sender) => {
    try{
        return dbQuery(`INSERT INTO Tracers (src, dest, traceId, sender)
                        VALUES ($1, $2, $3, $4) RETURNING id;`,
                        [name, dest, traceId, sender]
                    )
                    .then(id => id.rows[0].id);
    }
    catch(err){
        console.log(`${defaultErrorMsg} Problem storing tracer in db, Error: ${err}`);
    }
}

/* httpRequestEventListener
 * Description: when a http request is triggered, a tracer object is created which tracks latency.
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
        // store new tracer in db
        const promise = storeTracer(serviceName, options.href, tracerId, true);
        // create new response event listener for http.request
        const onResponse = async (error, response, body) => {
            try{
                // wait until storeTracer promise resolves
                const id = await Promise.resolve(promise);
                // update tracer obj's response time
                await dbQuery(`UPDATE Tracers
                                SET completed = TRUE
                                WHERE id = $1;`,
                                [id]
                            );
            }
            catch(err) {
                console.log(`${defaultErrorMsg} Problem updating tracer response time in db, Error: ${err}`);
            }
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
        const promise = createTracer(name);
        newCallback = async (error, response, body) => {
            id = await Promise.resolve(promise);
            await dbQuery(`UPDATE Tracers
                            SET completed = TRUE
                            WHERE id = $1;`,
                            [id]
                        );
            if(callback) return callback(error, response, body);
        };
        return ogHttps(options, newCallback);
    }
}

/* expressServerEventListener
 * Description: For all express server requests, creates a tracer object which tracks latency
*/
const expressServerEventListener = () => {
    // Can track the http request dest by looking at host and href of request
    const http = require('http');
    const ogCreateServer = http.createServer;
    http.createServer = (options, requestListener) => {
        let server = ogCreateServer(options, requestListener);
        server.on('request', (request, response)=>{
            // Create response tracer in db
            const promise = createTracer(name, name, request.headers.id, false);
            const callback = async (error, response, body) => {
                id = await Promise.resolve(promise);
                await dbQuery(`UPDATE Tracers
                                    SET completed = TRUE
                                    WHERE id = $1;`, [id]);
            };
            // set event listener for when response is sent to client
            response.on('finish', callback);
        });
        return server;
    }
}
// LOGS
/* storeLog
 * Description: Helper function to insert console log messages into database.
 * Parameters:
 * - src: Service name console log originated from.
 * - msg: actual console logged message.
 */
const storeLog = (src, msg) => {
    try{
        dbQuery(`INSERT INTO Logs (src, msg)
                 VALUES ($1, $2);`, [src, msg]);
    }
    catch(err){
        console.log(error);
    }
}

/* consoleLogEventListener
 * Description: Event listener that adds any console logs to database as well as logging to terminal
 */
const consoleLogEventListener = () => {
    const console = require('console');
    const log = console.log;
    console.log = (message, args) =>{
        storeLog(serviceName, message);
        if(args) return log(message, args);
        return log(message);
    }
}

/* start
 * Description: Starts up event listeners and connects to desktop application database for synchonization.
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