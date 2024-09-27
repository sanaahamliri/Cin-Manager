const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const reservationController = require('../controllers/reservationController');

router.post('/', verifyToken, reservationController.createReservation); 
router.get('/', verifyToken, reservationController.getAllReservations);
router.get('/:id', verifyToken, reservationController.getReservationById); 
router.put('/:id', verifyToken, reservationController.updateReservation); 
router.delete('/:id', verifyToken, reservationController.deleteReservation);

module.exports = router;
