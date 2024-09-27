const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/filmRoutes');
const salleRoutes = require('./routes/salleRoutes');
const seanceRoutes = require('./routes/seanceRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const verifyToken = require('./middleware/verifyToken');
const verifyAdmin = require('./middleware/authorizeAdmin'); 

dotenv.config();

const app = express();

app.use(express.json());

connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/films', verifyToken, verifyAdmin, filmRoutes);
app.use('/api/salles', verifyToken, verifyAdmin, salleRoutes);
app.use('/api/seances', verifyToken, verifyAdmin, seanceRoutes);
app.use('/api/reservations', verifyToken, reservationRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
