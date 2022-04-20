/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/jwtAuth');
const { recipeUpload } = require('../middleware/upload');
const { isUser, isAdmin } = require('../middleware/authorization');
const { RecipesController } = require('../controller/recipe.controller');

router.get('/:id', auth, isUser, RecipesController.selectById);
router.get('/image/:filename', RecipesController.selectByPhoto);
router.post('/', auth, recipeUpload, isUser, RecipesController.insert);
router.put('/:id', auth, isUser, RecipesController.update);
router.delete('/:id', auth, isUser, RecipesController.delete);

router.put('/deactivate/:id', auth, isAdmin, RecipesController.deactivate);
router.put('/reactivate/:id', auth, isAdmin, RecipesController.reactivate);

router.get('/', auth, isAdmin, RecipesController.selectAll);

module.exports = router;
