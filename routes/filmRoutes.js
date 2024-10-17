const express = require('express');
const filmController = require('../controllers/filmController');
const verifyToken = require('../middleware/verifyToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, upload.fields([{ name: 'coverImage' }, { name: 'video' }]), filmController.createFilm);

router.put('/:id', verifyToken, authorizeAdmin, upload.fields([{ name: 'coverImage' }, { name: 'video' }]), filmController.updateFilm);

router.delete('/:id', verifyToken, authorizeAdmin, filmController.deleteFilm);

router.get('/', filmController.getAllFilms);

router.get('/:id', filmController.getFilmById);

module.exports = router;
