import React from 'react';
import './histo.css'
import { Fade } from 'react-reveal';
import Awrapper from '../about/Awrapper';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Histo = () => {
    const divStyle = {
        marginTop: '500px',
      }; 


      function handleClick() {
        // Actualisez la page
        window.location.reload();
      }
    
      const textStyle = {
        color: '#666697',
      };
    
      const h6Style = {
        color: '#329358',
      };
    return (
        <div>
             <section className='backhisto'></section>
             <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '200px', textAlign: 'center', }}>
                <Fade top>
                    <h2 style={{ textAlign: 'center', fontSize: '80px', color: 'white' }}>Notre histoire</h2>
                </Fade>
               
                <div style={divStyle}>
                    <p style={textStyle}>
                     <Fade top>  <h6 style={{fontSize: '80px',marginBottom:'70px',color:'#329358' ,marginTop:'600px'}}>Histoire</h6></Fade> 
                     <Fade top>
                        <p>
                          L'histoire du groupe NP AKADIN est une épopée inspirante qui a débuté avec la volonté ardente de deux fondateurs, <br/> animés par un objectif commun : contribuer à un avenir radieux pour leur pays. <br/>Malgré leurs origines diverses, 
                         ils partageaient une vision audacieuse et un rêve de changement positif.<br/> Ensemble, ils ont jeté les bases de ce qui est aujourd'hui NP AKADIN.
                        </p>
                        </Fade >
                    </p>
                    <div style={{marginBottom:'100px'}}></div>
                   
                  <Fade top>  <h6 style={h6Style}>Une Collaboration Fraternelle</h6> </Fade>
                  <Fade top>
                    <p style={textStyle}>
                    Notre histoire est celle d'une collaboration fraternelle qui a prospéré grâce à une passion partagée pour l'innovation, <br/>l'excellence et la responsabilité. Les fondateurs ont réussi à rassembler autour d'eux un groupe de visionnaires,<br/> d'experts et d'entrepreneurs partageant les mêmes idéaux. <br/>Le groupe NP AKADIN est devenu le reflet de cette diversité de talents et d'expériences,<br/> un véritable melting-pot d'idées et d'aspirations.
                    </p>
                    </Fade>
                    <div style={{marginBottom:'100px'}}></div>
                  <Fade top>  <h6 style={h6Style}>Évolution et Dévouement</h6></Fade>
                  <Fade top>
                    <p style={textStyle}>
                    Au fil des années, chaque membre de notre groupe a grandi et évolué,<br/> repoussant les limites de l'ingéniosité et de l'engagement. <br/>Ensemble au sein de cette nouvelle famille, nous sommes fiers de notre héritage, <br/>forgé par des défis surmontés et des opportunités saisies, tout en restant fidèles à nos valeurs fondamentales.<br/>

                    Aujourd'hui, le groupe NP AKADIN incarne la vision de ses fondateurs,<br/> et nous continuons à écrire notre histoire avec audace, détermination et l'espoir d'un futur plus radieux pour notre pays et au-delà. <br/>Notre histoire est le reflet de notre engagement envers l'innovation,<br/> l'excellence et un changement positif continu. Rejoignez-nous dans cette aventure passionnante.
                    </p>
                    </Fade>
                </div>
                <div style={{marginBottom:'100px'}}></div>
               
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ArrowForwardIcon style={{ color: 'red' }} />
      <Link to="/cgu" style={{ fontSize: '24px' }} >
        Lire notre CGU
      </Link>
      <ArrowBackIcon style={{ color: 'red' }} />
    </div>


            </div>
              <Awrapper/>

              
        </div>
    );
};

export default Histo;