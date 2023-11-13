import React from "react"
import "./courses.css"
import { online } from "../../dummydata"
import Heading from "../common/heading/Heading"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { Fade } from "react-reveal"

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Fade top>
            <Heading subtitle='nos Pôles' title='Découvrez nos huit pôles d&apos;expertise' />
          </Fade>

          <div className='content grid3'>
            {online.map((val) => (
              <Fade bottom>
                <div className='box'>
                  <div className='img'>
                    <img src={val.cover} />
                    <img src={val.hoverCover} alt='' className='show' />
                  </div>

                  <h1> {val.courseName} </h1>
                  {
                    val.courseName == "Services généraux" ? <span > <Link to='/servicegenerau'>En savoir plus </Link></span>
                      : val.courseName == "HSSE" ? <span > <Link to='/hsse'>En savoir plus </Link></span>
                        : val.courseName == "Marketing et Communication" ? <span > <Link to='/marketcom'>En savoir plus </Link></span>
                          : val.courseName == "Système d'information" ? <span > <Link to='/si'>En savoir plus </Link></span>
                            : val.courseName == "Supply Chain" ? <span > <Link to='/supply'>En savoir plus </Link></span>
                              : val.courseName == "Ressources Humaines" ? <span > <Link to='/rh'>En savoir plus </Link></span>
                                : val.courseName == "Assistance de direction" ? <span > <Link to='/assistdir'>En savoir plus </Link></span>
                                  : val.courseName == "Administratif et Financier" ? <span > <Link to='/af'>En savoir plus </Link></span>
                                    : null
                  }
                </div>
              </Fade>

            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
