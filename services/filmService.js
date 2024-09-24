const Film = require('../models/Film');

const createFilm = async (filmData) => {
    const newFilm = new Film(filmData);
    return await newFilm.save();
};

const getAllFilms = async () => {
    return await Film.find();
};

const getFilmById = async (id) => {
    return await Film.findById(id);
};

const updateFilm = async (id, updateData) => {
    return await Film.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFilm = async (id) => {
    return await Film.findByIdAndDelete(id);
};

module.exports = {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm
};
