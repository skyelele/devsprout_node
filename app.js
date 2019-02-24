require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// require routes
const index     = require('./routes/index');
const posts     = require('./routes/posts');
const reviews   = require('./routes/reviews');

const app = express();

// connect to the database
mongoose.connect('mongodb://localhost:27017/surf-shop-mapbox', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set public assets directory
app.use(express.static('public'));

// uncomment after placing your favicon in /public
//app.use(favicon(push.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Configure Passport and Sessions
app.use(session({
  secret: 'cute boopy boop',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
//      PASSPORT      ||    PASSPORT-LOCAL-MONGOOSE
passport.serializeUser(User.serializeUser());
//      PASSPORT      ||    PASSPORT-LOCAL-MONGOOSE
passport.deserializeUser(User.deserializeUser());

// set title middleware
app.use(function(req, res, next) {
  res.locals.title = 'Surf Shop';
  next();
});

// Mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
