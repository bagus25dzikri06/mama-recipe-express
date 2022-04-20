/* eslint-disable linebreak-style */
// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/jwtAuth');
const { isUser, isAdmin } = require('../middleware/authorization');
const { RecipeCommentsController } = require('../controller/comment.controller');

router.get('/', auth, isAdmin, RecipeCommentsController.selectAll);
router.get('/all', auth, isUser, RecipeCommentsController.selectAll);

router.post('/', auth, isUser, RecipeCommentsController.insert);
router.put('/:id', auth, isUser, RecipeCommentsController.edit);
router.delete('/:id', auth, isUser, RecipeCommentsController.deleted);

// eslint-disable-next-line eol-last
module.exports = router;