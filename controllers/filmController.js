const filmService = require('../services/filmService');

const createFilm = async (req, res) => {
    try {
        const newFilm = await filmService.createFilm(req.body);
        res.status(201).json({
            message: 'Film created successfully',
            film: newFilm
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating film' });
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

const updateFilm = async (req, res) => {
    try {
        const film = await filmService.updateFilm(req.params.id, req.body);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.json({
            message: 'Film updated successfully',
            film: film
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating film', error });
    }
};

const deleteFilm = async (req, res) => {
    try {
        const film = await filmService.deleteFilm(req.params.id);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting film', error });
    }
};

module.exports = {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm
};
