const express = require('express');
const filmController = require('../controllers/filmController');
const verifyToken = require('../middleware/verifyToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, filmController.createFilm);
router.put('/:id', verifyToken, authorizeAdmin, filmController.updateFilm);
router.delete('/:id', verifyToken, authorizeAdmin, filmController.deleteFilm);

router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);

module.exports = router;
