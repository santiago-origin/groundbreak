const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { pool, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

// API routes
app.post('/api/submissions', async (req, res) => {
  const { business_name, owner_name, address, zip, city, state } = req.body;

  if (!business_name || !owner_name || !city || !state) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO submissions (business_name, owner_name, address, zip, city, state)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [business_name, owner_name, address || null, zip || null, city, state]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Serve React build
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`GroundBreak server running on port ${PORT}`);
  });
});
