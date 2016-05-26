var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var env = require('node-env-file');

var app = express();

if (app.get('env') != "production") {
  app.set('env', 'development');
}

// if in development mode, load .env variables
if (app.get('env') === "development") {
  env(__dirname + '/.env');
  console.log('Running in DEVELOPMENT environment');
}else{
  console.log('Running in PRODUCTION environment');
}

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));


var apiRoutes = require('./routes/routes.api');
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
