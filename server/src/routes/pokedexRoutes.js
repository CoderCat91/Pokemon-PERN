const express = require('express');
const router = express.Router();
const db = require('../db/index');


//Add pokemon to pokedex
router.post('/add', async (req, res) => {
    const { user_id, pokemon_num } = req.body;  
    if (!user_id || !pokemon_num) {
      return res.status(400).json({ message: "Missing required fields: user_id or pokemon_num" });
    }
    try {
        const pokemon = await db.query(
            `SELECT name, type, health, attacks, evolves_into, images, subtype, height, weight, description, second_attack, weakness, strength, evolve_image FROM pokemon WHERE pokemon_num = $1`,
            [pokemon_num]
        );
        if (pokemon.rows.length === 0) {
            return res.status(404).json({ error: 'Pokemon not found' });
        }
        const { name, type, health, attacks, evolves_into, images, subtype, height, weight, description, weakness, strength, second_attack, evolve_image} = pokemon.rows[0];
        const result = await db.query(
            `INSERT INTO pokedex (user_id, pokemon_num, name, type, health, attacks, evolves_into, images, subtype, height, weight, description, weakness, strength, second_attack, evolve_image)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [user_id, pokemon_num, name, type, health, attacks, evolves_into, images, subtype, height, weight, description, weakness, strength, second_attack, evolve_image]
        );
        res.status(201).json({ message: "Pokemon added to Pokedex", data: result.rows[0] });
    } catch (error) {
      console.log("Error adding Pokemon to Pokedex:", error);
      res.status(500).json();
    }
  });
  
  
  //Get pokemon from specific users table
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
  
    try {
        const result = await db.query(
            `SELECT id, pokemon_num, date_caught, name, type, health, attacks, evolves_into, images, subtype, height, weight, description, weakness, strength, second_attack, evolve_image
             FROM pokedex WHERE user_id = $1`,
            [user_id]
        );
  
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
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
        return res.status(404).json({ message: 'Pokemon not found in Pokedex for this user' });
      }
      res.status(200).json({ message: 'Pokemon successfully deleted from Pokedex' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete Pokemon from Pokedex' });
    }
  });

module.exports = router