var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var notifModel = require('../models/notif');
var sizeof = require('object-sizeof');
var config = require('../config').config;

var maxSize = 1500;

router.get('/', function(req, res, next) {
    res.send('Welcome to blood bank cet')
});

router.get('/view', function(req, res, next) {
    userModel.getAll(function(err, users) {
        if (err) {
            res.send({
                code: 2,
                message: err
            });
        } else {
            users.forEach(function(user) {
                user.password = '';
            });
            res.send({
                code: 0,
                message: users
            });
        }
    });
});

router.post('/notif', function(req, res) {
    n = new notifModel({
        userFrom: req.body.userFrom,
        userTo: req.body.userTo,
        collegeTo: req.body.collegeTo,
        branchTo: req.body.branchTo,
        bloodGroup: req.body.bloodGroup,
        message: req.body.message,
        timeStamp: new Date
    });
    if (sizeof(req.body) > maxSize || n.message.length > 500)
        res.send({
            code: 3,
            message: 'max input limit exceeded'
        });
    else
        n.save(function(err, notifs) {
            if (err)
                res.send({
                    code: 2,
                    message: err
                });
            else
                res.send({
                    code: 0,
                    message: "success"
                });
        });
});

//send versioninfo. this will be compared to versioncode in the app and prompts update if necessary
router.get('/version', function(req, res) {
    res.send(config.versionDetails);
});

module.exports = router;