const express = require('express');
const router = express.Router();
const db = require('../db/index');


// get all Pokemon
router.get('/', async (req, res) => {
    try {
      const results = await db.query("select * from pokemon");
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Pokemon list not found' });
    }
      res.status(200).json({
        results: results.rows.length,
        data: {
          pokemon: results.rows
        },
      })
    } catch (err) {
  console.log(err)
  res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // get one Pokemon
  router.get('/:id', async (req, res) => {
    try {
      const results = await db.query("select * from pokemon where pokemon_num = $1", [req.params.id])
      if (results.rows.length === 0) {
        return res.status(404).json({ message: 'Pokémon not found in Pokedex for this user' });
      }
      res.status(200).json({
        data: {
          pokemon: results.rows[0]
        },
      })
    }catch (err) {
  console.log(err)
  res.status(500).json({ error: 'Internal Server Error' });
    }
  
  });
  
module.exports = router