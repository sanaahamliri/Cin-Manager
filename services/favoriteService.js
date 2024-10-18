const User = require('../models/User');
const Favorite = require('../models/Favorite');

const addFavoriteFilm = async (userId, filmId) => {
    if (!userId || !filmId) {
        throw new Error('User ID and Film ID are required');
    }

    const existingFavorite = await Favorite.findOne({ userId, filmId });
    if (existingFavorite) {
        throw new Error('Film is already in favorites');
    }

    const newFavorite = new Favorite({ userId, filmId });
    await newFavorite.save();

    return newFavorite;
};

const removeFavoriteFilm = async (userId, filmId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== filmId);
    await user.save();

    return user.favorites;
};

const getFavoriteFilms = async (userId) => {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
        throw new Error('User not found');
    }

    return user.favorites;
};

module.exports = {
    addFavoriteFilm,
    removeFavoriteFilm,
    getFavoriteFilms
};
