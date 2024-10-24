const adminService = require('../services/adminService');
const User = require('../models/User');
const Film = require('../models/Film');
const Reservation = require('../models/Reservation');

const createAdmin = async (req, res) => {
    try {
        const newAdmin = await adminService.createAdmin(req.body);
        res.status(201).json({
            message: 'Admin created successfully',
            admin: newAdmin
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating admin' });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Error updating admin' });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await adminService.deleteAdmin(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting admin' });
    }
};

 const getAdminStatistics = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalFilms = await Film.countDocuments();
      const totalReservations = await Reservation.countDocuments();
  
      res.status(200).json({
        totalUsers,
        totalFilms,
        totalReservations
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
      res.status(500).json({ error: "Impossible de récupérer les statistiques." });
    }
  };

module.exports = {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
    getAdminStatistics
};
