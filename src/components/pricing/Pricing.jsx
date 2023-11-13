import React from "react"
import Discu from "./Discu"
import "./price.css"
import Faq from "./Faq"
import { Fade } from "react-reveal";
import { Link, Element } from "react-scroll";

const Pricing = () => {
  return (
    <>
      
          <section className='back20'>
                <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '-50px' }}>
                     <Fade top>
                          <h1 style={{ fontSize: '80px', color: 'white' }}>Messagerie </h1>  
                     </Fade>
                         
                </div>
          </section>
          <div style={{marginTop:'800px'}}> 
          <Discu/>   
             <Faq />
          </div>
    
    </>
  )
}

export default Pricing
