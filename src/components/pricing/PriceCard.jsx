
import React from "react"

import logoakadin from '../../../src/img/logo/LOGO AKADIN.png'
import logoguilman from '../../../src/img/logo/LOGO GUILMANN sans Slogan.png'
import logostta from '../../../src/img/logo/STTA LOGO - Simple.png'
import logospider from '../../../src/img/logo/LOGO SPIDER ORIGINAL.png'
import { Fade } from "react-reveal"
import './pricecard.css'

const PriceCard = () => {
   const isSmallScreen = () => window.innerWidth <= 768;
 
   return (
     <>
       <Fade left>
         <div className={`items shadow ${isSmallScreen() ? 'small-screen' : ''}`}>
           <h4><img style={{ width: isSmallScreen() ? '80%' : '50%' }} src={logoakadin} alt="Logo Akadin" /></h4>
           <p>Société d'exploitation immobilière</p>
           <a href="https://www.linkedin.com/company/akadin/"><button className='outline-btn'>En savoir plus</button></a>
         </div>
       </Fade>
 
       <Fade top>
         <div className={`items shadow ${isSmallScreen() ? 'small-screen' : ''}`}>
           <h4><img style={{ width: isSmallScreen() ? '80%' : '50%' }} src={logoguilman} alt="Logo Guilmann" /></h4>
           <p>Fondée en décembre 2009, la société Guilmann est une société d’installation et d’ingénierie, partenaire de diverses marques de renommée mondiale.</p>
           <a href="https://www.guilmann.mg/"><button className='outline-btn'>En savoir plus</button></a>
         </div>
       </Fade>
 
       <Fade bottom>
         <div className={`items shadow ${isSmallScreen() ? 'small-screen' : ''}`}>
           <h4><img style={{ width: isSmallScreen() ? '80%' : '50%' }} src={logostta} alt="Logo STTA" /></h4>
           <p>STTA (SOCIETE DE TRANSPORT ET DE TERRASSEMENT D’ANTSIRABE)</p>
           <a href="#"><button className='outline-btn'>En savoir plus</button></a>
         </div>
       </Fade>
 
       <Fade right>
         <div className={`items shadow ${isSmallScreen() ? 'small-screen' : ''}`}>
           <h4><img style={{ width: isSmallScreen() ? '80%' : '50%' }} src={logospider} alt="Logo Spider" /></h4>
           <p>Distributeur des matériels et des accessoires électriques</p>
           <a href="https://www.spider.mg/"><button className='outline-btn'>En savoir plus</button></a>
         </div>
       </Fade>

       
     </>
   );
 }
 
 export default PriceCard;