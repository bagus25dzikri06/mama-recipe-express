/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const { pool } = require('../config/db');

const RecipesModel = {
  getRecipeTotal: () => new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) FROM recipes ', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getRecipeTotalBasedOnTitle: (recipesearch) => new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) FROM recipes WHERE LOWER(title) LIKE LOWER($1)', [ `%${recipesearch}%` ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getRecipes: (sortByField, recipesearch, limit, offset) => new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER($1) ORDER BY ${sortByField} LIMIT ${limit} OFFSET ${offset}`,
      [ `%${recipesearch}%` ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  }),
  getRecipesByID: (id) => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getRecipesByPhoto: (filename) => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes WHERE filename = $1', [ filename ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getPopularRecipes: () => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes ORDER BY id DESC LIMIT 2', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getNewRecipes: () => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes ORDER BY id DESC LIMIT 5', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getRecipesByUser: (users, recipes) => new Promise((resolve, reject) => {
    recipesByUser = 'SELECT users.name, recipes.title AS cuisine_title, recipes.ingredients, recipes.how_to_cook '
                    + `FROM ${users} INNER JOIN ${recipes} ON recipes.user_id = users.id`;

    pool.query(recipesByUser, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }),
  addRecipe: (
              user_id, title, ingredients, how_to_cook,
              recipe_video_link, filename, filepath, mimetype,
              size
            ) => new Promise((resolve, reject) => {
    addQuery = 'INSERT INTO recipes (user_id, title, ingredients, how_to_cook, recipe_video_link, filename, filepath, mimetype, size) '
                       + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

    pool.query(
      addQuery,
      [ user_id, title, ingredients, how_to_cook, recipe_video_link, filename, filepath, mimetype, size ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  }),
  updateRecipe: (title, ingredients, how_to_cook, recipe_video_link, id) => new Promise((resolve, reject) => {
    updateQuery = 'UPDATE recipes SET title = $1, ingredients = $2, how_to_cook = $3, recipe_video_link = $4 WHERE id = $5';

    pool.query(
      updateQuery,
      [ title, ingredients, how_to_cook, recipe_video_link, id ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  }),
  deactivateRecipe: (id) => new Promise((resolve, reject) => {
    pool.query('UPDATE recipes SET is_active = FALSE WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  reactivateRecipe: (id) => new Promise((resolve, reject) => {
    pool.query('UPDATE recipes SET is_active = TRUE WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  deleteRecipe: (id) => new Promise((resolve, reject) => {
    pool.query('DELETE FROM recipes WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
};

module.exports = {
  RecipesModel,
};
