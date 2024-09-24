const express = require('express');
const filmController = require('../controllers/filmController');

const router = express.Router();

router.post('/', filmController.createFilm);
router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.put('/:id', filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;
