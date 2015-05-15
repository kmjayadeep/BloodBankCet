var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var md5 = require('MD5');
var sizeof = require('object-sizeof');

var maxSize = 2500;

router.get('/', function(req, res) {
    res.nd('Request method not allowed');
});

router.post('/', function(req, res) {
    u = new userModel(req.body); //this works :)
    u.password = md5(u.password)
    if (sizeof(u) > maxSize)
        res.send({
            code: 3,
            message: 'max input limit exceeded'
        });
    else
        u.save(function(err, u) {
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

module.exports = router;
