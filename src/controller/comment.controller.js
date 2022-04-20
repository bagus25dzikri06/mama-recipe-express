const { RecipeCommentsModel } = require('../model/comment.model');
const { success, failed } = require('../helpers/response');

const RecipeCommentsController = {
    selectAll: async (req, res) => {
        try {
            const { sortByField } = req.query;
            const sortField = sortByField || 'id';
            const data = await RecipeCommentsModel.getComments(sortField);
            success(res, data, 'success', 'get all comments successfully');
        } catch (err) {
            failed(res, err.message, 'failed', 'failed to get all comments');
        }
    },
    selectByRecipe: async (req, res) => {
        try {
            const cuisines = 'cuisine';
            const commentaries = 'commentary';
            const data = await RecipeCommentsModel.getCommentsByRecipeName(cuisines, commentaries);
            success(res, data, 'success', 'get all comments successfully based on recipe');
        } catch (err) {
            failed(res, err.message, 'failed', 'failed to get all comments based on recipe');
        }
    },
    insert: async (req, res) => {
        try {
            const { user_id, recipe_id, recipe_comment } = req.body;

            if (!recipe_comment || recipe_comment === '') {
                return res.status(400).json({
                    message: 'You forgot recipe comment',
                });
            }
            
            if (!recipe_id || !recipe_comment || recipe_id === '' || recipe_comment === '') {
                return res.status(400).json({
                    message: 'You forgot recipe ID and comment',
                });
            }

            if (!user_id || !recipe_id || !recipe_comment || user_id === '' || recipe_id === '' || recipe_comment === '') {
                return res.status(400).json({
                    message: 'All data must be filled',
                });
            } 

            const data = await RecipeCommentsModel.insertComments(user_id, recipe_id, recipe_comment)
            success(res, data, 'success', 'Comment is added successfully');
        } catch (err) {
            failed(res, err.message, 'failed', 'Comment is failed to be added');
        }
    },
    edit: async (req, res) => {
        try {
            const { recipe_comment } = req.body;
            const { id } = req.params; 
            const data = await RecipeCommentsModel.editComments(recipe_comment, id);
            success(res, data, 'success', 'Comment is updated successfully');
        } catch (err) {
            failed(res, err.message, 'failed', 'Comment is failed to be updated');
        }
    },
    deleted: async (req, res) => {
        try {
            const { id } = req.params; 
            const data = await RecipeCommentsModel.deleteComments(id);
            success(res, data, 'success', 'Comment is deleted successfully');
        } catch (err) {
            failed(res, err.message, 'failed', 'Comment is failed to be deleted');
        }        
    },
};

module.exports = {
    RecipeCommentsController,
};
