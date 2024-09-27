
const User = require('../models/User');
const crypto = require('crypto');
const { sendEmail } = require('../config/nodemailer');
const jwt = require('jsonwebtoken');

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Aucun utilisateur avec cet e-mail');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    
    const resetTokenJWT = jwt.sign({ id: user._id, token: resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetTokenJWT}`;
    
    await sendEmail(user.email, 'Réinitialisation de mot de passe', `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`);

    return resetTokenJWT;
};

module.exports = {
    requestPasswordReset,
};
