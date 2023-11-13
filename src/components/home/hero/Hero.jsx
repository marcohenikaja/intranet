import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import { Link, Element } from "react-scroll";
import Heading from "../../common/heading/Heading";
import { useInView } from "react-intersection-observer";
import "./Hero.css";
import Button from "@mui/material/Button";

const Hero = () => {
  useEffect(() => {
    // Configurez la durée de défilement et l'offset (si nécessaire)
    const scrollDuration = 1000; // Durée de l'animation en millisecondes
    const scrollOffset = -100; // Décalage par rapport à la cible
    Link.defaultProps.duration = scrollDuration;
    Link.defaultProps.offset = scrollOffset;
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true, // Pour ne déclencher l'animation qu'une fois
  });

  const [isAnimationActive, setAnimationActive] = useState(false);

  const activateAnimation = () => {

    setAnimationActive(true);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div ref={ref}>
              {inView || isAnimationActive ? ( // Vérifiez si l'animation doit être active
                <Fade top>
                  <Heading title="Innover Aujourd'hui , pour un lendemain meilleur." />
                </Fade>
              ) : null}
            </div>
            <Element name="left">
              <Fade left>
                <p className="about__text p__color">
                  NP Akadin Service assure les fonctions  supports pour chaque entité opérationnelle du groupe.
                </p>
              </Fade>
            </Element>
            <Element name="right">
              <Fade right>
                <p className="about__text p__color">
                  Dans l'ensemble de nos activités de gestion, notre mission consiste à gérer et accompagner chaque équipe au quotidien,
                </p>
              </Fade>
            </Element>
            <Element name="bottom">
              <Fade bottom>
                <p className="about__text p__color">
                  afin de garantir la continuité et le bon fonctionnement de chaque entité.
                </p>
              </Fade>
            </Element>
          </div>
        </div>
      </section>
   
      <div className="margin"></div>
    </>
  );
};

export default Hero;
