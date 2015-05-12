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

    u = new userModel({
        name: req.body.name,
        age: req.body.age,
        year: req.body.year,
        branch: req.body.branch,
        batch: req.body.batch,
        semester: req.body.semester,
        sex: req.body.sex,
        bloodGroup: req.body.bloodGroup,
        dob: req.body.dob,
        mobile: req.body.mobile,
        email: req.body.email,
        password: md5(req.body.password),
    });
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
