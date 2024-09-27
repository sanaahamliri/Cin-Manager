const Reservation = require("../models/Reservation");
const Seance = require("../models/Seance");
const { sendEmail } = require("../config/nodemailer");

const createReservation = async (reservationData) => {
  try {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
  } catch (error) {
    throw new Error("Error saving reservation: " + error.message);
  }
};

const checkAvailableplaces = async (seanceId, requestedPlaces) => {
  const existingReservations = await Reservation.find({
    seance: seanceId,
  });

  const reservedplaces = existingReservations.flatMap(
    (reservation) => reservation.places
  );

  const alreadyTakenPlaces = requestedPlaces.filter((places) =>
    reservedplaces.includes(places)
  );

  return alreadyTakenPlaces;
};

const reservseance = async (seanceId) => {
  try {
    const seanceData = await Seance.findById(seanceId);

    if (!seanceData) {
      throw new Error("seance not found");
    }

    return seanceData;
  } catch (error) {
    throw new Error("Error fetching seance: " + error.message);
  }
};

const getAllReservations = async () => {
  return await Reservation.find().populate("client seance");
};

const getReservationById = async (id) => {
  return await Reservation.findById(id).populate("client seance");
};

const updateReservation = async (id, updateData) => {
  const updatedReservation = await Reservation.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (updatedReservation) {
    await sendEmail(
      updatedReservation.client.email,
      "Mise à jour de Réservation",
      `Votre réservation a été mise à jour pour la séance avec les nouvelles places : ${updateData.places.join(
        ", "
      )}`
    );
  }

  return updatedReservation;
};

const deleteReservation = async (id) => {
  const reservationToDelete = await Reservation.findById(id);
  const deletedReservation = await Reservation.findByIdAndDelete(id);

  if (deletedReservation) {
    await sendEmail(
      reservationToDelete.client.email,
      "Annulation de Réservation",
      `Votre réservation a été annulée pour la séance.`
    );
  }

  return deletedReservation;
};

module.exports = {
  createReservation,
  checkAvailableplaces,
  reservseance,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
