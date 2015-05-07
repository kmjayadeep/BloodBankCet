var express = require('express');
var router = express.Router();
var userModel = require('../Models/user');

router.get('/',function(req,res,next){
	res.send('Welcome to blood bank cet')
});

module.exports = router;