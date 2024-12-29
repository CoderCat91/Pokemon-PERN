const express = require('express');
const app = express();
const { CLIENT_URL} = require('./src/constants/index')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const { Client } = require('pg');  
const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes')
const pokemonRoutes = require('./src/routes/PokemonRoutes')
const pokedexRoutes = require('./src/routes/pokedexRoutes')
require('./src/middleware/middleware');


app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

//initialize routes
app.use('/api', authRoutes)
app.use('/api/v1/pokemon', pokemonRoutes)
app.use('/api/v1/pokedex', pokedexRoutes)


const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


