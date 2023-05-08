require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var apiRouter = require('./routes/api');
var apiMiddleware = require('./middlewares/api');
var apiResponse = require('./utils/apiResponse');
var apiErrorHandler = require('./utils/apiErrorHandler');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/api',apiMiddleware, apiRouter, apiErrorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return apiResponse({
    success: false,
    code: 404,
    message: 'not found',
  }, res)
});

module.exports = app;
