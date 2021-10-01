const express = require('express');
const router = express.Router();
const elevatorsController = require('../controllers/elevatorsController.js');
router.get('/', elevatorsController.getElevators);
router.get('/:id', elevatorsController.getElevatorById);
router.patch('/:id/moveup', elevatorsController.moveElevatorUp);
router.patch('/:id/movedown', elevatorsController.moveElevatorDown);
router.patch('/:id', elevatorsController.moveElevator);

module.exports = router;