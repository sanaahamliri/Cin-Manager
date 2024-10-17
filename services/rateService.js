const Film = require('../models/Film');

const rateFilm = async (filmId, rating) => {
    const film = await Film.findById(filmId);
    if (!film) throw new Error('Film not found');

    const totalRating = film.rating * film.ratingCount + rating;
    film.ratingCount += 1;
    film.rating = totalRating / film.ratingCount;

    await film.save();
    return film;
};

module.exports = {
    rateFilm,
};
