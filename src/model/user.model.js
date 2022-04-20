/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

const UsersModel = {
  isUserExists: (email) => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [ email ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getUser: (email) => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [ email ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  getPassword: (password) => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE password = $1', [ password ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  insertUser: (name, email, phone_number, password, level) => new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err.message);
      }

      pool.query(
        'INSERT INTO Users (name, email, phone_number, password, level) VALUES ($1, $2, $3, $4, $5)',
        [ name, email, phone_number, hash, level ],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  }),
  updateUser: (email, phone_number, id) => new Promise((resolve, reject) => {
    pool.query(
      'UPDATE users SET email = $1, phone_number = $2, WHERE id = $3',
      [ email, phone_number, id ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  }),
  updatePassword: (password, id) => new Promise((resolve, reject) => {
    pool.query(
      'UPDATE users SET password = $1 WHERE id = $3',
      [ password, id ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  }),
  deleteUser: (id) => new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  activateUser: (id) => new Promise((resolve, reject) => {
    pool.query('UPDATE users SET is_active = TRUE WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }),
  deactivateUser: (id) => new Promise((resolve, reject) => {
    pool.query('UPDATE users SET is_active = FALSE WHERE id = $1', [ id ], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  })
};

module.exports = {
  UsersModel,
};
