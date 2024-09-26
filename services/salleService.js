const Salle = require('../models/Salle');

const createSalle = async (salleData) => {
    const salle = new Salle(salleData);
    return await salle.save();
};

const getAllSalles = async () => {
    return await Salle.find();
};

const getSalleById = async (id) => {
    return await Salle.findById(id);
};

const updateSalle = async (id, updateData) => {
    return await Salle.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSalle = async (id) => {
    return await Salle.findByIdAndDelete(id);
};

module.exports = {
    createSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle
};
