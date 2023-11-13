import React from "react";
import { awrapper } from "../../dummydata";
import './Awrapper.css'; // Assurez-vous de lier ce fichier CSS correctement

const Awrapper = () => {
  return (
    <>
      <section className='custom-awrapper'>
        <div className='custom-container custom-grid'>
          {awrapper.map((val) => {
            return (
              <div className='custom-box custom-flex' key={val.id}>
                <div className='custom-img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='custom-text'>
                  <h1>{val.data}</h1>
                  <h3>{val.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Awrapper;
