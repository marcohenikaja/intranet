import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './videos.css';
import Heading from '../common/heading/Heading';
import axios from 'axios';
import {Fade} from 'react-reveal'

const WSPVideoGallery = () => {
  const [galleryVideos, setGalleryVideos] = useState([]);

  const getVideos = async () => {
    const response = await axios.get('http://intranet.npakadin.mg:8000/getVideos'); // Mettez votre URL API pour les vidéos ici
    setGalleryVideos(response.data);
    
  };

  const url = 'http://intranet.npakadin.mg:8000/medias/'; // Mettez votre URL de base pour les vidéos ici

  useEffect(() => {
    getVideos();
  }, []);

  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryVideos.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === galleryVideos.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '0px' }}>
      <Fade top>
      <Heading subtitle='Galeries vidéos' title='Découvrez notre collection de vidéos ' />
      </Fade>
    
      {openModal &&
        <div className='sliderWrap'>
          <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
          <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
          <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
          <div className='fullScreenVideo'>
            {/* Utilisez une URL de base de votre backend et concaténez-la avec le nom de la vidéo */}
            <video controls autoPlay>
              <source src={`${url}${galleryVideos[slideNumber]}`} type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture de vidéos.
            </video>
          </div>
        </div>
      }
      <Fade right>
          <div className='galleryWrap'>
            {galleryVideos && galleryVideos.map((video, index) => {
              return (
                <div
                  className='single'
                  key={index}
                  onClick={() => handleOpenModal(index)}
                >
                  <video controls>
                    <source src={`${url}${video}`} type="video/mp4" />
                    Votre navigateur ne prend pas en charge la lecture de vidéos.
                  </video>
                </div>
              )
            })}
          </div>
      </Fade>
      
    </div>
  )
}

export default WSPVideoGallery;
