const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
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

// Endpoint to register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    
    // Check if user exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, mobile_number, password) VALUES (?, ?, ?, ?)',
      [name, email, mobileNumber, hashedPassword]
    );

    res.status(201).json({ id: result.insertId, name, email, mobileNumber });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Endpoint to login a user
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, email, password } = req.body;
    const loginId = identifier || email;
    
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ? OR name = ?', [loginId, loginId]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    // Send back user data
    res.json({ id: user.id, name: user.name, email: user.email, mobileNumber: user.mobile_number });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
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
