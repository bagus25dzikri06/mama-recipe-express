const { pool } = require('../config/db');

const RecipeCommentsModel = {
    getComments: (sortByField) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM recipe_comments ORDER BY ${sortByField}`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    },
    getCommentsByRecipeName: (cuisine, commentary) => {
        return new Promise((resolve, reject) => {
            commentsByRecipe = `SELECT users.name, recipes.title AS ${cuisine}, recipe_comments.recipe_comment AS ${commentary} ` + 
                               `FROM recipes INNER JOIN users ON recipes.user_id = users.id `+
                               `INNER JOIN recipe_comments ON recipe_comments.recipe_id = recipes.id` 

            pool.query(commentsByRecipe, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    },
    insertComments: (user_id, recipe_id, recipe_comment) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO recipe_comments (user_id, recipe_id, recipe_comment) VALUES ($1, $2, $3)',
                [user_id, recipe_id, recipe_comment],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(`Comment added for recipe ID ${recipe_id} from user with ID: ${user_id}`);
                }
            );
        })
    },
    editComments: (recipe_comment, id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE recipe_comments SET recipe_comment = $1 WHERE id = $2',
                [recipe_comment, id],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(`Comment edited for ID ${id}`);
                }
            );
        })
    },
    deleteComments: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM recipe_comments WHERE id = $1', [id], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`User deleted with ID: ${id}`);
            });
        })
    }
}

module.exports = {
    RecipeCommentsModel,
}
