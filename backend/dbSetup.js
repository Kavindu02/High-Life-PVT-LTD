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
