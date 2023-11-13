import React from "react"
import { team } from "../../dummydata"
import { useState, useEffect } from "react"
import axios from "axios"
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal, Box, TextField, Typography, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';

const TeamCard = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const [dir, setDir] = useState([])
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const postes = sessionStorage.getItem('poste')
  const [ouvrir, setOuvrir] = useState(false)

  const [nomupdate, setNomupdate] = useState("")
  const [prenomupdate, setPrenomupdate] = useState("")
  const [posteupdate, setPosteupdate] = useState("")

  const [sokafana, setSokafana] = useState(false)
  const [idup, setIdup] = useState("")

  const [alertup, setAlertup] = useState(false)
  const [alertsup, setAlertsup] = useState(false)
  const [idsuppr, setIdsuppr] = useState("")

  const handleClose = () => {
    setSokafana(false);
  };

  const getdir = async () => {
    try {
      const fichier = await axios.get(`${url}getdir`)
      setDir(fichier.data);

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const modalmodif = (id, n, p, pos) => {
    setOuvrir(true)
    setNomupdate(n)
    setPrenomupdate(p)
    setPosteupdate(pos)
    setIdup(id)
  }

  const updatedatas = async () => {
    const data = { nom: nomupdate, prenom: prenomupdate, poste: posteupdate };
    try {
      const up = await axios.put(`${url}updatedatas/${idup}`, data)
      setAlertup(true)
      getdir()
      setTimeout(() => {
        setAlertup(false)
        setOuvrir(false)
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  const supprbyid = (id) => {
    setIdsuppr(id)
    setSokafana(true)
  }

  const suppridselected = async () => {
    try {
      const suppridselected = await axios.delete(`${url}suppridselected/${idsuppr}`)
      getdir()
      setAlertsup(true)
      setTimeout(() => {
        setSokafana(false)
        setAlertsup(false)
      }, 100);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getdir();
  }, [])

  return (
    <>

      {dir.map((val) => (

        <div className='items shadow'>

          <div className='img'>
            <img src={`${url}${val.imageUrl}`} alt='' />
          </div>

          <div className='details'>
            <h2>{val.nom} {val.prenom}</h2>
            <p>{val.poste}</p>

            {loggedInUser || loggedInPwd ? (postes === "Super admin" || postes === "Administrateur") ? (
              <div style={{ textAlign: 'center' }}>

                <IconButton onClick={() => modalmodif(val.id, val.nom, val.prenom, val.poste)} aria-label="edit" style={{ color: 'blue' }} >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => supprbyid(val.id)} style={{ color: 'red' }} aria-label="delete"   >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            ) : null : null}
          </div>

        </div>

      )
      )}







      <Modal open={ouvrir} onClose={() => setOuvrir(false)}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
          {alertup ? <Alert severity="success">
            Modification avec success
          </Alert> : null}
          <TextField id="outlined-basic" value={nomupdate} onChange={(e) => setNomupdate(e.target.value)} label="Nom" variant="outlined" sx={{ mb: 2 }} /> <br />
          <TextField id="outlined-basic" value={prenomupdate} onChange={(e) => setPrenomupdate(e.target.value)} label="Prénom(s)" variant="outlined" sx={{ mb: 2 }} /><br />
          <TextField id="outlined-basic" value={posteupdate} onChange={(e) => setPosteupdate(e.target.value)} label="Poste" variant="outlined" sx={{ mb: 2 }} /><br />
          <Button variant="contained" onClick={updatedatas} color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }}>Enregistrer</Button>
        </div>
      </Modal>


      <Dialog open={sokafana} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
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
          <Button color="primary" autoFocus onClick={suppridselected}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TeamCard;
