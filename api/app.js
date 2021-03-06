var express = require('express');
var app = express();
const cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser');
var createError = require('http-errors');
var logger = require('morgan');
require("dotenv").config();
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var profilesRouter = require('./routes/profiles');
var messagesRouter = require('./routes/messages');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/profiles', profilesRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.json({
    message: err.message,
    status: err.status
  });
});

module.exports = app;
