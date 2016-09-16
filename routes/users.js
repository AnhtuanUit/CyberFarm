
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');

/* POST */
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);

/* PUT */
router.put('/changePassword/:userId', UsersController.changePassword);
router.put('/updateProfile/:userId', UsersController.updateProfile);

/* MIDDLEWARE */
module.exports = router;
