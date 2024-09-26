const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/authorizeAdmin');
const seanceController = require('../controllers/seanceController');

router.post('/', seanceController.createSeance);
router.get('/', seanceController.getAllSeances);
router.get('/:id', seanceController.getSeanceById);
router.put('/:id', verifyToken, verifyAdmin, seanceController.updateSeance);
router.delete('/:id', verifyToken, verifyAdmin, seanceController.deleteSeance);

module.exports = router;
