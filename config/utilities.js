

var Underscore = require('underscore');
var Config = require('./config');
var mongoose = require('mongoose');
var async = require('async');

var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');


exports.validateObjectId = function(id, callback) {
    return callback(checkForHexRegExp.test(id));
};

exports.response = function(data, message, code) {
    return {
        'code': code ? code : 200,
        'message': message ? message : 'Successfully',
        'data': data ? data : {}
    };
};

exports.getErrorMessage = function(req, err) {
    console.log('error ' + err);
    var errText = '';
    if (!err) {
        errText = 'Server error';
    } else if (err.errors) {
        errText = err.errors[Object.keys(err.errors)[0]] ? err.errors[Object.keys(err.errors)[0]].message : 'Server error';
    } else {
        errText = err.message;
    }

    return errText;
};

exports.generateMAC  = function (type, callback) { 
    var suffixes, MAC;
    var MACformat = '';
    async.series({
        createSuffixes: function (cb) {
            var min = 268435456, max = 4294967295;
            suffixes = Math.floor(Math.random() * (max - min + 1) + min).toString(16);
            return cb(null);
        },
        getMACtype: function(cb) {
            getMACtype(type, function (MACtype) {
                MAC = Config.Device.MAC.Prefix + MACtype + suffixes;
                console.log(MAC);
                return cb(!MACtype, 'Type of device not correct');
            }); 
        },
        formatMAC: function(cb) {
            var MAClength  = MAC.length;
            for (i = 0; i < MAClength; i+=2) {
                if((MAClength - i) <= 2) {
                    MACformat += MAC.slice(i, i+2);
                    return cb(null);
                } else {
                    MACformat += MAC.slice(i, i+2);
                    MACformat += Config.Device.MAC.Format;
                }
            }
            return cb(true, 'MAC cannot format');
        }
    }, function(err, results) {
        if (err) {
            var keys = Object.keys(results);
            var last = keys[keys.length - 1];
            return callback(true, results[last]);
        } else {
            return callback(null, MACformat);
        }
    });

}

exports.extendObject = function(obj1, obj2) {
    return Underscore.extend(obj1, obj2);
};

exports.pickFields = function(obj, fields) {
    var result = {};
    if (!obj || !Object.keys(obj).length) {
        return result;
    } else {
        for (var i in fields) {
            result[fields[i]] = obj[fields[i]];
        }
        return result;
    }
};

function getMACtype(type, callback) {
    switch(type) {
        case Config.Device.Type.Gateway:
        return callback(Config.Device.MAC.Type.Gateway);
        break;
        case Config.Device.Type.Van:
        return callback(Config.Device.MAC.Type.Van);
        case Config.Device.Type.Motor:
        return callback(Config.Device.MAC.Type.Motor);
        case Config.Device.Type.Sensor:
        return callback(Config.Device.MAC.Type.Sensor);
        break;
        default:
        return callback(null);
    }
}