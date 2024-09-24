// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth'); 
const filmRoutes = require('./routes/filmRoutes');


dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
