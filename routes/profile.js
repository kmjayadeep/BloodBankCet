var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var md5 = require('MD5');

router.get('/', function(req, res) {
    res.send('Request method not allowed');
});

router.post('/edit', function(req, res) {
    u = new userModel(req.body);
    u.checkLoginHash(function(err, user) {
        if (err)
            res.json({
                code: 3,
                message: err
            });
        else if (user) {
            var temp = user;
            for (k in req.body) {
                user[k] = req.body[k]
            }
            user.level = temp.level
            user.save(function(err) {
                if (err)
                    res.send({
                        code: 3,
                        message: err
                    })
                else
                    res.send({
                        code: 0,
                        message: 'Profile Updated'
                    })
            });
        } else
            res.json({
                code: 1,
                message: "Invalid email or password"
            });
    });
});

router.post('/password', function(req, res) {
    u = new userModel(req.body);
    u.checkLogin(function(err, user) {
        if (err)
            res.json({
                code: 3,
                message: err
            });
        else if (user) {
            if (!req.body.newPass)
                return res.json({
                    code: 4,
                    message: 'Enter New Password'
                })
            user.password = md5(req.body.newPass)
            user.save(function(err) {
                if (err)
                    res.send({
                        code: 3,
                        message: err
                    })
                else
                    res.send({
                        code: 0,
                        message: 'Password Updated'
                    })
            });
        } else
            res.json({
                code: 1,
                message: "Invalid email or password"
            });
    });
});

module.exports = router;
