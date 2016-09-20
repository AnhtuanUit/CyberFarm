var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Config = require('../config/config');
var Utilities = require('../config/utilities');
var jwt = require('jsonwebtoken');
var async = require('async');

// Middleware
exports.queryLeanUser = function(req, res, next, id) {
    Utilities.validateObjectId(id, function(isValid) {
        if (!isValid) {
            return res.status(404).jsonp(Utilities.response(false, {}, 'Invalid user id', 404));
        } else {
            var populateFields = (req.user._id === id) ? Config.Populate.UserFull : Config.Populate.User;
            Users.findOne({
                '_id': id
            }).lean().select(populateFields).exec(function(err, user) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
                } else if (!user) {
                    return res.status(404).jsonp(Utilities.response(false, {}, 'User not found', 404));
                } else {
                    req.userData = user;
                    return next();
                }
            });
        }
    });
};

exports.queryUser = function(req, res, next, id) {
    Utilities.validateObjectId(id, function(isValid) {
        if (!isValid) {
            return res.status(404).jsonp(Utilities.response(false, {}, 'Invalid user id', 404));
        } else {
            Users.findOne({
                '_id': id
            }).exec(function(err, user) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
                } else if (!user) {
                    return res.status(404).jsonp(Utilities.response(false, {}, 'User not found', 404));
                } else {
                    req.userData = user;
                    return next();
                }
            });
        }
    });
};

// Register an account
exports.signup = function(req, res) {
    var MAC = req.body.MAC ? req.body.MAC : '';
    var phone = req.body.phone ? req.body.phone.trim() : '';
    var user, node, msg;
    async.series({
        checkMAC: function (cb) {
            mongoose.model('Nodes').findOne( { $and: [
                { MAC: MAC }, 
                {type: 1},
                {isActived: false}
                ]}, function (err, gateway) {
                    if (!err && gateway) {
                        node = gateway;
                        return cb(null);
                    } else {
                        msg = 'Invalid MAC address';
                        return cb(true);
                    }
                });
        },
        createUserObject: function(cb) {
            user = new Users({
                phone: phone,
                password: 'admin'
            });
            return cb(null);
        },
        save: function(cb) {
            user.save(function(err) {
                if (err) {
                    msg = Utilities.getErrorMessage(req, err);
                    return cb(true);
                } else {
                    return cb(null);
                }
            });
        },
        updateGateway: function (cb) {
            node.userId = user._id;
            node.save(function (err) {
                if (!err) {
                    return cb(null);
                } else {
                    msg = 'Gateway cannot add';
                    return cb(true);
                }
            });
        },
        token: function(cb) {
            var profile = {
                _id: user._id,
                phone: user.phone,
                avatar: user.avatar,
                gender: user.gender
            };
            // Create token
            token = jwt.sign(profile, Config.JWTSecret);
            return cb(null, token);
        },
        avatar: function(cb) {
            if (user.gender == 1) {
                return cb(null, Config.Env[process.env.NODE_ENV].Image);
            } else {
                return cb(null, Config.Env[process.env.NODE_ENV].Image);
            }

        }
    }, function(err, results) {
        if (err) {
            return res.jsonp(Utilities.response({}, msg));
        } else {
            return res.jsonp(Utilities.response({
                '_id': user._id,
                'phone': user.phone,
                'avatar': results.avatar,
                'token': results.token
            }));
        }
    });
};

/*Do login*/
exports.login = function(req, res) {
    var phone = req.body.phone ? req.body.phone.toString() : '';
    var password = req.body.password ? req.body.password.toString() : '';
    /*Trim phone (email/phone)*/
    phone = phone.trim();
    var user, msg;
    /*Do functions in series*/
    async.series({
        findUser: function(cb) {
            async.parallel({
                findByUsername: function(cb1) {
                    Users.findOne({
                        'phone': phone
                    })
                    .select('-__v -createdAt')
                    .exec(function(err, u) {
                        if (u) {
                            user = u;
                        }
                        return cb1();
                    });
                }
            }, function() {
                msg =  'Incorrect phone number or password';
                return cb(!user);
            });
        },
        checkPassword: function(cb) {
            msg = 'Incorrect phone number or password';
            return cb(!user.checkLogin(password));
        },
        getUserInformations: function(cb) {
            Users.getFullInformations(user, null, function(data) {
                user = data;
                return cb(null);
            });
        },
        createToken: function(cb) {
            var profile = {
                _id: user._id,
                phone: user.phone,
                avatar: user.avatar,
            };
            // Create token
            var token = jwt.sign(profile, Config.JWTSecret);
            user.token = token;
            return cb(null);
        }
    }, function(err, results) {
        if (err) {
            return res.jsonp(Utilities.response({}, msg));
        } else {
            return res.jsonp(Utilities.response(user));
        }
    });
};

/*Change password*/
exports.changePassword = function(req, res) {
    var oldPassword = req.body.oldPassword ? req.body.oldPassword.toString() : '';
    var newPassword = req.body.newPassword ? req.body.newPassword.toString() : '';
    var user = req.userData;
    /*Check old password, if not correct, return*/
    if (!user.checkLogin(oldPassword)) {
        return res.jsonp(Utilities.response(false, {}, 'Old password was not correct'));
    } else {
        /*Generate new password hash*/
        var newHashedPassword = user.hashPassword(newPassword, user.salt);
        user.update({
            'hashed_password': newHashedPassword
        }, function(err) {
            if (err) {
                return res.jsonp(Utilities.response({}, Utilities.getErrorMessage(req, err)));
            } else {
                return res.jsonp(Utilities.response({}, 'Change password successfully'));
            }
        });
    }
};


exports.updateProfile = function (req, res) {
    var userId = req.user._id;
    var user = req.userData;
    var username = req.body.username ? req.body.username : '';
    var address = req.body.address ? req.body.address : '';
    var gender  = req.body.gender ? req.body.gender : '';
    
    user.update({
        username: username,
        address: address,
        gender: gender
    }, function (err) {
        if(!err) {
            return res.jsonp(Utilities.response({}, 'Update profile success'));
        } else {
            return res.jsonp(Utilities.response({}, Utilities.getErrorMessage(req, err)));
        }   
    });
}