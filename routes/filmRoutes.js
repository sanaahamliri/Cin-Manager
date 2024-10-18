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
router.post('/:filmId/comments', filmController.addComment); 
router.get('/:filmId/comments', filmController.getCommentsByFilmId);
router.post('/:filmId/rate', filmController.rateFilm);


router.post('/:filmId/favorite', verifyToken, filmController.addFavorite);
router.delete('/:filmId/favorite', verifyToken, filmController.removeFavorite);
router.get('/favorites', verifyToken, filmController.getFavorites);


module.exports = router;
