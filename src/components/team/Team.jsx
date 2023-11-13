import React, { useState } from 'react';

import Heading from '../common/heading/Heading';
import "./team.css"
import Awrapper from "../about/Awrapper"
import "../about/about.css"
import AddIcon from '@mui/icons-material/Add';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { Fade } from "react-reveal";

import TeamCard from "./TeamCard";

import OnlineCourses from '../allcourses/OnlineCourses';
import Hprice from '../home/Hprice';
import Testimonal from '../home/testimonal/Testimonal';

const Team = () => {
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const url = 'http://intranet.npakadin.mg:8000/'
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [poste, setPoste] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [alertmety, setAlertmety] = useState(false)
  const [dir, setDir] = useState([]);
  const [photonot ,setPhotonot]= useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const ajouterdir = async () => {

    const formData = new FormData();
    formData.append("image", image);
    try {
      const responseUpload = await axios.post(`${url}uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(responseUpload.data.imageUrl);

      const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;

      const ajouterdir = await axios.post(`${url}ajouterdir`, { nom, prenom, poste, imageUrl: imageUrlToSend, });

      if (ajouterdir.data['success'] === true) {
        // 
        setPoste("")
        setNom("")
        setPrenom("")
        setImage("")
        setImageUrl(null)
        setAlertmety(true)
        setTimeout(() => {
          setAlertmety(false)
          setOpen(false)
          window.location.reload()
        }, 2000);
      } else {
        alert("false");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setPhotonot(true)
      setTimeout(() => {
        setPhotonot(false)
      }, 2500);
    }
   

  };

  return (
    <>

      <section className='back2'>
        <Fade top>
          <h1 style={{ fontSize: '80px', color: 'white' }}>Groupe</h1>
        </Fade>

      </section>
      <div className='margin'></div>

      <div style={{ textAlign: 'center', marginTop: '500px' }}>
        <Testimonal />
        <Hprice />
        <Fade top>
          <Heading title='Direction pour chaque pôle' />

        </Fade>

        {!loggedInUser || !loggedInPwd ? null : (
          <Fade bottom>
            <AddIcon style={{ textAlign: 'center', color: ' #329358 ', fontSize: '50px' }} onClick={handleOpen} />
          </Fade>
        )}

        <section className='team padding'>
          <Fade bottom>
            <div className='container grid'>
              <TeamCard />
            </div>
          </Fade>
        </section>
        <OnlineCourses />


      </div>



      <div>

      </div>

      <Awrapper />


      <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center', }} >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 4, p: 4, maxWidth: '400px', }}>
          <Typography variant="h6" gutterBottom>
            Informations personnelles
          </Typography>
          {alertmety ? <Alert severity="success">
            Success
          </Alert> : null}

          {photonot ? <Alert severity="error">
            Veiullez ajouter une photo
          </Alert> : null}
          <TextField label="Pôle" variant="outlined" fullWidth value={poste} onChange={(e) => setPoste(e.target.value)} sx={{ mt: 2 }} />
          <TextField label="Nom" variant="outlined" fullWidth value={nom} onChange={(e) => setNom(e.target.value)} sx={{ mt: 2 }} />
          <TextField label="Prénom(s)" variant="outlined" fullWidth value={prenom} onChange={(e) => setPrenom(e.target.value)} sx={{ mt: 2 }} />
         
          <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
          <Button variant="contained" onClick={ajouterdir} color="primary" style={{ backgroundColor: ' #329358 ' }} sx={{ mt: 2 }}>
            Enregistrer
          </Button>
        </Box>
      </Modal>

    </>
  )
}

export default Team
