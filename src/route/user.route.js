/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/jwtAuth');
const { isAdmin, isUser } = require('../middleware/authorization');
const { upload } = require('../middleware/upload');
const { UsersController } = require('../controller/user.controller');

router.get('/', auth, isAdmin, UsersController.getUsers);
router.post('/register', upload, UsersController.register);
router.post('/login', UsersController.login);
router.put('/update/:id', auth, isUser, UsersController.update);

router.put('/activate/:id', auth, isAdmin, UsersController.activate);
router.put('/deactivate/:id', auth, isAdmin, UsersController.deactivate);

router.delete('/delete/:id', auth, isAdmin, UsersController.delete);
router.get('/logout', UsersController.logout);

module.exports = router;
