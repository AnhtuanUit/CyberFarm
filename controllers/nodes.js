var mongoose = require('mongoose');
var Nodes = mongoose.model('Nodes');
var Utilities = require('../config/utilities');
var async = require('async');
var Config = require('../config/config');

exports.createNodes = function(req, res) {
	var userId = req.user._id;
	var number = req.body.number;
	var node, msg;
	async.series({
		isAdmin: function (cb) {
			mongoose.model('Users').findOne({
				_id: userId,
				role: Config.User.Role.Admin
			}, function (err, admin) {
				if (!err && admin) {
					return cb(null);
				} else {
					msg = 'Can not access';
					return cb(true);
				}
			});	
		},
		createNodeObject: function(cb) {
			node = new Nodes(req.body);
			Utilities.generateMAC(node.type, function (err, result) {
				if (!err) {
					node.MAC = result;
					return cb(null);
				} else {
					msg = result;
					return cb(true);
				}
			});
		},
		save: function(cb) {
			node.save(function(err) {
				if (err) {
					msg =  Utilities.getErrorMessage(req, err);
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
			return res.jsonp(Utilities.response({
				_id: node._id,
				MAC: node.MAC,
				type: node.type
			}));
		}
	});
}

exports.addNode = function(req, res) {
	var MACgateway = req.params.MACgateway ? req.params.MACgateway : '';
	var MACwireless = req.body.MACwireless ? req.body.MACwireless : '';
	var type = req.body.type ? req.body.type : '';
	var _id = req.user._id;
	var node, msg;
	async.series({
		checkMACgateway: function (cb) {
			Nodes.count({$and: [{ MAC: MACgateway }, {type: 1}, {userId: _id}]}
				, function (err, c) {
					if (!err && c) {
						return cb(null);
					} else {
						msg = 'Access denied';
						return cb(true);
					}
				});	
		},
		checkMACwireless: function (cb) {
			if (MACwireless == '' || type == '') {
				msg = 'MACwireless/type cannot blank';
				return cb(true);
			} else {
				return cb(null);
			}
		},
		updateNode: function (cb) {
			Nodes.findOneAndUpdate({$and: [{ MAC: MACwireless }, {type: type}]}
				, {userId: _id, isActived: true}
				, function (err, node) {
					if (!err && node) {
						return cb(null);
					} else {
						msg = 'Invalid MAC address';
						return cb(true);
					}
				});
		}
	}, function (error, result) {
		if (!error) {
			return res.jsonp(Utilities.response(node));
		} else {
			return res.jsonp(Utilities.response({}, msg));
		}
	});
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

exports.updateNode = function (req, res) {
	var MAC = req.params.MAC;
	var userId = req.user._id;
	
	Nodes.findOneAndUpdate({MAC: MAC}, {userId: userId}
		, function (err, device) {
			if(!err && device) {
				res.jsonp(Utilities.response(device));
			} else {
				res.jsonp(Utilities.response({}, 'Node cannot update'));
			}
		});
}