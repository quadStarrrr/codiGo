// pull the database connection over from the model
const db = require('../model/db-model');

function stuff(req, res) {
  const results = [];
  let sql = 'SELECT * FROM events';

  if (Object.keys(req.query).length) {
    sql += ' WHERE ';
    for (let field in req.query) {
      sql += field + ' = ' + req.query[field];
    }
  }

  const query = db.conn.query(sql);
  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
    res.status(200).json(results);
  });
}

function queryOne(queryString, values, success, fail) {
  const query = db.conn.query(queryString, values);
  query.on('row', success(row));
  db.done();
}

function register(req, res) {
  queryOne('INSERT INTO users (username, password) VALUES ($1,$2)',
            [req.body.username, req.body.password],
            function (row) {
              if (row) {
                res.status(200).json(row);
              } else {
                res.status(418).json({ message: 'Failed to create user' });
              }
            }
  );
}

/**
 * login to codigodb
 *
 * @param req
 * @param res
 */
function login(req, res) {
  console.log("In login");

  let qStr = 'SELECT * FROM users WHERE username = $1 and password = $2';
  //let qStr = 'SELECT * FROM users';
  console.log(qStr);
  const query = db.conn.query(qStr, [req.body.username, req.body.password]);
  //const query = db.conn.query(qStr);
  console.log(query);
  query.on('row', row => {
    if (row) {
      console.log("success", row);
      db.done();
      res.status = 200;
      res.json(row);
    } else {
      console.log("failed", row);
      db.done();
      res.status = 418;
      res.json({ message: 'User not found' });
    }
  });

}

module.exports = { register, login };
