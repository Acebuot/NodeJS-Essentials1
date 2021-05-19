var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import packages
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

//make connection code in app.js so we don't have to make multiple connections
MongoClient.connect('mongodb://localhost:27017/blogdb', {useUnifiedTopology: true} , (err, client) =>
{
  if (err) throw err;
  const db = client.db('blogdb');
  const collection = db.collection('posts');
  const users = db.collection('users');
  app.locals.collection = collection;
  app.locals.users = users;

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use imported packages
app.use(flash());
app.use(session(
  {
    secret: 'test secret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//changed to passport form app
//to make sure passport is using that as its strategy
passport.use(new LocalStrategy(
  (username, password, authCheckDone) =>
  {
    //find user with the username
    app.locals.users
      .findOne({username})
      .then(user => 
        {
          //if no user found
          if (!user) return authCheckDone(null, false, {message : "no such user" });

          //if user found but password is not same with password in database
          if(user.password !== password) return authCheckDone(null, false, {message : "invalid password"});

          //user found, password correct
          return authCheckDone(null,user);
        })
  }
));

//done with data and serializing it for next use
//to req.session.passport.user = {id: '..'}
passport.serializeUser((user,done) =>
{
  done(null, user._id );
});

//desrialize user of given id for use
passport.deserializeUser((id, done) => 
{
  done(null, {id});
})


app.use('/docs', indexRouter);
app.use('/', loginRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
