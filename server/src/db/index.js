const { Pool } = require('pg');
require('dotenv').config(); 



const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,	
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  CLIENT_URL: process.env.CLIENT_URL,
  pool
};