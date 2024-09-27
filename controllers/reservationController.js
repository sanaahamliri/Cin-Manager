const reservationService = require("../services/reservationService");
const clientService = require("../services/clientService");
const { sendEmail } = require("../config/nodemailer");
const jwt = require('jsonwebtoken')
const createReservation = async (req, res) => {
  try {
    const { places, seance } = req.body;

    const alreadyTakenplaces = await reservationService.checkAvailableplaces(
      seance,
      places
    );

    // -------------------get User Id---------------------
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    userId = decoded.id;

    // -------------------get User Id---------------------

    const client = await clientService.getClient(userId);
    
    if (alreadyTakenplaces.length > 0) {
      return res.status(400).json({
        message:
          "there is Some taken places chosed please check again for avaibility",
        takenplaces: alreadyTakenplaces,
      });
    }

    // Calculate The price of reservations
    const seanceData = await reservationService.reservseance(seance);

    //create the resrvation
    const reservation = await reservationService.createReservation({
      places,
      client: userId,
      seance
    });

    await sendEmail(
      client.email,
      "Confirmation de Réservation",
      `Votre réservation a été créée avec succès pour la séance ${
        seanceData.title
      } avec les places : 12`
    );
    res.status(201).json({
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create reservation",
      error: error.message,
    });
  }
};
const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation", error });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await reservationService.deleteReservation(
      req.params.id
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
