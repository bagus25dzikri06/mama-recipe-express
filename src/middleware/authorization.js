/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const { failed } = require("../helpers/response");

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else {
      failed(res, null, 'failed', `Admin doesn't have access`);
    }
  },
  isUser: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, null, 'failed', `User doesn't have access`);
    }
  }
};
