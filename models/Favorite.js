const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    filmId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Film' },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
