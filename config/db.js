
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        const adminExists = await User.findOne({ email: 'admin@gmail.com' });
        if (!adminExists) {
            const adminData = {
                username: 'admin',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('adminpassword', 10), 
                role: 'admin'
            };
            const newAdmin = new User(adminData);
            await newAdmin.save();
            console.log('Default admin created');
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
