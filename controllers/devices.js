var mongoose = require('mongoose');
var Devices = mongoose.model('Devices');
var Utilities = require('../config/utilities');

exports.updateProcess = function(req, res) {
    res.jsonp(Utilities.response({}, "updateProcess"));
};


exports.updateTime = function (req, res) { 
    res.jsonp(Utilities.response({}, "updateTime"));
}
	