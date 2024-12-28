import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {Container, Row, Col, Card} from 'react-bootstrap'
import './Home.scss';
import logo from '../../images/Pokemon_logo_PNG2.png'
import venasaur from '../../images/ezgif.com-webp-to-png (3).png';
import blastoise from '../../images/ezgif.com-webp-to-png (9).png';
import charizard from '../../images/ezgif.com-webp-to-png (6).png'

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
         <p>Eveyone remembers the 1995 epic creation that is Pokemon. Whether you collected the cards, watched the shows or played the games, Pokemon was part of your childhood. This PokeDex features the original 151 Pokemon!
         Use the PokeDex to learn about your favourite pocket monsters, then add them to your own personal PokeDex!
         </p>
         <div className="home-media">
          <Card className="ven-fig">
            <Card.Img src={venasaur} alt="Venasaur"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-tcg">Trading Card Games</Card.Link>
            </Card.Title>
          </Card>
          <Card className="char-fig">
          <Card.Img src={charizard} alt="Charizard"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/animation/movies">Movies & Shows</Card.Link>
            </Card.Title>
          </Card>
          <Card className="blas-fig">
            <Card.Img src={blastoise} alt="Blastoise" />
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-video-games">Games</Card.Link>

            </Card.Title>
          </Card>
         </div>
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
