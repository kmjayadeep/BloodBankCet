var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var dbHost = require('../variables').dbHost;
var md5 = require('MD5');
var db = mongoose.connection;
mongoose.connect(dbHost);

db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function(callback) {
    console.log('connected to ' + dbHost);
});

var nameValidator = validate({
    validator: 'isLength',
    arguments: [1, 20],
    message: 'name should contain 1-20 characters'
});

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: nameValidator
    },
    year: Number,
    branch: String,
    sex: {
        type: String,
        required: true
    },
    bloodGroup: String,
    dob: String,
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: '5f4dcc3b5aa765d61d8327deb882cf99'
    },
    college: {
        type: String,
        default: 'CET Tvm'
    },
    level: {
        type: Number,
        default: 0
    },
    lastSync: Date
});

userSchema.index({
    email: 1
}, {
    unique: true
});

userSchema.statics.getAll = function(cb) {
    return this.find({}, cb);
}

userSchema.statics.getByBloodGroup = function(bg, cb) {
    return this.find({
        bloodGroup: bg
    }, cb);
}

userSchema.statics.getByBranch = function(br, cb) {
    return this.find({
        branch: br
    }, cb);
}

userSchema.statics.getByCollege = function(clg, cb) {
    return this.find({
        college: clg
    }, cb);
}

userSchema.methods.checkEmailExist = function(callback) {
    this.model('user').find({
        email: this.email
    }, function(err, users) {
        if (err)
            callback(err);
        if (users.length == 0)
            callback(null, false);
        else
            callback(null, true);
    });
}

userSchema.methods.checkLogin = function(callback) {
    this.password = md5(this.password);
    this.checkLoginHash(callback);
}

userSchema.methods.checkLoginHash = function(callback) {
    this.model('user').findOne({
        email: this.email,
        password: this.password
    }, function(err, user) {
        if (err)
            callback(err)
        else
            callback(err, user);
    });
}

var user = mongoose.model('user', userSchema);
module.exports = user;
