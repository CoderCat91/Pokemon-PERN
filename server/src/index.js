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


// create Pokemon
app.post('/api/v1/pokemon', async (req, res) => {
  try {
    const results = await db.query("INSERT INTO pokemon (pokemon_num, name, type, health, attacks, evolves_into) values ($1, $2, $3, $4, $5, $6) returning *",
    [req.body.pokemon_num, req.body.name, req.body.type, req.body.health, req.body.attacks, req.body.evolves_into])
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        pokemon: results.rows[0]
      },
    })
  }catch (err){
console.log(err)
  }
})

//update Pokemon
app.put("/api/v1/pokemon/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE pokemon SET pokemon_num = $1, name = $2, type = $3, health = $4, attacks = $5, evolves_into = $6 where id = $7 returning *",
      [req.body.pokemon_num, req.body.name, req.body.type, req.body.health, req.body.attacks, req.body.evolves_into, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.delete("/api/v1/pokemon/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM pokemon where id = $1", 
    [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
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