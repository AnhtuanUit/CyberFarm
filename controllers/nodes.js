var mongoose = require('mongoose');
var Nodes = mongoose.model('Nodes');
var Utilities = require('../config/utilities');
var async = require('async');
var Config = require('../config/config');

exports.createNodes = function(req, res) {
	var userId = req.user._id;
	var number = req.body.number;
	var node;
	async.series({
		isAdmin: function (cb) {
			mongoose.model('Users').findOne({
				_id: userId,
				role: Config.User.Role.Admin
			}, function (err, admin) {
				if (!err && admin) {
					return cb(null);
				} else {
					return cb(true, 'Can not access');
				}
			});	
		},
		createNodeObject: function(cb) {
			node = new Nodes(req.body);
			return cb(null);
		},
		save: function(cb) {
			node.save(function(err) {
				if (err) {
					return cb(true, Utilities.getErrorMessage(req, err));
				} else {
					return cb(null);
				}
			});
		},
		addMAC: function (cb) {
			Utilities.createMAC(node._id, function (MAC) {
				node.MAC = MAC;
				node.save(function (err) {
					if(err) {
						return cb(true, Utilities.getErrorMessage(req, err));
					} else {
						return cb(null);
					}
				});
			});
		}
	}, function(err, results) {
		if (err) {
			var keys = Object.keys(results);
			var last = keys[keys.length - 1];
			return res.jsonp(Utilities.response({}, results[last]));
		} else {
			return res.jsonp(Utilities.response({
				_id: node._id,
				type: node.type,
				MAC: node.MAC
			}));
		}
	});
}
exports.produceNode = function(req, res) {
	res.jsonp(Utilities.response({}, "produceNode"));
};

exports.activeNode = function(req, res) {
	res.jsonp(Utilities.response({}, "activeNode"));
};

/* FUNCTION FOR SOCKETIO */
exports.controlAllDevices = function (req, res) {
	res.jsonp(Utilities.response({}, "controlAllDevices"));
}

exports.controlDevice = function (req, res) {
	res.jsonp(Utilities.response({}, "controlDevice"));
}

exports.controlOffAllNodes = function (req, res) {
	res.jsonp(Utilities.response({}, "controlOffAllDevice"));
}

exports.disconnectUpdate = function (req, res) {
	res.jsonp(Utilities.response({}, "disconnectUpdate"));
}