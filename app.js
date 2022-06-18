require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const dbConnection = require("./config")

const indexRouter = require('./routes/admin.routes');
const apiExternalRoutes = require('./routes/api.external.routes');
const apiInternalRoutes = require('./routes/api.internal.routes');

const app = express();

dbConnection.dbConnection()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'P@kM@n',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiExternalRoutes);
app.use('/api/internal', apiInternalRoutes);

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
  res.render('pages/error.pages.ejs', {
    title : err.status || 500,
    message : err.message
  });
});

module.exports = app;
