var mongoose = require('mongoose');
var dbHost = require('../variables').dbHost;
var md5 = require('MD5');
var db = mongoose.connection;
mongoose.connect(dbHost);

db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function(callback) {
    console.log('connected to ' + dbHost);
});

var userSchema = mongoose.Schema({
    name: String,
    year: Number,
    branch: String,
    batch: String,
    semester: Number,
    sex: Boolean,
    bloodGroup: String,
    dob: String,
    mobile: Number,
    email: String,
    password: String,
    level: {
        type: Number,
        default: 0
    }
});

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
