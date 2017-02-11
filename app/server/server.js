const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const app = express();

let server = require('http').createServer(app);
let io = require('socket.io').listen(server);



// pull in our DBI
const dbCtl = require('./database/controller/db-controller');
const cookieController = require('./database/controller/cookie-controller');

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


app.get('/webrtc', (req, res) => {
  res.redirect('/test/webRTCtest.html');
});

app.post('/login',
  cookieController.checkCookie,
  dbCtl.verifyUser,
  dbCtl.login,
  //dbCtl.releaseConnection,
  (req, res) => {
    res.json(res.locals.data).send();
    // res.redirect('/');
  });

app.post('/register',
  dbCtl.hashPassword,
  dbCtl.register,
  dbCtl.verifyUser,
<<<<<<< HEAD
  cookieController.setCookie,
 // dbCtl.releaseConnection,
=======
  //dbCtl.releaseConnection,
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb
  (req, res) => {
    console.log('end of chain, sending', res.locals.data);
    res.json(res.locals.data);
  });

app.get('/home', (req, res) => {
  res.status(200).json(res.locals.data);
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

<<<<<<< HEAD
// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true }),
// );
=======
//!!!!!! ONLY FOR TESTING, REMOVE LATER !!!!!!!!!//
// app.get('*', (req, res) => {
//   res.send(express.static(path.join(__dirname, './../../build')));
// });
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb

// Go ye therefore and listen for events on port 3000!
server.listen(3000, () => {
  console.log('CodiGo Server listening on 3000');
});

<<<<<<< HEAD

// Define the strategy for using passport which will be 
// used to authenticate users
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password' });
//       }
//       return done(null, user);
//     });
//   }
// ));
=======
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb
