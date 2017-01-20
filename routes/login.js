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
            res.json({
                code: 3,
                message: err
            });
        else if (user) {
            res.json({
                code: 0,
                message: user
            });
        } else
            res.json({
                code: 1,
                message: "Invalid email or password"
            });
    });
});

module.exports = router;
