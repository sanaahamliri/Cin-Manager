const filmService = require('../services/filmService');

const rateFilm = async (req, res) => {
    const { filmId } = req.params;
    const { rating } = req.body;

    try {
        const updatedFilm = await filmService.rateFilm(filmId, rating);
        res.status(200).json({ message: 'Film rated successfully', film: updatedFilm });
    } catch (error) {
        res.status(500).json({ error: 'Error rating film', details: error.message });
    }
};

module.exports = {
    rateFilm,
};
