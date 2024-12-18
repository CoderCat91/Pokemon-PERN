import React from 'react'
import Footer from '../Footer/Footer'
import './Home.scss';
import venasaur from '../../images/ezgif.com-webp-to-png (3).png';
import blastoise from '../../images/ezgif.com-webp-to-png (9).png';
import charizard from '../../images/ezgif.com-webp-to-png (6).png'

const Home = () => {
    return (
    <div>
        <div className="home-wrapper">
        <h2>Pokémon - Did you catch 'em all?</h2>
        <div className="home-inner">
         <p>Eveyone remembers the 1995 epic creation that is Pokemon. Whether you collected the cards, watched the shows or played the games, Pokemon was part of your childhood. This PokeDex features the original 151 Pokemon!
         Use the PokeDex to learn about your favourite pocket monsters, then add them to your own personal PokeDex!
         </p>
         <div className="home-media">
         <a href="https://www.pokemon.com/uk/pokemon-tcg"> 
         <figure className='ven-fig'>
         <img src={venasaur} alt="Venasaur"/>
         <figcaption>Trading Card Games</figcaption>
         </figure>
         </a>
         <a href="https://www.pokemon.com/uk/animation/movies">
         <figure className="char-fig">
        <img src={charizard} alt="Charizard"/>
        <figcaption>Movies & Shows</figcaption>
        </figure>
        </a>
        <a href="https://www.pokemon.com/uk/pokemon-video-games">
        <figure className="blas-fig">
        <img src={blastoise} alt="Blastoise"/>
        <figcaption>Games</figcaption>
        </figure>
        </a>
         </div>
         </div>
        </div>
     
<Footer/>          
    </div>

  )
}

export default Home
