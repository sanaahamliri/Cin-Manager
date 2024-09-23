
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return { message: 'User created successfully' };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
        token,
        message: 'Login successful',
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
};

module.exports = { registerUser, loginUser };
