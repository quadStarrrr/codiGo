const pg = require('pg');

const db = {};
const uri = 'postgres://codi:go@localhost/codigodb';

pg.connect(uri, (err, db_) => {
  if (err) throw new Error(err);
  db.conn = db_;
  db.done = () => { console.log('dbDone'); };

  console.log('Connected to codigodb!');
});

module.exports = db;

/*

// We'll be using connection pooling to minimize the overhead
// of creating/tearing down new database connections for each user.
// Create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config = {
  user: 'codi',             //env var: PGUSER
  database: 'codigodb',     //env var: PGDATABASE
  password: 'go',           //env var: PGPASSWORD
  host: 'localhost',        // Server hosting the postgres database
  port: 5432,               //env var: PGPORT
  max: 20,                  // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const db = {};

// this initializes a connection pool
// it will keep idle connections open for a 30 seconds
// and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function (err, client, done) {
  if (err) {
    done();
    console.log(err);
    return;
  } else {
    console.log('connected to database');
  }

  // store the connection and the done so we can execute
  // queries and release the client back to the pool when
  // we're done
  db.conn = client;
  db.done = done;

});

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});


module.exports = db;
*/
