var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminpageroute = require('./routes/admin/admin');
var loginroute = require('./routes/admin/login');
var logoutroute = require('./routes/admin/logout');
var userpageroute = require('./routes/user/users');
var homepageroute = require('./routes/homepage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', homepageroute);
app.use('/admin', adminpageroute);
app.use('/user', userpageroute);
app.use('/login', loginroute);
app.use('/logout', logoutroute);

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
  res.render('Homepage');
});

module.exports = app;
