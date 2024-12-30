const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  
  ssl: { rejectUnauthorized: false },          
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.stack);
  }
}

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};