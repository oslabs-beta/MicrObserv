const express = require("express");
const cors = require('cors');
require('dotenv').config()
const { Pool } = require('pg');
// REQUIRE MODULE IN EACH SERVER
/* SETUP PACKAGE WITH OPTIONS
 * URI: (postgres uri for storing logs and tracers)
 */
/* FOR LOCAL TESTING
 * DO NOT PUSH YOUR "pgURI" TO GITHUB
 * REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI AND UNCOMMENT || EXPRESSION ON LINE 11
 */
// const pgURI = "";
const microbservURI = process.env.PG_URI // || pgURI;
const options = {
    URI: microbservURI
}
require('../../microbserv_package/microbserv/start').start(options, 'serviceB');


let dbQuery;
// INITIALIZE DATABASE
const startUp = async ()=>{
    try{
        // Connect to database
        const URI = process.env.DEMO_URI //|| pgURI;
        const pool = new Pool({
            connectionString: URI
        });
        dbQuery = (text, params, callback)=> pool.query(text, params, callback);

        // Create demo table
        await dbQuery(`CREATE TABLE IF NOT EXISTS b_data(
                       id SERIAL,
                       name VARCHAR,
                       value INT,
                       PRIMARY KEY(id));`
                    );

        // Check to see if database has already been populated
        const result = await dbQuery('SELECT * FROM b_data');
        if(!result.rows.length){
            // Populate demo db with random data
            for(let i=0; i < 5; i++){
                await dbQuery(`INSERT INTO b_data(name, value) VALUES($1, $2)`, [`data_${i}`, i]);
            }
        }

        // Successful initialization
        return true;
    }
    catch(err){
        console.log('Failed to run startUp: ', err);
        return false;
    }
}
const successfulStart = startUp();

if(successfulStart){
    // MIDDLEWARE
    const getDataFromDB = async (req, res, next) => {
        try{
            // Query database for all items and save results to res.locals for response
            const query = async () => {
                const results =  await dbQuery('SELECT * FROM b_data');
                res.locals.payload = results.rows;
                return next();
            }
            // Query database at given time-rate
            await setTimeout(query, req.query.reqTime);
        }
        catch(err){
            // Throw error
            return next({
                log: `Error making query to DB: ${err}`,
                message: { err: 'Error retreiving data in service b.' }
            });
        }
    }

    // SERVER

    const serviceB = express();
    serviceB.use(cors());
    const PORT = 8081;

    // Return data from database
    serviceB.use('/demo', getDataFromDB, (req, res)=> res.status(200).json(res.locals.payload));
    
    // Handle unknown endpoints
    serviceB.use((req, res) => res.status(404).send('no services listening to given endpoint.'));

    // Global error handler
    serviceB.use((err, req, res, next) => {
        const defaultErr = {
          log: 'Error occured during middleware execution',
          status: 500,
          message: { err: 'An error occurred' },
        };
        const errorObj = Object.assign({}, defaultErr, err);
        console.log(errorObj.log);
        return res.status(errorObj.status).json(errorObj.message);
    });

    // Start server
    serviceB.listen(PORT, () => console.log(`Started Service B, running on port: ${PORT}...`));
}