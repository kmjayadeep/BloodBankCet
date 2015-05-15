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

//fields in this schema can be used to construct a regular expression to match target audience
//need to change to foreign key
var notifSchema = mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    collegeTo: String,
    branchTo: String,
    bloodGroup: String,
    message: String,
    timeStamp: Date,
    expire: Date
});

var notif = mongoose.model('notif', notifSchema)
module.exports = notif;