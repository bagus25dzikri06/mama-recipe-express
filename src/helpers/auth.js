/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helpers = {
  hashPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  comparePassword: (hashPassword, password) => bcrypt.compareSync(password, hashPassword),
  isValidEmail: (email) => /\S+@\S+\.\S+/.test(email),
  generateToken: (email, password, level) => {
    const token = jwt.sign(
      {
        eMail: email,
        passWord: password,
        level
      },
      `${process.env.JWT_SECRET}`,

      { expiresIn: '1h' }
    );
    return token;
  },
  generateEmailToken: async (email) => {
    const token = jwt.sign(
      {
        eMail: email
      },
      `${process.env.JWT_SECRET}`,

      { expiresIn: '20m' }
    );
    return token;
  },
  generateRefreshToken: (email, password, level) => {
    const token = jwt.sign(
      {
        eMail: email,
        passWord: password,
        level
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,

      { expiresIn: '2d' }
    );
    return token;
  },
};

module.exports = {
  Helpers
};
