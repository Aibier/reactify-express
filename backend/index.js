var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// routers
routes(app);
app.use(function(req, res, next) {
	const msg = { status: 404, message: 'Route'+req.url+' Not found.' }
	return res.status(404).send(msg);
});
// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // return res.status(err.status || 500);
  return res.status(500).send({ error: err });
});
module.exports = app;