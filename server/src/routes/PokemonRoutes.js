const express = require('express');
const router = express.Router();
const db = require('../db/index');
//const authenticateToken = require('../middleware/authMiddleware');

// get all Pokemon
router.get('/', async (req, res) => {
    try {
      const results = await db.query("select * from pokemon")
      console.log(results)
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          pokemon: results.rows
        },
      })
    } catch (err) {
  console.log(err)
    }
  });
  
  // get one Pokemon
  router.get('/:id', async (req, res) => {
    try {
      const results = await db.query("select * from pokemon where pokemon_num = $1", [req.params.id])
      console.log(results)
      res.status(200).json({
        status: "success",
        data: {
          pokemon: results.rows[0]
        },
      })
    }catch (err) {
  console.log(err)
    }
  
  });
  
module.exports = router