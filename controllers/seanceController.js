const seanceService = require('../services/seanceService');

const createSeance = async (req, res) => {
    try {
        const newSeance = await seanceService.createSeance(req.body);
        res.status(201).json({
            message: 'Seance created successfully',
            seance: newSeance
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating seance' });
    }
};

const getAllSeances = async (req, res) => {
    try {
        const seances = await seanceService.getAllSeances();
        res.json(seances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seances', error });
    }
};
const getSeanceById = async (req, res) => {
    try {
        const seance = await seanceService.getSeanceById(req.params.id).populate('film').populate('salle');
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json(seance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seance', error });
    }
};

const updateSeance = async (req, res) => {
    try {
        const seance = await seanceService.updateSeance(req.params.id, req.body);
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json(seance);
    } catch (error) {
        res.status(500).json({ message: 'Error updating seance', error });
    }
};

const deleteSeance = async (req, res) => {
    try {
        const seance = await seanceService.deleteSeance(req.params.id);
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json({ message: 'Seance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting seance', error });
    }
};

module.exports = {
    createSeance,
    getAllSeances,
    getSeanceById,
    updateSeance,
    deleteSeance
};
