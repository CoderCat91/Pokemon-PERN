import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {Container, Row, Col, Card} from 'react-bootstrap'
import './Home.scss';
import logo from '../../images/Pokemon_logo_PNG2.webp'
import venasaur from '../../images/ezgif.com-webp-to-png (3) (1).webp';
import blastoise from '../../images/ezgif.com-webp-to-png (9).webp';
import charizard from '../../images/ezgif.com-webp-to-png (6).webp'

const Home = () => {
    return (
    <>
        <div className="home-page">
        <Header/>
          <div className='logo-wrapper'>
            <img src={logo} alt="Pokemon logo"/>
          </div>
        <p className="home-text">Did you catch 'em all?</p>
        <Container fluid className="home-container">
          <Row>
            <Col xl={12}>
        <div className="home-inner">
         <p className='home-intro'>Everyone remembers the 1996 epic creation that is Pokémon. Whether you collected the cards, watched the shows or played the games, Pokémon was probably part of your childhood. Our Pokémon page features the original 151 Pokémon!
         Use the Pokémon page to add your favourite Pokémon to your own personal Pokédex to learn more about your favourite pocket monsters!
         </p>
         <Container fluid className="home-media">
        <Row className="home-row">
          <Col xl ={4}>
          <Card className="ven-fig">
            <Card.Img src={venasaur} alt="Venasaur"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-tcg">Trading Card Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8} className='tcg-col'>
            <div className="tcg-card">
              <p> First launched in 1996, the TCG allows players to collect, trade, and build decks featuring their favorite Pokémon. Each card includes unique artwork, stats, and abilities, making collecting them as rewarding as battling them with other players. The Pokémon TCG has also become a valuable venture, with rare cards like a shiny Charizard and special edition sets fetching high prices and admiration. The original 1996 complete sets such as the Jungle set have been sold at auction for many thousands of dollars, especially those that contain full shiny editions. </p>
            </div>
            </Col>
          </Row>
          <Row className="home-row">
          
            <Col xl={4}>
            <Card className="char-fig">
          <Card.Img src={charizard} alt="Charizard"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/animation/movies">Movies & Shows</Card.Link>
            </Card.Title>
          </Card>
            </Col>
            <Col xl={8} className='movies-col'>
          <div className="movies-card">
             <p>Starting in 1997, the first season of the TV series Pokémon hit screens in Tokyo, with the anime being dubbed in English soon afterwards. 
              Fans loved the humour, adventurous story lines and following the main protagonist Ash Ketchum while he starts his journey to become a Pokémon master. 
              His journey takes many exciting twists and turns, which captures the attention of Jesse, James and Meowth also known as Team Rocket. The trio of Pokémon theives become obsessed with capturing Ash's Pikachu, but his faithful friends Brock and Misty help Ash to defeat Team Rocket and save countless Pokémon from being captured. The shows were extremely successful internationally with a movie being released in 1998 Pokémon: The First Movie. The film takes place during the first season of the show, Indigo League and introduces two new Pokémon, Mew and MewTwo. 
              </p>
          </div>
          </Col>
          </Row>
          <Row className="home-row">
            <Col xl={4}>
          <Card className="blas-fig">
            <Card.Img src={blastoise} alt="Blastoise" />
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-video-games">Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8} className='games-col'>
          <div className="games-card">
            <p>Pokémon Red and Pokémon Blue were released in 1996, kicking off one of the most successful gaming series of all time, selling 300 million copies world wide. They were quickly follow by Pokémon Yellow in 1998. The games were developed solely for the GameBoy, a handheld device that accepts cartridges as a software component.
              The games were well recieved by critics and have a cult following. Pokémon Gold and Silver were later released in 1999, with Pokémon Crystal launching in 2000. The most recent games Pokémon Scarlett and Violet were released in 2022, highlighting the longevity and success of the franchise and how Pokémon has engaged multiple generations since childhood.</p>
          </div>
          </Col>
          </Row>
          
         </Container>
         </div>
         </Col>
         </Row>
         </Container>
        </div>
     
<Footer/>          
    </>

  )
}

export default Home
