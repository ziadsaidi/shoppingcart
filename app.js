var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var expressHbs = require("express-handlebars");
var session = require('express-session');

var indexRouter = require('./routes/index');


var app = express();
(async function(){try{
 await  mongoose.connect("mongodb://localhost:27017/Shopping");
 console.log("Connected To MongoDB");
}
catch(e){
  console.error(e);
}})();


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
 
// include express-handlebars
app.engine(".hbs",expressHbs({
  defaultLayout:"layout",
  extname:".hbs"
}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'sslskneiéj144#',
  resave:false,
  saveUninitialized:false

}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


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
