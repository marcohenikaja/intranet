import React from "react"
import Heading from "../common/heading/Heading"
import PriceCard from "../pricing/PriceCard"
import { Fade } from "react-reveal"
import  './Pc.css'
const Hprice = () => {
  return (
    <>
      <section className='hprice padding'>
       <Fade top> 
       <Heading subtitle='Sociétés' title='Nos Sociétés' className='heading-container' />

        </Fade>  
      
        <div className='price container grid'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Hprice
