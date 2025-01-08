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
            <Col className="home-col"xl={12}>
        <div className="home-inner">
         <p className='home-intro'>Everyone remembers the 1996 epic creation that is Pokémon. Whether you collected the cards, watched the shows or played the games, Pokémon was probably part of your childhood.
         <br/>Our Pokémon page features the original 151 Pokémon!
         Use the Pokémon page to add your favourite Pokémon to your own personal Pokédex to learn more about your favourite pocket monsters!
         </p>
         <Container fluid className="home-media">
        <Row className="home-row">
          <Col xl ={4} sm={12}>
          <Card className="ven-fig">
            <Card.Img src={venasaur} alt="Venasaur"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-tcg">Trading Card Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8} sm={12}className='tcg-col'>
            <div className="tcg-card">
              <p> First launched in 1996, the TCG allows players to collect, trade, and build decks featuring their favorite Pokémon. Each card includes unique artwork, stats, and abilities, making collecting them as rewarding as battling them with other players. The original 1996 complete sets such as the Jungle set have been sold at auction for many thousands of dollars, especially those that contain full shiny editions. </p>
            </div>
            </Col>
          </Row>
          <Row className="home-row">
          
            <Col xl={4} sm={6}>
            <Card className="char-fig">
          <Card.Img src={charizard} alt="Charizard"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/animation/movies">Movies & Shows</Card.Link>
            </Card.Title>
          </Card>
            </Col>
            <Col xl={8} sm={6} className='movies-col'>
          <div className="movies-card">
             <p>Starting in 1997, the first season of the TV series Pokémon hit screens in Tokyo, with the anime being dubbed in English soon afterwards. 
              Fans loved following Ash Ketchum and his friends Brock and Misty while they accompany him on his journey to become a Pokémon master. <br/>
 The shows were extremely successful internationally with a movie being released in 1998 Pokémon: The First Movie. The film takes place during the first season of the show, Indigo League and introduces two new Pokémon, Mew and MewTwo. 
              </p>
          </div>
          </Col>
          </Row>
          <Row className="home-row">
            <Col xl={4} sm={6}>
          <Card className="blas-fig">
            <Card.Img src={blastoise} alt="Blastoise" />
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-video-games">Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8} sm={6} className='games-col'>
          <div className="games-card">
            <p>Pokémon Red and Pokémon Blue were released in 1996, kicking off one of the most successful gaming series of all time, selling 300 million copies world wide. They were quickly follow by Pokémon Yellow in 1998. <br/> The games were developed solely for the GameBoy, a handheld device that accepts cartridges as a software component.
              The games were well recieved by critics and have a cult following. The most recent games Pokémon Scarlett and Violet were released in 2022, highlighting the longevity and success of the franchise and how Pokémon has engaged multiple generations since childhood.</p>
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
