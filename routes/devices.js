
var express = require('express');
var router = express.Router();
var DevicesController = require('../controllers/devices');

/* POST */
router.post('/updateProcess', DevicesController.updateProcess);
router.post('/updateTime', DevicesController.updateTime);

module.exports = router;
