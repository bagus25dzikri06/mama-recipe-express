/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsersModel } = require('../model/user.model');
const { pool } = require('../config/db');
const { success, failed, successWithToken } = require('../helpers/response');
const { Helpers } = require('../helpers/auth');

let refreshTokens = [];

const UsersController = {
  getUsers: (req, res) => {
    pool.query('SELECT * FROM Users ORDER BY id', (err, results) => {
      if (err) {
        return res.status(400).json({ status: 'failed', message: err.message });
      }

      const users = results.rows.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }));

      return success(res, users, 'success', 'Users are successfully shown');
    });
  },
  checkUser: async (req, res) => {
    try {
      const { email } = req.body;
      const data = await UsersModel.isUserExists(email);

      if (data.rowCount > 0) {
        const token = await Helpers.generateEmailToken(data.rows[0].email);
        return success(res, token, 'success', 'Email has been taken');
      }
      return res.json({
        message: 'Sorry, you have not registered yourself',
      });
    } catch (err) {
      return failed(res, err.message, 'failed', 'Error while checking is user exist');
    }
  },
  checkToken: (req, res) => {
    try {
      const { email, refreshToken } = req.body;
      const token = jwt.sign({
        email,
        refreshToken
      }, `${process.env.JWT_SECRET}`, {
        expiresIn: '20m'
      });
      const response = {
        token
      };
      success(res, response, 'success', 'Token is showed successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'Invalid token request');
    }
  },
  register: async (req, res) => {
    try {
      const {
        name, email, phone_number, password, level
      } = req.body;

      const nameCheck = !name || name.length === 0;
      const emailCheck = !email || email.length === 0;
      const phoneNumberCheck = !phone_number || phone_number.length === 0;
      const passwordCheck = !password || password.length === 0;
      const levelCheck = !level || level.length === 0;

      if (nameCheck && emailCheck && phoneNumberCheck && passwordCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'All must be required.' });
      }

      if (nameCheck && emailCheck && phoneNumberCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, email, phone number dan password are required.' });
      } if (nameCheck && emailCheck && phoneNumberCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, email, phone number dan level are required.' });
      } if (emailCheck && phoneNumberCheck && passwordCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email, phone number, password dan level are required.' });
      }

      if (nameCheck && emailCheck && phoneNumberCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, email and phone number are required.' });
      } if (nameCheck && emailCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, email and password are required.' });
      } if (nameCheck && emailCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, email and level are required.' });
      } if (nameCheck && phoneNumberCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, phone number and password are required.' });
      } if (nameCheck && phoneNumberCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name, phone number and password are required.' });
      } if (emailCheck && phoneNumberCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email, phone number and password are required.' });
      } if (emailCheck && phoneNumberCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email, phone number and level are required.' });
      } if (phoneNumberCheck && passwordCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Phone number, password and level are required.' });
      }

      if (nameCheck && emailCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name and email are required.' });
      } if (nameCheck && phoneNumberCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name and phone number are required.' });
      } if (nameCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name and password are required.' });
      } else if (nameCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name and level are required.' });
      } else if (emailCheck && phoneNumberCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email and phone number are required.' });
      } else if (emailCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email and password are required.' });
      } else if (emailCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email and level are required.' });
      } else if (phoneNumberCheck && passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Phone number and password are required.' });
      } else if (phoneNumberCheck && levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Phone number and level are required.' });
      }

      if (nameCheck) {
        return res.status(400).json({ status: 'failed', message: 'Name is required.' });
      }

      if (emailCheck) {
        return res.status(400).json({ status: 'failed', message: 'Email is required.' });
      }

      if (!Helpers.isValidEmail(email)) {
        return res.status(400).json({ status: 'failed', message: 'Email should be like the standard.' });
      }

      if (phoneNumberCheck) {
        return res.status(400).json({ status: 'failed', message: 'Phone number is required.' });
      } else if (phone_number.length < 12) {
        return res.status(400).json({ status: 'failed', message: 'Phone number is illegal.' });
      }

      if (passwordCheck) {
        return res.status(400).json({ status: 'failed', message: 'Password is required.' });
      } else if (password.length < 8) {
        return res.status(400).json({ status: 'failed', message: 'Password length must equal or be more than 8.' });
      }

      if (levelCheck) {
        return res.status(400).json({ status: 'failed', message: 'Level is required.' });
      }

      const data = await UsersModel.insertUser(name, email, phone_number, password, level);
      return success(res, data, 'success', 'User is added successfully');
    } catch (err) {
      return failed(res, err.message, 'failed', 'User is failed to be added');
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await UsersModel.getUser(email);

      if (!data.rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helpers.comparePassword(data.rows[0].password, password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }

      const token = Helpers.generateToken(data.rows[0].email, data.rows[0].password, data.rows[0].level);
      const refreshToken = Helpers.generateRefreshToken(
        data.rows[0].email,
        data.rows[0].password,
        data.rows[0].level
      );

      refreshTokens.push(refreshToken);

      return successWithToken(res, token, refreshToken, 'success', 'Auth granted, welcome to Eat, Cook, Repeat!');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const { email, phone_number } = req.body;
      const { id } = req.params;

      const data = await UsersModel.updateUser(email, phone_number, id);
      success(res, data, 'success', 'User is updated successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'User is failed to be updated');
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { password, new_password } = req.body;
      const { id } = req.params;
      const data = await UsersModel.getPassword(password);

      if (!data.rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helpers.comparePassword(data.rows[0].password, password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }

      const hashNewPassword = bcrypt.hash(new_password, 10);
      const newPassword = UsersModel.updatePassword(hashNewPassword, id);
      return success(res, newPassword, 'success', 'User is updated successfully');
    } catch (err) {
      return failed(res, err.message, 'failed', 'User password is failed to be updated');
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await UsersModel.deleteUser(id);
      success(res, data, 'success', 'User is deleted successfully');
    } catch (err) {
      failed(res, err.message, 'failed', 'User is failed to be deleted');
    }
  },
  activate: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await UsersModel.activateUser(id);

      if (data) {
        success(res, data.rows, 'success', 'User is activated successfully');
      } else {
        success(res, data.rows, 'success', 'User is already activated');
      }
    } catch (err) {
      failed(res, err.message, 'failed', 'User is failed to be activated');
    }
  },
  deactivate: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await UsersModel.deactivateUser(id);

      if (data) {
        success(res, data.rows, 'success', 'User is deactivated successfully');
      } else {
        success(res, data.rows, 'success', 'User is already deactivated');
      }
    } catch (err) {
      failed(res, err.message, 'failed', 'User is failed to be deactivated');
    }
  },
  logout: async (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send('Logout successful');
  }
};

module.exports = {
  UsersController,
};
