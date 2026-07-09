const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    // 1. Connect to MySQL without database selected to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server.');

    // 2. Create the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'high_life'}\`;`);
    console.log('Database created or already exists.');

    // 3. Switch to the newly created database
    await connection.query(`USE \`${process.env.DB_NAME || 'high_life'}\`;`);

    // 4. Create the products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price VARCHAR(100) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        bg_color VARCHAR(50) NOT NULL
      );
    `);
    console.log('Products table created or already exists.');

    // 4.5 Create the users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mobile_number VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        is_blocked BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table created or already exists.');

    try {
      await connection.query('ALTER TABLE users ADD COLUMN mobile_number VARCHAR(20) AFTER email;');
      console.log('Added mobile_number column to users table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding mobile_number column:', e.message);
      }
    }
    
    try {
      await connection.query('ALTER TABLE users ADD COLUMN is_blocked BOOLEAN DEFAULT false AFTER password;');
      console.log('Added is_blocked column to users table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding is_blocked column:', e.message);
      }
    }

    try {
      await connection.query('ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT \'user\' AFTER email;');
      console.log('Added role column to users table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding role column:', e.message);
      }
    }

    // 4.6 Create the orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        location VARCHAR(255) NOT NULL,
        total_amount VARCHAR(50) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        items JSON NOT NULL,
        payment_slip VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Orders table created or already exists.');

    // Add new columns to orders table for additional checkout details
    try {
      await connection.query('ALTER TABLE orders ADD COLUMN phone2 VARCHAR(20) AFTER mobile_number;');
      console.log('Added phone2 column to orders table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding phone2 column:', e.message);
    }
    
    try {
      await connection.query('ALTER TABLE orders ADD COLUMN order_notes TEXT AFTER location;');
      console.log('Added order_notes column to orders table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding order_notes column:', e.message);
    }

    try {
      await connection.query('ALTER TABLE orders ADD COLUMN address TEXT AFTER location;');
      await connection.query('ALTER TABLE orders ADD COLUMN city VARCHAR(100) AFTER address;');
      await connection.query('ALTER TABLE orders ADD COLUMN district VARCHAR(100) AFTER city;');
      await connection.query('ALTER TABLE orders ADD COLUMN postal_code VARCHAR(20) AFTER district;');
      console.log('Added address, city, district, postal_code columns to orders table.');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') console.error('Error adding location columns:', e.message);
    }

    // 5. Insert initial seed data if table is empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      const insertQuery = `
        INSERT INTO products (title, description, price, icon, bg_color) VALUES 
        ('Whole Spices', 'Experience the raw, unadulterated flavors of our premium whole spices, perfect for roasting and grinding.', '$12 - $45', '🌿', 'bg-[#e3d5ca]'),
        ('Ground Blends', 'Expertly crafted spice blends that bring authentic, complex flavors to your everyday cooking.', '$8 - $30', '🌶️', 'bg-[#d6ccc2]'),
        ('Aromatic Herbs', 'Dried to perfection, our herbs retain their vibrant color and essential oils for maximum taste.', '$5 - $20', '🍃', 'bg-[#edede9]'),
        ('Rare Finds', 'Discover unique and hard-to-find ingredients that will elevate your culinary masterpieces.', '$25 - $90', '✨', 'bg-[#f5ebe0]')
      `;
      await connection.query(insertQuery);
      console.log('Seed data inserted successfully.');
    } else {
      console.log('Products table already has data. Skipping seed insertion.');
    }

    await connection.end();
    console.log('Database setup complete!');

  } catch (err) {
    console.error('Error setting up the database:', err);
  }
}

setupDatabase();
