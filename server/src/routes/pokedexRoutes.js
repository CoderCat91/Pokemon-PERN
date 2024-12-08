const express = require('express');
const router = express.Router();
const db = require('../db/index');



router.post('/add', async (req, res) => {
    const { user_id, pokemon_num } = req.body;
  
    if (!user_id || !pokemon_num) {
      return res.status(400).json({ message: "Missing required fields: user_id or pokemon_num" });
    }
  
    try {
        // Fetch Pokémon details from the pokemon table
        const pokemon = await db.query(
            `SELECT name, type, health, attacks, evolves_into, images FROM pokemon WHERE pokemon_num = $1`,
            [pokemon_num]
        );
  
        if (pokemon.rows.length === 0) {
            return res.status(404).json({ error: 'Pokémon not found' });
        }
  
        const { name, type, health, attacks, evolves_into, images } = pokemon.rows[0];
  
        // Insert Pokémon details into the pokedex table
        const result = await db.query(
            `INSERT INTO pokedex (user_id, pokemon_num, name, type, health, attacks, evolves_into, images)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [user_id, pokemon_num, name, type, health, attacks, evolves_into, images]
        );
  
    
        res.status(201).json({ message: "Pokemon added to Pokedex", data: result.rows[0] });
    } catch (error) {
      console.error("Error adding Pokémon to Pokedex:", error);
      res.status(500).json({ message: "Failed to add Pokémon to Pokedex" });
    }
  });
  
  
  //Get pokemon from specific users table
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
  
    try {
        const result = await db.query(
            `SELECT pokemon_num, name, type, health, attacks, evolves_into, images
             FROM pokedex WHERE user_id = $1`,
            [user_id]
        );
  
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.delete('/:user_id/:pokemon_num', async (req, res) => {
    const { user_id, pokemon_num } = req.params;
    if (!user_id || !pokemon_num) {
      return res.status(400).json({ message: 'Missing required fields: user_id or pokemon_num' });
    }
  
    try {
      const result = await db.query(
        `DELETE FROM pokedex WHERE user_id = $1 AND pokemon_num = $2 RETURNING *`,
        [user_id, pokemon_num]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Pokémon not found in Pokedex for this user' });
      }
      res.status(200).json({ message: 'Pokémon successfully deleted from Pokedex' });
    } catch (error) {
      console.error('Error deleting Pokémon from Pokedex:', error);
      res.status(500).json({ message: 'Failed to delete Pokémon from Pokedex' });
    }
  });

module.exports = router