// controllers/authController.js

const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await authService.registerUser(username, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
