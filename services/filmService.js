const Film = require('../models/Film');
const { upload } = require('../config/minioClient');

const createFilm = async (filmData, coverImageFile, videoFile) => {
    const coverImageUrl = await upload(coverImageFile);  
    const videoUrl = await upload(videoFile);            

    const newFilm = new Film({
        ...filmData,
        coverImage: coverImageUrl,
        video: videoUrl
    });

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
    return await Film.find();
};

const getFilmById = async (id) => {
    return await Film.findById(id);
};

module.exports = {
    createFilm,
    updateFilm,
    deleteFilm,
    getAllFilms,
    getFilmById
};
