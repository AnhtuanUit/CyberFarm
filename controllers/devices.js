var mongoose = require('mongoose');
var Devices = mongoose.model('Devices');
var Utilities = require('../config/utilities');
var async = require('async');

exports.updateProcess = function(req, res) {
	res.jsonp(Utilities.response({}, "updateProcess"));
};


exports.updateTime = function (req, res) { 
	res.jsonp(Utilities.response({}, "updateTime"));
}

exports.createDevice = function (req, res) {
	var device, msg;
	async.series({
		createDeviceObject: function(cb) {
			device = new Devices(req.body);
			return cb(null);
		},
		save: function(cb) {
			device.save(function(err) {
				if (err) {
					msg = Utilities.getErrorMessage(req, err);
					return cb(true);
				} else {
					return cb(null);
				}
			});
		}	
	}, function(err, results) {
		if (err) {
			return res.jsonp(Utilities.response({}, msg));
		} else {
			return res.jsonp(Utilities.response(device));
		}
	});
}
