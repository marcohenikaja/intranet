import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark}
from '@fortawesome/free-solid-svg-icons'
import './wsp-gallery.css'
import Heading from '../common/heading/Heading'
import axios from 'axios'
import {Fade} from 'react-reveal'

const WSPGallery = () => {
  const [galleryImage ,setGalleryImage]=useState([])

  const getImage=async()=>{
    const d = await axios.get('http://intranet.npakadin.mg:8000/getImage')
    setGalleryImage(d.data)
   
  }
  const url = 'http://intranet.npakadin.mg:8000/medias/'
  useEffect(()=>{
    getImage()
  },[])

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0 
    ? setSlideNumber( galleryImage.length -1 ) 
    : setSlideNumber( slideNumber - 1 )
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === galleryImage.length 
    ? setSlideNumber(0) 
    : setSlideNumber(slideNumber + 1)
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '0px' }}>
    <Fade top>
    <Heading subtitle='Galeries' title='Découvrez notre Collection d&apos;Images' />
    </Fade>
 
     
{
  openModal && 
  <div className='sliderWrap'>
    <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal}  />
    <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
    <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
    <div className='fullScreenImage'>
      <img src={`${url}${galleryImage[slideNumber]}`} alt='' />
    </div>
  </div>
}

 <Fade left>
    <div className='galleryWrap'>
            {
              galleryImage && galleryImage.map((slide, index) => {
                return(
                  <div 
                    className='single' 
                    key={index}
                    onClick={ () => handleOpenModal(index) }
                  >
                  <img src={`${url}${slide}`} alt='' /> 
          
                  </div>
                )
              })
            }
          </div>
 </Fade>
     

    </div>
  )
}

export default WSPGallery