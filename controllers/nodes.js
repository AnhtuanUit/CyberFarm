var mongoose = require('mongoose');
var Nodes = mongoose.model('Nodes');
var Utilities = require('../config/utilities');

exports.createNodes = function(req, res) {
    res.jsonp(Utilities.response({}, "createNodes"));
};

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