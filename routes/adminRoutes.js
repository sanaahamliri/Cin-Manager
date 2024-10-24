const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/authorizeAdmin');

router.post('/', verifyToken, verifyAdmin, adminController.createAdmin);

router.get('/', verifyToken, verifyAdmin, adminController.getAllAdmins);

router.put('/:id', verifyToken, verifyAdmin, adminController.updateAdmin);

router.delete('/:id', verifyToken, verifyAdmin, adminController.deleteAdmin);

router.get('/statistics',adminController.getAdminStatistics);

module.exports = router;
