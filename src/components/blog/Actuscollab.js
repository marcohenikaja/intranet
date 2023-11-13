import React from "react"
import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import axios from 'axios'
import { Fade } from 'react-reveal'
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Modal, Box, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useInView } from "react-intersection-observer";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Actuscollab = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const statut = sessionStorage.getItem('poste');
  const [journal, setJournal] = useState([])
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [alertup, setAlertup] = useState(false)
  const [sokafana, setSokafana] = useState(false)
  const [alertsup, setAlertsup] = useState(false)
  const [idsuppr, setIdsuppr] = useState("")
  const [idup, setIdup] = useState("")
  const [titreupd, setTitreupd] = useState("")
  const [descupd, setDescupd] = useState("")
  const [ouvrir, setOuvrir] = useState(false)
  const [pole, setPole] = useState('');
  const [act, setAct] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true, // Pour ne déclencher l'animation qu'une fois
  });


  const makamediacollab = async () => {
    try {
      const medias = await axios.get(`${url}makamediacollab`).then((result) => {
        setJournal(result.data);

      })
    } catch (error) {
      console.log(error);
    }

  }
  const updatearticle = (id, titre, desc) => {
    setOuvrir(true)
    setTitreupd(titre)
    setDescupd(desc)
    setIdup(id)
  }

  const suppart = (id) => {
    setSokafana(true)
    setIdsuppr(id)
  }


  const manovaarticle = async () => {
    const data = { titre: titreupd, description: descupd, pole: pole, nom: loggedInUser, idup };
    if (pole == "") {
      setAct(true);
      setTimeout(() => {
        setAct(false);
      }, 2000);
      return;
    } else {
      try {
        const up = await axios.put(`${url}manovaarticle/${idup}`, data)
        setAlertup(true)

        setTimeout(() => {
          setAlertup(false)
          setOuvrir(false)
          setPole('')
          window.location.reload()
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }


  const supprarticle = async () => {

    try {
      const suppridselected = await axios.delete(`${url}supprarticle/${idsuppr}`)

      setAlertsup(true)
      setTimeout(() => {
        setSokafana(false)
        setAlertsup(false)
        window.location.reload()
      }, 100);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    makamediacollab()

  }, [])

  return (

    <>

      {journal.map((val) => {
        const date = new Date(val.createdAt);
        const fileExtension = val.imageUrl.split('.').pop().toLowerCase();

        if (fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mov') {
          return (
            <Fade left key={val.id}>
              <div className='items shadow' style={{ width: '100%', height: 'auto' }}>
                <div className='img' style={{ width: '100%', height: isImageEnlarged ? 'auto' : '350px', overflow: 'hidden', position: 'relative' }}>
                  {fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png' ? (
                    <img
                      src={url + val.imageUrl}
                      alt=''
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <video controls className='video-element' style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                      <source src={url + val.imageUrl} type={`video/${fileExtension}`} />
                      Votre navigateur ne prend pas en charge la lecture de cette vidéo.
                    </video>
                  )}
                </div>



                <div className='text'>
                  <div className='admin flexSB'>
                    <span>
                      <i className='fa fa-user'></i>
                      <label htmlFor=''>{val.nom_pers}</label>
                    </span>
                    <span>
                      <i className='fa fa-calendar-alt'></i>
                      <label htmlFor=''>{date.toLocaleString('fr-FR')}</label>
                    </span>
                  </div>
                  <h3>{val.titre}</h3>
                  <p style={{ maxHeight: '100px', overflow: 'auto' }}>{val.description} </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    {/* Ajoutez d'autres éléments au besoin */}
                  </div>

                  {loggedInUser || loggedInPwd ? (statut === "Super admin" || statut === "Administrateur" || statut === "Utilisateur") ? (
                    <div style={{ textAlign: 'center' }}>
                      <IconButton onClick={() => updatearticle(val.id, val.titre, val.description)} aria-label="edit" style={{ color: 'blue' }}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => suppart(val.id)} aria-label="delete">
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  ) : null : null}
                </div>
              </div>
            </Fade>
          );
        } else {
          return null;
        }
      })}




      <Modal open={ouvrir} onClose={() => setOuvrir(false)}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
          {alertup ? <Alert severity="success">
            Modification avec success
          </Alert> : null}

          {act ? <Alert severity="error">
            Actus ne doit pas être vide.
          </Alert> : null}
          <TextField id="outlined-basic" value={titreupd} onChange={(e) => setTitreupd(e.target.value)} label="Tire" variant="outlined" sx={{ mb: 2 }} /> <br />
          <TextareaAutosize
            style={{ marginTop: "20px", width: "100%", height: "100px" }}
            rowsMin={3}
            placeholder="Description" value={descupd} onChange={(e) => setDescupd(e.target.value)}
          /> <br />
          <InputLabel style={{ marginTop: '20px', width: "100%" }} id="demo-simple-select-label" >Actus</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(e) => setPole(e.target.value)} value={pole} fullWidth label="Genre" sx={{ mb: 2 }}>
            <MenuItem value="Bons plans">Bons plans</MenuItem>
            <MenuItem value="Actus collaborateurs">Actus collaborateurs</MenuItem>
            <MenuItem value="Actus entreprises">Actus entreprises</MenuItem>
          </Select>     <br />
          <Button onClick={manovaarticle} variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }}>Enregistrer</Button>
        </div>
      </Modal>


      <Dialog open={sokafana} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        {alertsup ? <Alert>Personne supprimer avec succes</Alert> : null}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir effectuer cette action ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSokafana(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={supprarticle} color="primary" autoFocus  >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default Actuscollab;
