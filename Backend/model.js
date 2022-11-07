const { Pool } = require('pg');

// SETUP
/* connectToDesktopAppDB
 * Description: connects package to desktop application db and assigns a query function to global variable dbQuery
 */
let pool;
const defaultErrorMsg = 'Error init db:';
const connectToDesktopAppDB = async () => {
  let dbQuery;
  try{    
      pool = new Pool({
          connectionString: process.env.PG_URI
      });
      dbQuery = (text, params, callback)=> pool.query(text, params, callback);
  }
  catch(err) {console.log('Error connecting URI: ', err) }
  // Create network tracers table
  try{
      await dbQuery(`CREATE TABLE IF NOT EXISTS nTracers(
                      id SERIAL,
                      nSrc VARCHAR NOT NULL,
                      dest VARCHAR NOT NULL,
                      traceId VARCHAR NOT NULL,
                      nStartTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                      nEndTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                      nCompleted BOOLEAN DEFAULT FALSE,
                      PRIMARY KEY(id));`
                  );
  }
  catch(err) {
      console.log(`${defaultErrorMsg} Problem creating network tracers table in db, Error: ${err}`);
  }
  // Create process tracers table
  try{
    await dbQuery(`CREATE TABLE IF NOT EXISTS pTracers(
                    id SERIAL,
                    pSrc VARCHAR NOT NULL,
                    traceId VARCHAR NOT NULL,
                    pStartTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    pEndTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    pCompleted BOOLEAN DEFAULT FALSE,
                    PRIMARY KEY(id));`
                );
  }
  catch(err) {
      console.log(`${defaultErrorMsg} Problem creating process tracers table in db, Error: ${err}`);
  } 
  // Create update nTracers endTime function
  try{
    await dbQuery(`CREATE OR REPLACE FUNCTION update_nEndtime()
                    RETURNS TRIGGER AS 
                    $$
                        BEGIN
                            NEW.nEndTime = now();
                            RETURN NEW;
                        END;
                    $$ 
                    language 'plpgsql'`
                );
  }
  catch(err) {
      console.log(`${defaultErrorMsg} Problem creating db function update_endTime, Error: ${err}`);
  }
  // Create update pTracers endTime function
  try{
    await dbQuery(`CREATE OR REPLACE FUNCTION update_pEndtime()
                    RETURNS TRIGGER AS 
                    $$
                        BEGIN
                            NEW.pEndTime = now();
                            RETURN NEW;
                        END;
                    $$ 
                    language 'plpgsql'`
                );
  }
  catch(err) {
      console.log(`${defaultErrorMsg} Problem creating db function update_endTime, Error: ${err}`);
  }
  // Create on nTracers update trigger for endTime function
  try{
      await dbQuery(`CREATE TRIGGER update_nEndtime_on
                      BEFORE UPDATE
                      ON nTracers
                      FOR EACH ROW
                      EXECUTE PROCEDURE update_nEndtime();`
                  );
  }
  // Expected trigger already exists error
  catch(err) {}
  // Create on nTracers update trigger for endTime function
  try{
    await dbQuery(`CREATE TRIGGER update_pEndtime_on
                    BEFORE UPDATE
                    ON pTracers
                    FOR EACH ROW
                    EXECUTE PROCEDURE update_pEndtime();`
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
                      time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                      PRIMARY KEY(id));`
                  );
  }
  catch(err) {
      console.log(`${defaultErrorMsg} Problem creating logs table in db, Error: ${err}`);
  }
   // Set timezone to LA time
  try {
    await dbQuery(`SET timezone = 'America/Los_Angeles';`);
  }
  catch(err) {
    console.log(`${defaultErrorMsg} Problem setting time zone in db, Error: ${err}`);
  }
}

connectToDesktopAppDB();


module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};
