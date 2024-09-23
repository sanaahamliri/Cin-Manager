// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Importer la configuration de la base de données
const authRoutes = require('./routes/auth'); // Importer les routes d'authentification

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
