const Film = require('../models/Film');
const { upload } = require('../config/minioClient');
const Comment = require('../models/comment');

const createFilm = async (filmData, coverImageFile, videoFile) => {
    const coverImageUrl = await upload(coverImageFile);  
    const videoUrl = await upload(videoFile);            


    const newFilm = new Film({
        ...filmData,
        coverImage: coverImageUrl,
        video: videoUrl
    });
console.log(newFilm);

    return await newFilm.save();
};

const updateFilm = async (id, updateData, coverImageFile, videoFile) => {
    if (coverImageFile) {
        updateData.coverImage = await upload(coverImageFile);
    }
    if (videoFile) {
        updateData.video = await upload(videoFile);
    }

    return await Film.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFilm = async (id) => {
    return await Film.findByIdAndDelete(id);
};

const getAllFilms = async () => {
    const films = await Film.find();
    const filmsWithComments = await Promise.all(films.map(async (film) => {
        const comments = await Comment.find({ filmId: film._id }).populate('userId', 'username');
        return { ...film.toObject(), comments };
    }));
    return filmsWithComments;
};

const getFilmById = async (id) => {
    const film = await Film.findById(id);
    if (!film) {
        throw new Error('Film not found');
    }
    const comments = await Comment.find({ filmId: film._id }).populate('userId', 'username');
    return { ...film.toObject(), comments };
};

module.exports = {
    createFilm,
    updateFilm,
    deleteFilm,
    getAllFilms,
    getFilmById
};
