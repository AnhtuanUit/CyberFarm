
var express = require('express');
var router = express.Router();
var NodesController = require('../controllers/nodes');

/* POST */
router.post('/createNodes', NodesController.createNodes);

/* PUT */
router.put('/addNode/:MACgateway', NodesController.addNode);
router.put('/updateNode/:MAC', NodesController.updateNode);

/* CONTROL SYSTEM WITH API INSTEAD SOCKETIO */
router.post('/controlAllDevices', NodesController.controlAllDevices);
router.post('/controlDevice', NodesController.controlDevice);
router.post('/controlOffAllNodes', NodesController.controlOffAllNodes);
router.post('/disconnectUpdate', NodesController.disconnectUpdate);

module.exports = router;
