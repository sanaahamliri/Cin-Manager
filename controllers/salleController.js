const salleService = require('../services/salleService');

const createSalle = async (req, res) => {
    try {
        const salle = await salleService.createSalle(req.body);
        res.status(201).json({ message: 'Salle created successfully', salle });
    } catch (error) {
        res.status(500).json({ error: 'Error creating salle' });
    }
};

const getAllSalles = async (req, res) => {
    try {
        const salles = await salleService.getAllSalles();
        res.json(salles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching salles' });
    }
};

const getSalleById = async (req, res) => {
    try {
        const salle = await salleService.getSalleById(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching salle' });
    }
};

const updateSalle = async (req, res) => {
    try {
        const salle = await salleService.updateSalle(req.params.id, req.body);
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.json({ message: 'Salle updated successfully', salle });
    } catch (error) {
        res.status(500).json({ error: 'Error updating salle' });
    }
};

const deleteSalle = async (req, res) => {
    try {
        const salle = await salleService.deleteSalle(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.json({ message: 'Salle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting salle' });
    }
};

module.exports = {
    createSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle
};
