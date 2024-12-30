const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const passport = require('passport')
//const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes')
const pokemonRoutes = require('./src/routes/PokemonRoutes')
const pokedexRoutes = require('./src/routes/pokedexRoutes');
//const { CLIENT_URL } = require('./src/db/index');
require('./src/middleware/middleware');


app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

//initialize routes
app.use('/api', authRoutes)
app.use('/api/v1/pokemon', pokemonRoutes)
app.use('/api/v1/pokedex', pokedexRoutes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


