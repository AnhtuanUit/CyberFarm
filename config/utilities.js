

var Underscore = require('underscore');

var Config = require('./config');

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

exports.createMAC = function (nodeId, callback) {
    return callback(nodeId);
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