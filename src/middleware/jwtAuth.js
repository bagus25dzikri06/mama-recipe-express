/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const { failed } = require('../helpers/response');

const auth = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.APP_DATA = {
      tokenDecoded: decoded
    };
    next();
  } catch (err) {
    failed(res, err, 'failed', 'Invalid token');
  }
};

module.exports = {
  auth
};
