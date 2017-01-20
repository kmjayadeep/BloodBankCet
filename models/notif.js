var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('MD5');

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
    bGroup: String,
    message: String,
    timeStamp: Date,
    expire: Date //need to set a default value
});

notifSchema.statics.getNotif = function(user, cb) {
    return this.find({
        timeStamp: {
            $gt: user.lastNotifSync
        },
        $and: [{
            $or: [{
                collegeTo: user.college
            }, {
                collegeTo: {
                    $exists: false
                }
            }]
        }, {
            $or: [{
                branchTo: user.branch
            }, {
                branchTo: {
                    $exists: false
                }
            }]
        }, {
            $or: [{
                userTo: user._id
            }, {
                userTo: {
                    $exists: false
                }
            }]
        }, {
            $or: [{
                bGroup: user.bloodGroup
            }, {
                bGroup: {
                    $exists: false
                }
            }]
        }]
    }, function(err, notifs) {
        if (err)
            return cb(err);
        user.lastNotifSync = new Date;
        user.save(function(err) {
            if (err)
                return cb(err)
            return cb(err, notifs)
        });
    });
}

var notif = mongoose.model('notif', notifSchema)
module.exports = notif;
