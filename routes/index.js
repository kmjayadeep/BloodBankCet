var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var notifModel = require('../models/notif');
var sizeof = require('object-sizeof');
var config = require('../config').config[express().get('env')];

var maxSize = 1500;

router.get('/', function(req, res, next) {
    res.send('Welcome to blood bank cet')
});

router.get('/view', function(req, res, next) {
    userModel.getByRegex({}, function(err, users) {
        if (err) {
            res.json({
                code: 3,
                message: err
            });
        } else {
            res.json({
                code: 0,
                message: users
            });
        }
    });
});

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

router.post('/view', function(req, res, next) {
    if (req.body)
        userModel.getByRegex(req.body, function(err, users) {
            if (err) {
                res.json({
                    code: 3,
                    message: err
                });
            } else {
                users = shuffle(users).slice(0,30);
                res.json({
                    code: 0,
                    message: users
                });
            }
        });
    else
        res.json({
            code: 2,
            message: "Invalid Input"
        });
});

//send versioninfo. this will be compared to versioncode in the app and prompts update if necessary
router.get('/version', function(req, res) {
    res.json(config.versionDetails);
});

module.exports = router;
