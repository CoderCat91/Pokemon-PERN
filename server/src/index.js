const express = require('express');
const app = express();
const { PORT, CLIENT_URL} = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require("morgan");
const db = require('./db')

require('./middleware/passport-middleware')


app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

//import routes
const authRoutes = require('./routes/auth')

//initialize routes
app.use('/api', authRoutes)


// get all Pokemon
app.get('/api/v1/pokemon', async (req, res) => {
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
app.get('/api/v1/pokemon/:id', async (req, res) => {
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

//User pokedex routes

app.get('/api/v1/dashboard', async (req, res) => {
  try {
    const results = await db.query("select * from dashboard")
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

// add Pokemon to pokedex
app.post("/api/v1/dashboard", async (req, res) => {
  try {
    const { pokemon_num, name, type, health, attacks, evolves_into, images } = req.body;

    // Insert the selected Pokémon into the dashboard table
    const result = await db.query(
      "INSERT INTO dashboard (pokemon_num, name, type, health, attacks, evolves_into, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [pokemon_num, name, type, health, attacks, evolves_into, images]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0], // The added Pokémon record
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while adding the Pokémon.",
    });
  }
});


app.delete("/api/v1/dashboard/:pokemon_num", async (req, res) => {
  try {
    const { pokemon_num } = req.params; // Extract pokemon_num from URL parameter
    await db.query("DELETE FROM dashboard WHERE pokemon_num = $1", [pokemon_num]); // Delete row with the given pokemon_num

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the Pokémon.",
    });
  }
});

//app start
const appStart = () => {
    try {
      app.listen(PORT, () => {
        console.log(`The app is running at http://localhost:${PORT}`)
      })
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  
  appStart()