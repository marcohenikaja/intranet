import React from "react"

const Head = () => {
  const statut = sessionStorage.getItem('poste');
  const loggedInUser = sessionStorage.getItem('loginUser');
  
  const blueTextStyle = {
    color: '#FF333E', // Définit la couleur du texte en bleu
  };
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>INTRANET</h1>
            <span>Connectez-vous et restez informé</span> <br />
            <span ><b><u>{loggedInUser}</u> </b> </span><br />
            <span >{statut}</span>
           
          </div>

          <div className='social'>
            <a href="https://www.facebook.com/groupe.np.akadin" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f icon"></i>
            </a>
          
            <a href="  https://www.linkedin.com/company/groupe-np-akadin/" target="_blank" rel="noopener noreferrer">
            <i className='fab fa-linkedin icon'></i>
            </a>
            
           
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
