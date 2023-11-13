import React, { useEffect } from "react"
import { testimonal } from "../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"
import { Fade } from "react-reveal"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react"
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WarningIcon from '@mui/icons-material/Warning';
import DialogTitle from '@mui/material/DialogTitle';

const Testimonal = () => {


  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const statut = sessionStorage.getItem('poste');
  const url = 'http://intranet.npakadin.mg:8000/'
  const [open, setOpen] = useState(false);
  const [alertmety, setAlertmety] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [alertsupp, setAlertsupp] = useState(false)
  const [iddir, setIddir] = useState('')
  const [photonot ,setPhotonot]= useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeEditUserModal = () => {

    setOpenEditModal(false);
  };

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [poste, setPoste] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [descri, setDescri] = useState('');
  const [dirsociete, setDirsociete] = useState([]);
  const [alertm, setAlertm] = useState(false)



  //  modification 

  const [idmod, setIdmod] = useState('');
  const [nommod, setNommod] = useState('');
  const [prenommod, setPrenommod] = useState('');
  const [postemod, setPostemod] = useState('');
  const [descrimod, setDescrimod] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getdirsoc = async () => {
    try {
      const getdirsoc = await axios.get(`${url}getdirsoc`)
      setDirsociete(getdirsoc.data)
    } catch (error) {
      console.log(error);
    }

  }

  const deletedir = async () => {
    try {
      const d = await axios.delete(`${url}deletedir/${iddir}`)

      setIddir(null);
      setAlertsupp(true)
      setTimeout(() => {
        setOpenModal(false);
        setAlertsupp(false)
        window.location.reload()
      }, 1500);
    } catch (error) {
      console.log(error);
    }

  }

  const ouvrirmodal = (cle, noms, prenoms, postes, descris) => {
    setIdmod(cle)
    setNommod(noms)
    setPrenommod(prenoms)
    setPostemod(postes)
    setDescrimod(descris)

    setOpenEditModal(true)

  }


  const onpendir = async (id, nom) => {
    setIddir(id)
    setOpenModal(true)
  }
  const ajouterdirsoc = async () => {
  
    const formData = new FormData();
    formData.append("image", image);
    try {
      const responseUpload = await axios.post(`${url}UploadImagedirsoc`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      
      });
      
      
      setImageUrl(responseUpload.data.imageUrl);

      const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;

      const ajouterdir = await axios.post(`${url}ajouterdirsoc`, { nom, prenom, poste, descri, imageUrl: imageUrlToSend, });

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


  const validermodifications = async () => {
    const data = { nom: nommod, prenom: prenommod, poste: postemod, descri: descrimod };

    try {

      const response = await axios.put(`${url}validermodifications/${idmod}`, data);

      setTimeout(() => {
        setOpenEditModal(false);
        window.location.reload()
      }, 1000);


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getdirsoc();
  }, []);

  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
          <Fade bottom>
            <Heading title='Direction pour chaque société' />
          </Fade>


          {!loggedInUser || !loggedInPwd ? null : (
            <Fade bottom>
              <AddIcon style={{ marginTop: '-10px', textAlign: 'center', color: ' #329358 ', fontSize: '50px' }} onClick={handleOpen} />
            </Fade>
          )}

          <div className='content grid2'>
            {dirsociete.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={url + val.image} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.nom} {val.prenom}</h2>
                    <span>{val.poste}</span>
                  </div>
                </div>
                <p>{val.descri}</p>
                <br />
                {loggedInUser || loggedInPwd ? (statut === "Super admin" || statut === "Administrateur" || statut === "Utilisateur") ? (
                  <div style={{ textAlign: 'center' }}>
                    < BorderColorIcon onClick={() => ouvrirmodal(val.id, val.nom, val.prenom, val.poste, val.descri)} />
                    < ClearIcon onClick={() => onpendir(val.id, val.nom)} />
                  </div>
                ) : null : null}
              </div>
            ))}
          </div>
        </div>
      </section>



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
          <TextField label="Entreprise" variant="outlined" fullWidth value={poste} onChange={(e) => setPoste(e.target.value)} sx={{ mt: 2 }} />
          <TextField label="Direction" variant="outlined" fullWidth value={descri} onChange={(e) => setDescri(e.target.value)} sx={{ mt: 2 }} />
          <TextField label="Nom" variant="outlined" fullWidth value={nom} onChange={(e) => setNom(e.target.value)} sx={{ mt: 2 }} />
          <TextField label="Prénom" variant="outlined" fullWidth value={prenom} onChange={(e) => setPrenom(e.target.value)} sx={{ mt: 2 }} />
          
          <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
          <Button variant="contained" onClick={ajouterdirsoc} color="primary" style={{ backgroundColor: ' #329358 ' }} sx={{ mt: 2 }}>
            Enregistrer
          </Button>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={closeEditUserModal} aria-labelledby="modal-edit-title" aria-describedby="modal-edit-description" >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', }}>
          <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
            <Typography variant="h5" style={{ color: 'black' }}>Modification</Typography>
            {alertm ? (<Alert>Modification avec succes</Alert>) : null}


            <TextField value={idmod} type="hidden" label="id" style={{ marginTop: '20px' }} /> <br />
            <TextField value={nommod} onChange={(e) => setNommod(e.target.value)} label="Nom" style={{ marginTop: '20px' }} /> <br />
            <TextField value={prenommod} onChange={(e) => setPrenommod(e.target.value)} label="Prénom(s)" style={{ marginTop: '20px' }} /><br />
            <TextField value={postemod} onChange={(e) => setPostemod(e.target.value)} label="Poste" style={{ marginTop: '20px' }} />  <br />
            <TextField value={descrimod} onChange={(e) => setDescrimod(e.target.value)} label="Description" style={{ marginTop: '20px' }} />  <br />
            <Button variant="contained" style={{ backgroundColor: 'green', marginTop: '20px', marginRight: '10px' }} onClick={validermodifications} >Valider</Button>
            <Button variant="contained" onClick={closeEditUserModal} style={{ marginTop: '20px' }}>Annuler</Button>
          </div>
        </div>
      </Modal>


      <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}>
          <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
          <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
          <Typography variant="h6" gutterBottom>
            <span style={{ color: 'black' }}>Êtes-vous certain de vouloir supprimer ?</span>
            {alertsupp ? <Alert>Suppression réussie</Alert> : null}


          </Typography>
          <Button style={{ color: 'red' }} onClick={deletedir}>Oui</Button>
          <Button onClick={() => setOpenModal(false)}>Annuler</Button>
        </div>
      </Modal>




    </>
  )
}

export default Testimonal
