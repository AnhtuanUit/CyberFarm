var mongoose = require('mongoose');
var Devices = mongoose.model('Devices');
var Utilities = require('../config/utilities');

exports.updateProcess = function(req, res) {
	res.jsonp(Utilities.response({}, "updateProcess"));
};


exports.updateTime = function (req, res) { 
	res.jsonp(Utilities.response({}, "updateTime"));
}

/*exports.updateDevice = function (MAC, userId, callback) {
	Devices.findOneAndUpdate({MAC: MAC},{userId: userId}
		,function (err, device) {
			return callback(err, device);
		});
	}*/

	exports.updateDevice = function (req, res) {
		var MAC = req.params.MAC;
		console.log(MAC);
		var userId = req.user._id;
		Devices.findOne({_id: MAC}, function (err, device) {
			if(!err && device) {
				console.log(device);
				device.userId = userId;
				device.save();
				res.jsonp(Utilities.response(device));
			} else {
				res.jsonp(Utilities.response({}));
			}
		});
	}