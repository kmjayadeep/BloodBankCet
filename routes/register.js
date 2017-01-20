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
    console.log(req.body);
    u = new userModel(req.body); //this works :)
    u.password = md5(u.password)
    if (sizeof(u) > maxSize)
        res.json({
            code: 2,
            message: 'max input limit exceeded'
        });
    else
        u.save(function(err, u) {
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
});

module.exports = router;
