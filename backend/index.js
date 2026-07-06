const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'highlife_kulu_badu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Basic endpoint to test server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Endpoint to fetch categories/products
app.get('/api/categories', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Test the database connection before starting the server
pool.getConnection()
  .then((connection) => {
    console.log('Successfully connected to the database.');
    connection.release(); // Release the connection back to the pool
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database. Make sure XAMPP (MySQL) is running!');
    console.error('Error details:', err.message);
    process.exit(1); // Exit with failure
  });
