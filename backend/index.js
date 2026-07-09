const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { sendOrderConfirmation } = require('./emailService');
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
    
    // Check if it's admin
    if (loginId === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return res.json({ role: 'admin', email: process.env.ADMIN_EMAIL });
    }
    
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ? OR name = ?', [loginId, loginId]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    const user = users[0];

    // Check if blocked
    if (user.is_blocked) {
      return res.status(403).json({ error: 'Your account has been blocked by the administrator.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    // Send back user data
    res.json({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      mobileNumber: user.mobile_number, 
      role: user.role || 'user',
      address: user.address || '',
      city: user.city || '',
      district: user.district || '',
      postalCode: user.postal_code || ''
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// --- ADMIN ROUTES ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    res.json({ message: 'Admin login successful', role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, mobile_number, is_blocked, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Toggle role status
app.put('/api/admin/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'User role updated successfully' });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Toggle block status
app.put('/api/admin/users/:id/block', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_blocked } = req.body;
    await pool.query('UPDATE users SET is_blocked = ? WHERE id = ?', [is_blocked ? 1 : 0, id]);
    res.json({ message: 'User block status updated successfully' });
  } catch (err) {
    console.error('Error updating block status:', err);
    res.status(500).json({ error: 'Failed to update user block status' });
  }
});

// Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
app.put('/api/admin/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// --- ORDER ROUTES ---
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, email, mobile_number, phone2, location, address, city, district, postal_code, order_notes, total_amount, payment_method, items } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO orders (customer_name, email, mobile_number, phone2, location, address, city, district, postal_code, order_notes, total_amount, payment_method, items, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [customer_name, email, mobile_number, phone2, location, address, city, district, postal_code, order_notes, total_amount, payment_method, JSON.stringify(items), 'Approved']
    );

    // Update user's address details if they are a registered user
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      await pool.query(
        'UPDATE users SET address = ?, city = ?, district = ?, postal_code = ? WHERE email = ?',
        [address, city, district, postal_code, email]
      );
    }

    // Send email confirmation asynchronously
    sendOrderConfirmation(req.body, result.insertId);

    res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Server error during order creation' });
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
