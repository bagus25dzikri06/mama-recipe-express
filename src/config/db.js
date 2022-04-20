// Connection config
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Database connection
pool.connect((err) => {
    console.log(err ? err.message : 'PostgreSQL is connected');
});

module.exports = {
    pool,
};
