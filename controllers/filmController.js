const filmService = require('../services/filmService');
const commentService = require('../services/commentService');
const Film = require('../models/Film');

const addComment = async (req, res) => {
    const { filmId } = req.params; 
    const { text } = req.body;
    try {
        const userId = req.user.id;
        const newComment = await commentService.addComment(filmId, userId, text);
        return res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        return res.status(500).json({ error: 'Error adding comment', details: error.message });
    }
};

const getCommentsByFilmId = async (req, res) => {
    const { filmId } = req.params;

    try {
        const comments = await commentService.getCommentsByFilmId(filmId);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving comments', details: error.message });
    }
};

const createFilm = async (req, res) => {
    try {
        const coverImageFile = req.files.coverImage ? req.files.coverImage[0] : null;
        const videoFile = req.files.video ? req.files.video[0] : null;

        const newFilm = await filmService.createFilm(req.body, coverImageFile, videoFile);
        res.status(201).json(newFilm);
    } catch (error) {
        console.error('Error creating film:', error.message);
        res.status(500).json({ error: 'Error creating film', details: error.message });
    }
};

const updateFilm = async (req, res) => {
    try {
        const coverImageFile = req.files.coverImage ? req.files.coverImage[0] : null;
        const videoFile = req.files.video ? req.files.video[0] : null;

        const film = await filmService.updateFilm(req.params.id, req.body, coverImageFile, videoFile);
        res.json({ message: 'Film updated successfully', film });
    } catch (error) {
        res.status(500).json({ error: 'Error updating film', error });
    }
};

const deleteFilm = async (req, res) => {
    try {
        await filmService.deleteFilm(req.params.id);
        res.json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting film', error });
    }
};

const getAllFilms = async (req, res) => {
    try {
        const films = await filmService.getAllFilms();
        res.json(films);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching films', error });
    }
};

const getFilmById = async (req, res) => {
    try {
        const film = await filmService.getFilmById(req.params.id);
        res.json(film);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching film', error });
    }
};

module.exports = {
    createFilm,
    updateFilm,
    deleteFilm,
    getAllFilms,
    getFilmById,
    addComment,
    getCommentsByFilmId,
};
