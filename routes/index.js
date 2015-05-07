var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.send('Welcome to blood bank cet')
});

router.post('/register',function(req,res){
	var name = req.body.name;
	var sex = req.body.sex;
	//register
	res.send('registered');
});

router.post('/login',function(req,res){
	var email = req.body.email;
	var pass = req.body.pass;
	//check email and pass
	res.send('logged in');
});

modules.exports = router;