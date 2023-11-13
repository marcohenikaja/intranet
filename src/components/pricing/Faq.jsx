import React, { useRef, useState } from "react"
import { faq } from "../../dummydata"
import Heading from "../common/heading/Heading"
import { Fade } from "react-reveal"
const Faq = () => {
  const [click, setClick] = useState(false)

  const toggle = (index) => {
    if (click === index) {
      return setClick(null)
    }
    setClick(index)
  }

  return (
    <>
      <Fade top>
        <Heading subtitle='FAQS' title='Foire aux questions' />
      </Fade>
      <section className='faq'> 
  
        <Fade left>

     

          <div className='container'>
            {faq.map((val, index) => (
              <div className='box'>
                <button className='accordion' onClick={() => toggle(index)} key={index}>
                  <h2>{val.title}</h2>
                  <span>{click === index ? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-right'></i>}</span>
                </button>
                {click === index ? (
                  <div className='text'>
                    
                    <p>{val.desc}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Fade>
      </section>
    </>
  )
}

export default Faq
