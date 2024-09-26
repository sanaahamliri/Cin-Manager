const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, enum: ['Standard', 'IMAX', '3D'], default: 'Standard' }
});

module.exports = mongoose.model('Salle', salleSchema);
