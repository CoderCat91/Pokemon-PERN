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
         <p>Eveyone remembers the 1995 epic creation that is Pokemon. Whether you collected the cards, watched the shows or played the games, Pokemon was part of your childhood. This PokeDex features the original 151 Pokemon!
         Use the PokeDex to learn about your favourite pocket monsters, then add them to your own personal PokeDex!
         </p>
         <Container fluid className="home-media">
        <Row>
          <Col xl ={4}>
          <Card className="ven-fig">
            <Card.Img src={venasaur} alt="Venasaur"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-tcg">Trading Card Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8}>
            <Card>
              <Card.Title>
                Trading Card Games
              </Card.Title>
              <Card.Body>
              <p></p>
              </Card.Body>
            </Card>
            </Col>
          </Row>
          <Row>
          
            <Col xl={4}>
            <Card className="char-fig">
          <Card.Img src={charizard} alt="Charizard"/>
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/animation/movies">Movies & Shows</Card.Link>
            </Card.Title>
          </Card>
            </Col>
            <Col xl={8}>
          <Card>
            <Card.Title>Movies & Shows</Card.Title>
              <Card.Body>
             <p></p>
              </Card.Body>
 
          </Card>
          </Col>
          </Row>
          <Row>
            <Col xl={4}>
          <Card className="blas-fig">
            <Card.Img src={blastoise} alt="Blastoise" />
            <Card.Title>
              <Card.Link href="https://www.pokemon.com/uk/pokemon-video-games">Games</Card.Link>
            </Card.Title>
          </Card>
          </Col>
          <Col xl={8}>
          <Card>
            <Card.Title>
              Games
            </Card.Title>
            <Card.Body>
            <p>Pokemon, Red and Blue kicked off one of the most successful GamyBoy game series of all time, selling X amount of games in the first year. In XXXX GameBoy was put a small device that could only display games in black and white.</p>
            </Card.Body>
          </Card>
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
