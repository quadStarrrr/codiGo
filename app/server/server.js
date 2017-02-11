const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// pull in our DBI
const dbCtl = require('./database/controller/db-controller');

// MIDDLEWAREZ!
// log connections and server responses
app.use(logger('dev'));

// express.static is a piece of middleware that  allows us to serve files
// (images, stylesheets, etc) from a particular directory
app.use(express.static(path.join(__dirname, './../../build')));

// load up contents of the POST body into request.body
app.use(bodyParser.json());

// allow for urlencoded requests from curl tests
app.use(bodyParser.urlencoded({ extended: false }));

// load up the cookie into request.cookies
app.use(cookieParser());

app.use((req, res, next) => { console.log('incoming request', req.body); next(); });

// ROUTEZ!!!
app.get('/', (req, res) => {
  console.log('I see you!');
  res.status(200).send('pong');
});

app.post('/login',
  dbCtl.verifyUser,
  dbCtl.login,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

app.post('/register',
  dbCtl.hashPassword,
  dbCtl.register,
  dbCtl.verifyUser,
  //dbCtl.releaseConnection,
  (req, res) => {
    console.log('end of chain, sending', res.locals.data);
    res.json(res.locals.data);
  });

app.post('/createQuestion',
  dbCtl.createQuestion,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

app.post('/createResponse',
  dbCtl.createResponse,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

app.post('/changeQuestionStatus',
  dbCtl.changeQuestionStatus,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

app.post('/changeResponseStatus',
  dbCtl.changeResponseStatus,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

app.get('/loadForum',
  dbCtl.loadForum,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data);
  });

// Go ye therefore and listen for events on port 3000!
app.listen(3000, () => {
  console.log('CodiGo Server listening on 3000');
});
