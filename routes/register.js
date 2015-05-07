var express = require('express');
var router = express.Router();
var userModel = require('../Models/user');
var md5 = require('MD5');

var response = {
    code: Number,
    message: String
}

router.get('/', function(req, res) {
    res.nd('Request method not allowed');
});

router.post('/', function(req, res) {
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
    u.checkEmailExist(function(err, flag) {
        if (err)
            res.send({
                code: 2,
                message: err
            });
        else if (flag)
            res.send({
                code: 1,
                message: "Email already exists"
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
});

module.exports = router;
