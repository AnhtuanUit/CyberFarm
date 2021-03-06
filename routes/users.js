
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');
var middleware = require('../config/middleware');

/* POST */
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);

/* PUT */
router.put('/changePassword/:userId', middleware.isAuthentication, UsersController.changePassword);
router.put('/updateProfile/:userId', middleware.isAuthentication, UsersController.updateProfile);

/* MIDDLEWARE */
router.param('leanUserId', UsersController.queryLeanUser); // Lean
router.param('userId', UsersController.queryUser); // Object

module.exports = router;
