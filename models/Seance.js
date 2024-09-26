const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },
    dateTime: { type: Date, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Seance', seanceSchema);
