/* eslint-disable linebreak-style */
const multer = require('multer');
const path = require('path');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/user');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true);
    } else {
      const error = {
        message: 'file type must be jpg, jpeg, or png'
      };
      cb(error, false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

const multerRecipeUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/recipe');
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().valueOf()}_${file.originalname}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true);
    } else {
      const error = {
        message: 'file type must be jpg, jpeg or png'
      };
      cb(error, false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('profile-photo');
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({
        message: 'error',
        error: err
      });
    } else {
      next();
    }
  });
};

const recipeUpload = (req, res, next) => {
  const multerSingle = multerRecipeUpload.single('recipe-photo');
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({
        message: 'error',
        error: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  upload,
  recipeUpload
};
