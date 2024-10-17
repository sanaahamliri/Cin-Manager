const filmService = require('../services/filmService');
const Film = require('../models/Film');
const createFilm = async (req, res) => {
    try {
        let coverImageUrl = null;
        let videoUrl = null;

        if (req.file) {
            const uploadedUrl = await upload(req.file); 
            coverImageUrl = uploadedUrl;
        }

        const newFilm = new Film({
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate,
            duration: req.body.duration,
            description: req.body.description,
            coverImage: coverImageUrl || req.body.coverImage, 
            video: videoUrl || req.body.video 
        });

        const savedFilm = await newFilm.save();
        res.status(201).json(savedFilm);
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
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
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
    getFilmById
};
