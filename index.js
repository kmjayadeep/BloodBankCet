var express = require('express');
var path = require('path');
var routes = require('./routes/index');

var app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

app.use(express.static(path.join(__dirname,'Public')));

app.use('/',routes);

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

module.exports = app;