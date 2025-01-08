import React from 'react'
import './Footer.scss';
import {Container} from 'react-bootstrap';
const Footer = () => {
  return (
    <Container fluid className="footer-wrapper">©2024 Pokémon. ©1995 - 2024 Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.<br/>
    <p>Background images provided by <a href="www.freepik.com">Freepik</a></p>
</Container>
  )
}

export default Footer;