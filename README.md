# Eat, Cook, Repeat API
API untuk aplikasi recipe sharing terilhami dari desain web Eat, Cook, Repeat dari Figma dengan tautan sebagai berikut:
https://www.figma.com/file/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47%3A1273

## Goals
- Completing the API task in PijarCamp scholarship
- Designing and developing the backend for Eat, Cook, Repeat recipe application
- Designing the social media platform for all cooks to share all their recipes to everyone

## Tech Stack and Dependencies
1. NodeJS (16.13.2)
2. Nodemon (2.0.15)
3. Express (4.17.3)
4. Postgres (14.2)
5. pg (8.7.3)
6. helmet (5.0.2)
7. xss-clean (0.1.1)
8. cors (2.8.5)
9. eslint (8.12.0)
10. eslint-config-airbnb-base (15.0.0)
11. eslint-plugin-import (2.25.4)
12. prettier (2.6.1)
13. jsonwebtoken (8.5.1)
14. bcrypt (5.0.1)
15. multer (1.4.4)

### How To Run
1. Download and install the latest version of [Node](https://nodejs.org/en/)
2. After successfully installing Node, run `npm install` or `npm i`
3. Run `npm run start` for the Eat, Cook, Repeat API. For another command, you can the scripts in package.json file

### How To Connect To The Database
1. Download and install the latest version of [Postgres from EDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. After successfully installing and setting Postgres, you can login to Postgres with the username (default: 'postgres') and password that are just set
3. After logging in, you can create the database just like the `DB_NAME` in this .env:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=db_eat_cook_repeat
   DB_PASSWORD=P@ssw0rd123
   DB_PORT=5432
   ```
4. Run this command to import the SQL file: `\i` <path where save your SQL database file> e.g.: C:/db.sql
5. Then connect to the database with `\c` <the name of your database>

### How to set ESLint and Prettier
1. ESLint (.eslintrc.json):
   ```
   {
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "extends": ["airbnb-base"],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "rules": {
      "indent": ["warn", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-console": 1,
      "comma-dangle": [0],
      "arrow-parens": [0],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "always"],
      "import/prefer-default-export": [0]
    }
   }
   ```
2. Prettier (.prettierrc.json):
   ```
   {
        "trailingComma": "es5",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": true
   }
   ```

(Recommended to be run in VS Code)