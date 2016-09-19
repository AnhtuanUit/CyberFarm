
var Utilities = require('./utilities');

exports.isAuthentication = function(req, res, next) {
	console.log(req.userData._id.toString());
	console.log(req.user._id);
	if ((req.user._id === req.userData._id.toString()) || req.user.role === 1) {
		return next();
	} else {
		return res.status(401).jsonp(Utilities.response(false, {}, 'Access denied', 401));
	}
};