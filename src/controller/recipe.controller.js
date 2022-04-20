/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const path = require('path');
const { RecipesModel } = require('../model/recipe.model');
const { success, failed } = require('../helpers/response');

const RecipesController = {
  selectById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await RecipesModel.getRecipesByID(id);

      if (data.rows.length > 0) {
        return success(res, data.rows[0], 'success', 'get all recipes successfully based on ID');
      }
      return res.json({
        message: 'Sorry, the recipe has not been available',
      });
    } catch (err) {
      return failed(res, err.message, 'failed', 'not get all recipes failedly based on ID');
    }
  },
  selectByPhoto: async (req, res) => {
    const { filename } = req.params;
    const data = await RecipesModel.getRecipesByPhoto(filename);

    try {
      if (data.rows.length > 0) {
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, data.rows[0].filepath);
        return res.type(data.rows[0].mimetype).sendFile(fullfilepath);
      }
      return res.json({
        message: 'Sorry, the recipe image does not exist',
      });
    } catch (err) {
      return failed(res, err.message, 'failed', 'not get all recipes failedly based on image');
    }
  },
  selectByUser: async (req, res) => {
    try {
      const users = 'users';
      const recipes = 'recipes';
      const data = await RecipesModel.getRecipesByUser(users, recipes);
      success(res, data, 'success', 'Recipes are shown successfully based on the users');
    } catch (err) {
      failed(res, err.message, 'failed', 'Recipes are not shown failedly based on the users');
    }
  },
  selectAll: async (req, res) => {
    try {
      const {
        sortByField, str, page, limit
      } = req.query;

      const sortField = sortByField || 'id';

      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offsetValue = (pageValue - 1) * limitValue;

      const strValue = str || '';

      const recipeTotal = await RecipesModel.getRecipeTotalBasedOnTitle(strValue);
      const totalRecipes = Number(recipeTotal.rows[0].count);
      const paginations = {
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(Number(totalRecipes) / limitValue),
        totalData: totalRecipes
      };
      const data = await RecipesModel.getRecipes(sortField, strValue, limitValue, offsetValue);

      if (data.rowCount > 0) {
        return success(res, data.rows, 'success', 'get all recipes searched successfully', paginations);
      }
      return res.json({
        message: 'Sorry, no recipes found',
      });
    } catch (err) {
      return failed(res, err.message, 'failed', 'get all recipes not searched failedly');
    }
  },
  popular: async (req, res) => {
    try {
      const data = await RecipesModel.getPopularRecipes();
      success(res, data.rows, 'success', 'get all popular recipes successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'not get all popular recipes failedly');
    }
  },
  latest: async (req, res) => {
    try {
      const data = await RecipesModel.getNewRecipes();
      success(res, data.rows, 'success', 'get all latest recipes successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'not get all latest recipes failedly');
    }
  },
  insert: async (req, res) => {
    try {
      const {
        user_id,
        title,
        ingredients,
        how_to_cook,
        recipe_video_link
      } = req.body;

      const { filename, mimetype, size } = req.file;
      const filepath = req.file.path;

      const userIDCheck = !user_id || user_id === '';
      const titleCheck = !title || title === '';
      const ingredientsCheck = !ingredients || ingredients === '';
      const howToCookCheck = !how_to_cook || how_to_cook === '';
      const videoCheck = !recipe_video_link || recipe_video_link === '';

      if (
        userIDCheck
                && titleCheck
                && ingredientsCheck
                && howToCookCheck
                && videoCheck
      ) {
        return res.status(400).json({
          status: 'failed',
          message: 'All recipe data must be filled',
        });
      } if (
        titleCheck
                && ingredientsCheck
                && howToCookCheck
                && videoCheck
      ) {
        return res.status(400).json({
          status: 'failed',
          message: 'You forgot the recipe and video',
        });
      } if (
        ingredientsCheck
                && howToCookCheck
                && videoCheck
      ) {
        return res.status(400).json({
          status: 'failed',
          message: 'You forgot the ingredients, how to cook and video',
        });
      } if (
        howToCookCheck
                && videoCheck
      ) {
        return res.status(400).json({
          status: 'failed',
          message: 'You forgot how to cook and the video',
        });
      } if (
        videoCheck
      ) {
        return res.status(400).json({
          status: 'failed',
          message: 'You forgot the video',
        });
      }

      const data = await RecipesModel.addRecipe(
        user_id,
        title,
        ingredients,
        how_to_cook,
        recipe_video_link,
        filename,
        filepath,
        mimetype,
        size
      );

      console.log(req.file);
      return success(res, data, 'success', 'Recipe is added successfully');
    } catch (err) {
      return failed(res, err.message, 'failed', 'Recipe is failed to be added');
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title, ingredients, how_to_cook, recipe_video_link
      } = req.body;
      const data = await RecipesModel.updateRecipe(
        title,
        ingredients,
        how_to_cook,
        recipe_video_link,
        id
      );
      success(res, data, 'success', 'Recipe is updated successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'Recipe is failed to be updated');
    }
  },
  deactivate: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await RecipesModel.deactivateRecipe(id);

      if (data) {
        success(res, data.rows, 'success', 'Recipe is deactivated successfully');
      } else {
        success(res, data.rows, 'success', 'Recipe is already deactivated');
      }
    } catch (err) {
      failed(res, err.message, 'failed', 'Recipe is failed to be deactivated');
    }
  },
  reactivate: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await RecipesModel.reactivateRecipe(id);

      if (data) {
        success(res, data.rows, 'success', 'Recipe is reactivated successfully');
      } else {
        success(res, data.rows, 'success', 'Recipe is already reactivated');
      }
    } catch (err) {
      failed(res, err.message, 'failed', 'Recipe is failed to be reactivated');
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await RecipesModel.deleteRecipe(id);
      success(res, data, 'success', 'Recipe is deleted successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'Recipe is failed to be deleted');
    }
  }
};

module.exports = {
  RecipesController,
};
