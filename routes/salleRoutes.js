const express = require('express');
const salleController = require('../controllers/salleController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, salleController.createSalle);

router.get('/', salleController.getAllSalles);

router.get('/:id', salleController.getSalleById);

router.put('/:id', verifyToken, verifyAdmin, salleController.updateSalle);

router.delete('/:id', verifyToken, verifyAdmin, salleController.deleteSalle);

module.exports = router;
