
const resetPasswordService = require('../services/resetPasswordService');

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const token = await resetPasswordService.requestPasswordReset(email);
        res.status(200).json({ message: 'Un lien de réinitialisation a été envoyé à votre adresse e-mail.', token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la demande de réinitialisation du mot de passe' });
    }
};

module.exports = {
    requestPasswordReset,
};
