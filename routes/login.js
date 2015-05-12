var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/', function(req, res) {
    res.send('Request method not allowed');
});

router.post('/', function(req, res) {
    u = new userModel({
        email: req.body.email,
        password: req.body.password
    });
    u.checkLogin(function(err, user) {
        if (err)
            res.send({
                code: 2,
                message: err
            });
        else if (user) {
            res.send({
                code: 0,
                message: user
            });
        } else
            res.send({
                code: 3,
                message: "Invalid email or password"
            });
    });
});

module.exports = router;