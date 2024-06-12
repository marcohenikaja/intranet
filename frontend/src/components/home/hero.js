import React from 'react';
import { Carousel } from 'antd';
import car1 from '../../assets/images/car1.jpg'; // Importez votre image
import car2 from '../../assets/images/car2.jpg';
import car3 from '../../assets/images/car3.jpg';
import { Fade } from '@mui/material';

const items = [
  {
    key: '1',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: '',
    image: car1, // Utilisez la clé image pour l'image
  },
  {
    key: '2',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: "",
    image: car2,
  },
  {
    key: '3',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: '',
    image: car3,
  },
];

function AppHero() {
  return (
    <div id="hero" className="heroBlock">
      <Carousel autoplay className="carouselBackground">
        {items.map(item => (
          <div key={item.key} className="carouselItem">
            <div className="carouselText">
              <Fade in={true} timeout={5000}>
                <div>
                  <h3 style={{ color: 'white', width: '100%' }}>{item.title}</h3>
                  <p style={{ color: 'white' }}>{item.content}</p>
                </div>
              </Fade>
            </div>
            <img src={item.image} style={{ width: '100%', height: 'auto' }} alt={item.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default AppHero;
