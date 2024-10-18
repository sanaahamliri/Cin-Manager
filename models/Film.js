const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String },
    genre: { type: String },
    releaseDate: { type: Date },
    duration: { type: Number },
    description: { type: String },
    coverImage: { type: String },
    video: { type: String },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }]
});

module.exports = mongoose.model('Film', filmSchema);
