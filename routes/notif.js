var express = require('express');
var router = express.Router();
var notifModel = require('../models/notif');
var userModel = require('../models/user');
var sizeof = require('object-sizeof');

var maxSize = 1500;

router.post('/send', function(req, res) {
    n = new notifModel(req.body);
    u = new userModel(req.body);
    n.timeStamp = new Date;
    if (sizeof(req.body) > maxSize || n.message.length > 500)
        res.json({
            code: 2,
            message: 'max input limit exceeded'
        });
    else {
        u.checkLogin(function(err, user) {
            if (err || !user) {
                res.send({
                    code: 1,
                    message: 'Invalid Login'
                });
            } else {
                console.log(user)
                n.userFrom = user._id;
                console.log(n);
                n.save(function(err, notifs) {
                    if (err)
                        res.json({
                            code: 3,
                            message: err
                        });
                    else
                        res.json({
                            code: 0,
                            message: "success"
                        });
                });
            }
        });
    }
});

router.post('/get', function(req, res) {
    u = new userModel(req.body);
    u.checkLogin(function(err, user) {
        if (err || !user) {
            res.send({
                code: 1,
                message: 'Invalid Login'
            });
        } else {
            notifModel.getNotif(user,function(err,notif){
                if(err)
                    res.json({
                        code: 3,
                        message : err
                    });
                else
                    res.json({
                        code:0,
                        message:notif
                    });
            });
        }
    });

});

module.exports = router;
