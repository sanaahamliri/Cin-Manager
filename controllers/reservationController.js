const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
    try {
        console.log(req.user.id);
        
        const newReservation = await reservationService.createReservation({
            ...req.body,
            client: req.user.id 
        });
        res.status(201).json({
            message: 'Reservation created successfully',
            reservation: newReservation
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating reservation', message: error.message });
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservation', error });
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating reservation', error });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation', error });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
