const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  // Drop old schema if columns don't match (fresh app, no production data)
  const check = await pool.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'owner_email'
  `);
  if (check.rows.length === 0) {
    await pool.query('DROP TABLE IF EXISTS submissions');
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      owner_names VARCHAR(500),
      owner_email VARCHAR(500),
      owner_phone VARCHAR(100),
      legal_business_name VARCHAR(500),
      legal_business_address VARCHAR(1000),
      shop_address TEXT,
      mobile_services VARCHAR(10),
      operating_hours TEXT,
      website VARCHAR(500),
      services TEXT,
      services_other TEXT,
      wrap_brands TEXT,
      ppf_brands TEXT,
      tint_brands TEXT,
      ceramic_brands TEXT,
      wrap_warranty TEXT,
      ppf_warranty TEXT,
      tint_warranty TEXT,
      ceramic_warranty TEXT,
      wrap_install_time VARCHAR(200),
      ppf_install_time VARCHAR(200),
      tint_install_time VARCHAR(200),
      ceramic_install_time VARCHAR(200),
      detail_install_time VARCHAR(200),
      waiting_area VARCHAR(10),
      key_drop VARCHAR(10),
      ride_assistance VARCHAR(10),
      dropoff_instructions TEXT,
      competitors TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Database initialized');
}

module.exports = { pool, initDb };
