var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/', function(req, res, next) {
    res.send('Welcome to blood bank cet')
});

router.get('/view', function(req, res) {
	userModel.getAll(function(err,users){
		if(err){
			res.send({
				code:2,
				message:err
			});
		}else{
			res.send({
				code:0,
				message:users
			});
		}
	});
});

module.exports = router;
