const Seance = require('../models/Seance');

const createSeance = async (seanceData) => {
    const newSeance = new Seance(seanceData);
    return await newSeance.save();
};

const getAllSeances = async () => {
    return await Seance.find().populate('film salle');
};

const getSeanceById = async (id) => {
    return await Seance.findById(id).populate('film salle');
};

const updateSeance = async (id, updateData) => {
    return await Seance.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSeance = async (id) => {
    return await Seance.findByIdAndDelete(id);
};

module.exports = {
    createSeance,
    getAllSeances,
    getSeanceById,
    updateSeance,
    deleteSeance,
};
