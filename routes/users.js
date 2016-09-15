
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');

/* POST */
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);

/* MIDDLEWARE */
router.param('leanUserId', UsersController.queryLeanUser); // Lean
router.param('userId', UsersController.queryUser); // Object

module.exports = router;
