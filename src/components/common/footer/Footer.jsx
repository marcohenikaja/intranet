import React from "react"
import { blog } from "../../../dummydata"
import Button from '@mui/material/Button';
import "./footer.css"
import { Fade } from "react-reveal";
import { Link } from "react-router-dom"
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Footer = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défilement vers le haut de la page
  };



  const [mail,setMail]=useState('')
  const [question,setQuestion]=useState('')
const [alertvide , setAlertvide ]=useState(false)

  const sendmail=async()=>{
      if(mail=="" || question=="" ){
        setAlertvide(true) 
        setTimeout(() => {
          setAlertvide(false) 
        }, 2000);
      }else{
        const data = {mail,question}
       const  sendmail=  await axios.post(`${url}sendmail`,data)
      }
  }
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Connectez-vous à notre intranet pour accéder à toutes les informations et aux outils dont vous avez besoin pour réussir dans notre entreprise.</h1>
            {/* <span>Far far away, behind the word mountains</span> */}
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer >

        <div className='container padding'>
          <Fade left>
            <div className='box logo'>
              <h1>INTRANET</h1>
              <span>Explorez, partagez, collaborez</span>
              <p>Votre passerelle vers l'information, la collaboration et la réussite au sein de notre groupe.</p>

              <a href="https://www.facebook.com/groupe.np.akadin" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f icon"></i>
              </a>
              <a href="  https://www.linkedin.com/company/groupe-np-akadin/" target="_blank" rel="noopener noreferrer">
            <i className='fab fa-linkedin icon'></i>
            </a>
             
            </div>
          </Fade>


          <Fade bottom>
            <div className='box link'>
              <h3> Liens rapides</h3>
              <ul>
                <li> <Link to='/' onClick={scrollToTop}>Accueil</Link> </li>
                <li><Link to='/journal' onClick={scrollToTop}>Actualités </Link></li>
                <li> <Link to='/ressource' onClick={scrollToTop}>Ressources </Link></li>
                <li><Link to='/team' onClick={scrollToTop}>Groupe </Link></li>
              </ul>
            </div>
          </Fade>

          <Fade bottom>
            <div className='box'>
              <h3 >Slogan</h3>
              
                <li style={{ fontSize:'20px'}}>Innover</li> <br />
                <li style={{ fontSize:'20px'}}>aujourd'hui</li> <br />
                <li style={{ fontSize:'20px'}}>pour un lendemain</li> <br />
                <li style={{ fontSize:'20px'}}> meilleur.</li>
             
            </div>
          </Fade>
          <Fade bottom>
          <div className='box'>
            <h3>Sociétés</h3>
            {blog.slice(0, 4).map((val) => (
              <div className='itemss flexSB'>
           
                <div className='text'>
                 
                  <span>
                  
                    <label htmlFor='' style={{color:'#329358'}}>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          </Fade>
          <Fade right>
            <div className='box last'>
              <h3>Conditions Générales D’utilisation(CGU)</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <ArrowForwardIcon  />
              <Link to="/cgu" style={{ marginLeft: '5px' }} >
                Cliquez ici
              </Link>
              <ArrowBackIcon style={{  marginLeft: '5px' }} />
            </div>

            </div>
          </Fade>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 Tous droits réservés | C'est un modèle conçu par les membres de la DSI<i className='fa fa-heart'></i>
        </p>

      </div>
    </>
  )
}

export default Footer
