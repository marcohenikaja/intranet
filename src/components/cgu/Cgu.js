import React from 'react';
import Heading from '../common/heading/Heading';
import Awrapper from '../about/Awrapper';
import './cgu.css';
import { Fade } from 'react-reveal';
const paragraphStyle = {
    margin: '20px 0',
    lineHeight: '1.5',
  };
  
  const headingStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };
  
  const subtitleStyle = {
    fontSize: '16px',
    color: '#555',
  };
  
  const containerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
  };
const Cgu = () => {
    return (
    <>  

            <section className='back6'></section>
            <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '200px' ,marginBottom:'500px'}}>
                <Fade top>
                     <h1 style={{ fontSize: '80px', color: 'white' }}>Conditions Générales D’utilisation(CGU) </h1>
                </Fade>
                
            </div>

        <div style={containerStyle}>
        <div>
        <Fade top>
           <Heading  title="Conditions Générales D'utilisation"/ >
           </Fade>
           <Fade top>
          <p style={paragraphStyle}>
            Bienvenue sur l'intranet de notre entreprise. Nous sommes ravis de vous offrir cet outil collaboratif conçu pour améliorer la communication interne et la diffusion d'informations au sein de notre organisation. Avant de commencer à utiliser notre intranet, veuillez prendre quelques instants pour lire et comprendre les conditions générales d'utilisation (CGU) ci-dessous.
          </p>
          </Fade>
        </div>
    
        <div>
        <Fade left>
          <h2 style={headingStyle}><u> Objectif de l'intranet :</u></h2> </Fade>
          <Fade bottom>
          <p style={paragraphStyle}>
            L'intranet est avant tout un outil collaboratif conçu pour faciliter la communication interne, accélérer le partage d'informations au sein de l'entreprise, et favoriser la collaboration entre les membres de notre organisation.
          </p>
          </Fade>
        </div>
    
        <div>
        <Fade left> <h2 style={headingStyle}><u>Respect mutuel et courtoisie :</u></h2></Fade>
        <Fade bottom><p style={paragraphStyle}>
            Nous encourageons un respect mutuel dans toutes les communications sur l'intranet. Nous vous rappelons qu'il est possible d'être cordial tout en exprimant des opinions et des commentaires de manière constructive et respectueuse.
          </p>
          </Fade>
        </div>
    
        <div>
        <Fade left>  <h2 style={headingStyle}> <u>Accès aux informations par département :</u></h2> </Fade>
        <Fade top>
          <p style={paragraphStyle}> 

            Chaque direction au sein de l'entreprise disposera d'un accès au menu de son département sur l'intranet. Cette fonctionnalité permet à chaque département de partager des informations pertinentes pour ses membres.
          </p>
          </Fade>
        </div>


        <div>
        <Fade left> <h2 style={headingStyle}>  <u>Super administrateurs :</u> </h2> </Fade>
        <Fade bottom>
          <p style={paragraphStyle}>
          Deux super administrateurs seront de veille pour modérer le site et veiller à son bon fonctionnement. Ils auront des droits étendus pour gérer les contenus et les utilisateurs.
          </p></Fade>
        </div>

        <div>
        <Fade left>  <h2 style={headingStyle}> <u> Menu Actualités : </u>   </h2></Fade>
        <Fade bottom>
          <p style={paragraphStyle}>
          Le menu "Actualités" est ouvert à tous les membres de l'entreprise pour partager des informations. Il est divisé en trois sections :
            "Bons Plans" : Partagez vos astuces, recommandations, ou opportunités bénéfiques pour les membres de l'entreprise.
            "Actu Collaborateurs" : Restez informés des actualités et événements liés à vos collègues.
            "Actus Entreprises" : Tenez-vous au courant des dernières nouvelles et mises à jour de l'entreprise.
            En utilisant notre intranet, vous acceptez de respecter ces conditions générales d'utilisation. Nous nous réservons le droit de mettre à jour ces CGU à tout moment. Il est de votre responsabilité de consulter régulièrement cette page pour vous tenir informé des éventuelles modifications. En cas de non-respect des présentes CGU, nous nous réservons le droit de prendre des mesures appropriées, y compris la révocation de l'accès à l'intranet.
            Nous vous remercions de contribuer à faire de notre intranet un outil de communication interne efficace et respectueux de tous les membres de l'entreprise.
          </p>
          </Fade>
        </div>
      

        <div>
        <Fade left>  <h2 style={headingStyle}>  <u>Évolution du design du site :</u>  </h2></Fade>
        <Fade bottom>
          <p style={paragraphStyle}>
          Le design du site évoluera en fonction des besoins internes et des retours des utilisateurs, afin de garantir une expérience optimale pour tous. 
          </p> <br></br>
          <p>
          En utilisant notre intranet, vous acceptez de respecter ces conditions générales d'utilisation. Nous nous réservons le droit de mettre à jour ces CGU à tout moment. Il est de votre responsabilité de consulter régulièrement cette page pour vous tenir informé des
          éventuelles modifications. En cas de non-respect des présentes CGU, nous nous réservons le droit de prendre des mesures appropriées, y compris la révocation de l'accès à l'intranet. 
Nous vous remercions de contribuer à faire de notre intranet un outil de communication interne efficace et respectueux de tous les membres de l'entreprise. 
          </p>
          </Fade>
        </div>
      


      </div>
   <Awrapper/>
    </>
        
    );
};

export default Cgu;