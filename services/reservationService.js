const Reservation = require('../models/Reservation');
const Seance = require('../models/Seance');
const { sendEmail } = require('../config/nodemailer');

const createReservation = async (reservationData) => {
    const { seance, places, client } = reservationData;

    const foundSeance = await Seance.findById(seance);
    if (!foundSeance) {
        throw new Error('Séance non trouvée');
    }

    const reservedSeats = await Reservation.find({ seance }).select('places');
    const allReservedSeats = reservedSeats.flatMap(reservation => reservation.places);

    const unavailableSeats = places.filter(place => allReservedSeats.includes(place));
    if (unavailableSeats.length > 0) {
        throw new Error(`Les places suivantes sont déjà réservées : ${unavailableSeats.join(', ')}`);
    }

    const newReservation = new Reservation(reservationData);
    const savedReservation = await newReservation.save();

    await sendEmail("hamlirisanaa@gmail.com", 'Confirmation de Réservation', `Votre réservation a été créée avec succès pour la séance ${foundSeance.title} avec les places : ${places.join(', ')}`);

    return savedReservation;
};

const getAllReservations = async () => {
    return await Reservation.find().populate('client seance');
};

const getReservationById = async (id) => {
    return await Reservation.findById(id).populate('client seance');
};

const updateReservation = async (id, updateData) => {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
    
    if (updatedReservation) {
        await sendEmail(updatedReservation.client.email, 'Mise à jour de Réservation', `Votre réservation a été mise à jour pour la séance avec les nouvelles places : ${updateData.places.join(', ')}`);
    }
    
    return updatedReservation;
};

const deleteReservation = async (id) => {
    const reservationToDelete = await Reservation.findById(id);
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    
    if (deletedReservation) {
        await sendEmail(reservationToDelete.client.email, 'Annulation de Réservation', `Votre réservation a été annulée pour la séance.`);
    }

    return deletedReservation;
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
