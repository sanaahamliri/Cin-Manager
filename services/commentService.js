const Comment = require('../models/comment');

const addComment = async (filmId, userId, text) => {
    try {
        const comment = new Comment({ filmId, userId, text });
        await comment.save();
        return comment;
    } catch (error) {
        throw new Error('Error adding comment: ' + error.message);
    }
};

const getCommentsByFilmId = async (filmId) => {
    try {
        return await Comment.find({ filmId }).populate('userId', 'username');
    } catch (error) {
        throw new Error('Error retrieving comments: ' + error.message);
    }
};

module.exports = {
    addComment,
    getCommentsByFilmId,
};
