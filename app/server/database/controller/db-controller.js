// pull the database connection over from the model
const db = require('../model/db-model');

function register(req, res, next) {
  let qStr = 'INSERT INTO users (username, password) VALUES ($1,$2)';
  console.log(qStr);
  let query = db.conn.query(qStr, [req.body.username, req.body.password]);
  query.on('end', (row) => {
    if (row) {
      // release the connection back to the pool
      db.done();
      next();
    }
  });

  // error handling
  query.on('error', (err) =>  {
    db.done();
    res.status(400).json({ message: err });
  });
}

/**
 * login to codigodb
 *
 * @param req
 * @param res
 */
function login(req, res, next) {
  let qStr = 'SELECT * FROM users WHERE username = $1 and password = $2';
  console.log(qStr);
  const query = db.conn.query(qStr, [req.body.username, req.body.password]);

  query.on('row', row => {
    if (row) {
      res.status = 200;
      res.locals.data = row;
      // release the connection back to the pool
      db.done();
      next();
    } else {
      db.done();
      res.status(400).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'User not found',
          schema: 'public',
          table: 'users',
        },
      });
    }
  });
}

function createQuestion(req, res, next) {
  let qStr = 'INSERT INTO questions ' +
    '(user_id, question_text, ip_address, port_id) VALUES ($1,$2,$3,$4)';
  console.log(qStr, req.body);
  const query = db.conn.query(qStr,
    [req.body.user_id,
     req.body.question_text,
     req.body.ip_address,
     req.body.port_id,
    ]);

  // console.log('back from query', query);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', (row) => {
    console.log('end', row);

    if (row) {
      // load up the response
      res.locals.data = row;
      // release the connection back to the pool
      db.done();
      next();
    } else {
      console.log(query);
    }
  });

  // error handling
  query.on('error', (err) =>  {
    console.log('error', err);
    db.done();
    res.status(400).json({ message: err });
  });
}

function createResponse(req, res, next) {
  let qStr = 'INSERT INTO responses ' +
    '(user_id, question_id, response_text, ip_address, port_id) VALUES ($1,$2,$3,$4,$5)';
  console.log(qStr, req.body);
  const query = db.conn.query(qStr,
    [req.body.user_id,
     req.body.question_id,
     req.body.response_text,
     req.body.ip_address,
     req.body.port_id,
    ]);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', row => {
    if (row) {
      // load up the response
      res.locals.data = row;
      // release the connection back to the pool
      db.done();
      next();
    }
  });

  // error handling
  query.on('error', (err) =>  {
    db.done();
    res.status(400).json({ message: err });
  });
}

function loadForum(req, res, next) {
  let qStr = 'SELECT * FROM questions';
  console.log(qStr);
  const query = db.conn.query(qStr);
  let questions = [];

  query.on('row', row => {
    if (row) {
      questions.push(row);
    } else {
      db.done();
      res.status(400).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'No questions found',
          schema: 'public',
          table: 'users',
        },
      });
    }
  });

  query.on('end', () => {
    res.locals.data = questions;
    // release the connection back to the pool
    db.done();
    next();
  });
}

function changeQuestionStatus(req, res, next) {
  let qStr = 'UPDATE questions SET status = $1 where question_id = $2 ';
  const query = db.conn.query(qStr,
    [req.body.status,
      req.body.question_id,
    ]);

  console.log(qStr, req.body);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', row => {
    if (row) {
      // load up the response
      res.locals.data = row;
      // release the connection back to the pool
      db.done();
      next();
    }
  });

  // error handling
  query.on('error', (err) =>  {
    db.done();
    res.status(400).json({ message: err });
  });
}

function changeResponseStatus(req, res, next) {
  let qStr = 'UPDATE responses SET status = $1 where response_id = $2 ';
  console.log(qStr);
  const query = db.conn.query(qStr,
    [req.body.status,
      req.body.response_id,
    ]);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', row => {
    if (row) {
      // load up the response
      res.locals.data = row;
      // release the connection back to the pool
      db.done();
      next();
    }
  });

  // error handling
  query.on('error', (err) =>  {
    db.done();
    res.status(400).json({ message: err });
  });
}

module.exports = {
  register,
  login,
  createQuestion,
  createResponse,
  loadForum,
  changeQuestionStatus,
  changeResponseStatus,
};
