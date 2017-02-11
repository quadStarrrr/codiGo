// pull the database connection over from the model
const db = require('../model/db-model');
const bcrypt = require('bcryptjs');
const cookieController = require('./cookie-controller');


function releaseConnection(req, res, next) {
  // release the connection back to the pool
  db.done();
  console.log('released DB connection back to pool');
  next();
}

function hashPassword(req, res, next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        req.body.hashedPassword = hash;
        next();
      }
    });
  });
}

function verifyUser(req, res, next) {
  let qStr = 'SELECT * FROM users WHERE username = $1';
  let query = db.conn.query(qStr, [req.body.username]);
  console.log('verifyUser>>>', qStr, req.body);
  query.on('row', (row) => {
    console.log('row', row.password, req.body.password);
    bcrypt.compare(req.body.password, row.password, (err, response) => {
      if (err) {
        console.log('bcrypt.compare error', err);
        res.status(500).send(err);
      } else {
        console.log('bcrypt.compare', response);
        if (response === true) {
          req.body.hashedPassword = row.password;
          res.locals.data = row;
          console.log('matched hash');
          next();
        } else {
          db.done();
          res.status(400).json({ message:
            {
              name: 'not authorized',
              severity: 'WARNING',
              detail: 'Incorrect Password',
            },
          });
        }
      }
    });
  });

  query.on('end', result => {
    console.log('end verified:', result.rowCount);
    if (!result.rowCount) {
      db.done();
      res.status(400).json({ message:
        {
          name: 'Not Found',
          severity: 'WARNING',
          detail: 'User not found',
        },
      });
    }
  });

  query.on('error', err => {
    db.done();
    console.log('error', err);
    res.status(500).send(err);
  });
}

function register(req, res, next) {
  let qStr = 'INSERT INTO users (username, password) VALUES ($1,$2)';
  console.log('register>>>', qStr, req.body);
  let query = db.conn.query(qStr, [req.body.username, req.body.hashedPassword]);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', (result) => {
    console.log('end - inserted:', result.rowCount);
    if (result.rowCount) {
      next();
    } else {
      res.status(500).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'Could not store new user',
          schema: 'public',
          table: 'users',
        },
      });
    }
  });

  // error handling
  query.on('error', (err) =>  {
    console.log('error', err);
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
  console.log('login>>>', qStr, req.body);
  const query = db.conn.query(qStr, [req.body.username, req.body.hashedPassword]);

  query.on('row', row => {
    console.log('row', row.user_id);
    if (row.user_id) {
      res.status = 200;
      res.locals.data = row;
      next();
    } else {
      // Release the db connection
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
    '(user_id, question_text, ip_address, port_id, question_title) VALUES ($1,$2,$3,$4,$5)';
  console.log('createQuestion>>>', qStr, req.body);
  const query = db.conn.query(qStr,
    [req.body.user_id,
     req.body.question_text,
     req.body.ip_address,
     req.body.port_id,
     req.body.question_title,
    ]);

  // console.log('back from query', query);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', (result) => {
    if (result.rowCount) {
      next();
    } else {
      // Release the db connection
      db.done();
      res.status(500).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'Could not store question',
          schema: 'public',
          table: 'responses',
        },
      });
    }
  });

  // error handling
  query.on('error', (err) =>  {
    console.log('error', err);
    // release the db connection
    db.done();
    res.status(400).json({ message: err });
  });
}

function createResponse(req, res, next) {
  let qStr = 'INSERT INTO responses ' +
    '(user_id, question_id, response_text, ip_address, port_id) VALUES ($1,$2,$3,$4,$5)';
  console.log('createResponse>>>', qStr, req.body);
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

  query.on('end', result => {
    if (result.rowCount) {
      next();
    } else {
      // Release the db connection
      db.done();
      res.status(500).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'Could not store response',
          schema: 'public',
          table: 'responses',
        },
      });
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
  console.log('loadForum>>>', qStr);
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
    next();
  });
}

function changeQuestionStatus(req, res, next) {
  let qStr = 'UPDATE questions SET status = $1 where question_id = $2 ';
  console.log('changeQuestionStatus>>>', qStr);
  const query = db.conn.query(qStr,
    [req.body.status,
     req.body.question_id,]);

  console.log(qStr, req.body);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', result => {
    console.log('end - updated:', result.rowCount);
    if (result.rowCount) {
      next();
    } else {
      res.status(400).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'No question found',
          schema: 'public',
          table: 'questions',
        },
      });
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
  console.log('changeResponseStatus>>>', qStr);
  const query = db.conn.query(qStr,
    [req.body.status,
      req.body.response_id,
    ]);

  query.on('row', row => {
    console.log('row', row);
    next();
  });

  query.on('end', result => {
    next();
  });

  query.on('end', result => {
    console.log('end - updated:', result.rowCount);
    if (result.rowCount) {
      next();
    } else {
      res.status(400).json({ message:
        {
          name: 'error',
          severity: 'ERROR',
          detail: 'No response found',
          schema: 'public',
          table: 'responses',
        },
      });
    }
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
  hashPassword,
  releaseConnection,
  verifyUser,
};


// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash('B4c0/\/', salt, function(err, hash) {
//     // Store hash in db
//   })
// })

// bcrypt.compare(req.body.password, hash, function(err, res) {
//   if (err) {
//     res.statusCode(400).send(err);
//   } else {
//     if (res) {
//       res.status(200).send(res);
//     } else {
//       res.status(400).send('Your password is not correct');
//     }
//   }
// })
