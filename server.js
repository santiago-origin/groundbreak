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
  const {
    owner_names, legal_business_name, legal_business_address, shop_address,
    mobile_services, operating_hours, website,
    services, services_other,
    wrap_brands, ppf_brands, tint_brands, ceramic_brands,
    wrap_warranty, ppf_warranty, tint_warranty, ceramic_warranty,
    wrap_install_time, ppf_install_time, tint_install_time, ceramic_install_time, detail_install_time,
    waiting_area, key_drop, ride_assistance, dropoff_instructions,
    competitors,
  } = req.body;

  if (!owner_names || !legal_business_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Forward to n8n webhook (fire and forget)
  const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL || 'https://auto.theoriginagency.net/webhook/groundbreak-onboarding';
  fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }).catch((err) => console.error('n8n webhook error:', err.message));

  try {
    const servicesStr = Array.isArray(services) ? services.join(', ') : services || '';

    const result = await pool.query(
      `INSERT INTO submissions (
        owner_names, legal_business_name, legal_business_address, shop_address,
        mobile_services, operating_hours, website,
        services, services_other,
        wrap_brands, ppf_brands, tint_brands, ceramic_brands,
        wrap_warranty, ppf_warranty, tint_warranty, ceramic_warranty,
        wrap_install_time, ppf_install_time, tint_install_time, ceramic_install_time, detail_install_time,
        waiting_area, key_drop, ride_assistance, dropoff_instructions,
        competitors
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)
      RETURNING *`,
      [
        owner_names, legal_business_name, legal_business_address || null, shop_address || null,
        mobile_services || null, operating_hours || null, website || null,
        servicesStr, services_other || null,
        wrap_brands || null, ppf_brands || null, tint_brands || null, ceramic_brands || null,
        wrap_warranty || null, ppf_warranty || null, tint_warranty || null, ceramic_warranty || null,
        wrap_install_time || null, ppf_install_time || null, tint_install_time || null, ceramic_install_time || null, detail_install_time || null,
        waiting_area || null, key_drop || null, ride_assistance || null, dropoff_instructions || null,
        competitors || null,
      ]
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
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`GroundBreak server running on port ${PORT}`);
  });
});
