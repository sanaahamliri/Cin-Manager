const User = require('../models/User');
const bcrypt = require('bcrypt');

const createAdmin = async (adminData) => {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const newAdmin = new User({
        username: adminData.username,
        email: adminData.email,
        password: hashedPassword,
        role: 'admin'
    });
    return await newAdmin.save();
};

const getAllAdmins = async () => {
    return await User.find({ role: 'admin' });
};

const updateAdmin = async (id, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAdmin = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin
};
