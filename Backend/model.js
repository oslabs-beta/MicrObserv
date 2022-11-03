const { Pool } = require('pg');

const myURI = 'postgres://nzknncbd:AzIp1howQ8DKmTlflRP18UNTisXgzBsa@otto.db.elephantsql.com/nzknncbd';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
