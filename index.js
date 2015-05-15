var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var mongoose = require('mongoose');
var config = require('./config').config;

var db = mongoose.connection;
mongoose.connect(config.dbHost);

db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function(callback) {
    console.log('connected to ' + config.dbHost);
});

var app = express();
var PORT = process.env.PORT ||3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/register',register);
app.use('/login',login);
app.use(routes);

app.use(function(err,req,res,next){
	var err = new Error('Not found');
	err.status=404;
	next(err);
});

if(app.get('env')==='development'){
	app.use(function(err,req,res,next){
		res.status(err.status||500);
		res.render('error',{
			message: err.message,
			error:err
		});
	});
}

app.use(function(err,req,res,next){
	res.status(err.status||500);
	res.render('error',{
		message:err.message,
		error:{}
	});
});

app.listen(PORT);
console.log('Server listening at '+PORT);
module.exports = app;