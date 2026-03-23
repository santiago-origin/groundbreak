const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      business_name VARCHAR(255) NOT NULL,
      owner_name VARCHAR(255) NOT NULL,
      address VARCHAR(500),
      zip VARCHAR(20),
      city VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Database initialized');
}

module.exports = { pool, initDb };
