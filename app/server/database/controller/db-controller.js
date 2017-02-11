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
    res.locals.push(row);
  });

  query.on('end', () => {
    res.status(200).json(results);
  });
}

function queryOne(queryString, values, success, fail) {
  query.on('row', success(row));
  db.done();
}

function register(req, res, next) {
  let qStr = 'INSERT INTO users (username, password) VALUES ($1,$2)';
  const query = db.conn.query(qStr, [req.body.username, req.body.password]);
  query.on('row', row => {
    if (row) {
      res.locals.data = row;
      next();
    } else {
      res.status(401).json({ message: 'Failed to create user' });
    }
  });
}

/**
 * login to codigodb
 *
 * @param req
 * @param res
 */
function login(req, res, next) {
  console.log("In login");

  let qStr = 'SELECT * FROM users WHERE username = $1 and password = $2';

  console.log(qStr);
  const query = db.conn.query(qStr, [req.body.username, req.body.password]);

  console.log(query);
  query.on('row', row => {
    if (row) {
      console.log('success', row);
      db.done();
      res.status = 200;
      res.json(row);
    } else {
      console.log('failed', row);
      db.done();
      res.status = 418;
      res.json({ message: 'User not found' });
    }
  });

}

module.exports = { register, login };
