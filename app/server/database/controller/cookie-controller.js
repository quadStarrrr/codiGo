const bcrypt = require('bcryptjs');
const db = require('../model/db-model');
const cookieController = {};

cookieController.setCookie = setCookie;
cookieController.checkCookie = checkCookie;

function checkCookie(req, res, next) {
  let userCookie = req.cookies;
  console.log(userCookie);
  if (!req.body.cookies) {
    next();
  } else {
    let qStr = 'SELECT * FROM users WHERE cookie_id = $1';
    let query = db.conn.query(qStr, [req.cookies]);

    // If there is a valid cookie, pass the info to next
    query.on('row', row => {
      if (row.user_id) {
        console.log('we are in the row part of cookie maker');
        res.status = 200;
        res.locals.data = row;
        next();
      }
    });

    query.on('end', result => {
      console.log(result);
      res.status(500).send('this is end');
    });

    query.on('error', err => {
      res.status(500).send('there was an error here', err);
    });
  }
}

function setCookie(req, res, next) {
  const d = new Date();
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(d.getTime(), salt, function(err, hash) {
      if (!err) {
        res.cookies(hash, { maxAge: 5000000, httpOnly: false });
        next();
      } else {
        res.status(500).send('there was an error');
      }
    });
  });
}

module.exports = cookieController;
