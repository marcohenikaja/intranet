
import "./about.css"
import AboutCard from "./AboutCard"
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Input } from '@mui/material';
import { Fade } from "react-reveal";
import { Link, Element } from "react-scroll"; // Importez Link et Element depuis react-scroll
import axios from 'axios'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const About = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const [opens, setOpens] = useState(false);
  const [alertsuc, setAlertsuc] = useState(false)
  const [ope, setOpe] = useState(false);
  const [alertsucs, setAlertsucs] = useState(false)
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [alertvide, setAlertvide] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const ids = sessionStorage.getItem('ids');
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const [dep,setDep]=useState('')
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [matricule, setMatricule] = useState('')
  const [alertcontact, setAlertcontact] = useState(false)

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleOpens = () => {
    setOpens(true);
  };
  const handleCloses = () => {
    setOpens(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleOpe = () => {
    setOpe(true);
  };

  const handleClos = () => {
    setOpe(false);
  };
  const uploadImages = async () => {

    if (image === null) {
      setAlertvide(true)
      setTimeout(() => {
        setAlertvide(false)
      }, 2000)

      return;
    } else if (image !== null) {

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

        const responseEnregitrermedia = await axios.post(`${url}Enregitrermedia`, { ids, imageUrl: imageUrlToSend, titre, description,loggedInUser });

        if (responseEnregitrermedia.data['success'] === true) {
          setDescription("");
          setTitre("");
          setImageUrl(null);
          setAlertsuc(true)
          setTimeout(() => {
            setAlertsuc(false)
            setOpens(false);
            window.location.reload()
          }, 1000)

        } else {
          alert("false");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const uploadImage = async () => {
    
    if (image === null) {
      setAlertvide(true)
      setTimeout(() => {
        setAlertvide(false)
      }, 2000)

      return;
    } else if (image !== null) {

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

        const responseEnregitrermedia = await axios.post(`${url}Enregitrermedia`, { ids, imageUrl: imageUrlToSend, titre,dep, description,loggedInUser });

        if (responseEnregitrermedia.data['success'] === true) {
          setDescription("");
          setTitre("");
          setImageUrl(null);

          setAlertsucs(true)
          setTimeout(() => {
            setAlertsucs(false)
            setOpen(false);
            window.location.reload()
          }, 1000)
        } else {
          alert("false");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const ajoutercontact = async () => {

    try {
      const ajout = await axios.post(`${url}ajoutercontact`, { matricule, nom, prenom, telephone, email, role, ids }).then((response) => {

        if (response.data['success'] === true) {
          setMatricule("")
          setNom("")
          setPrenom("")
          setTelephone("")
          setEmail("")
          setRole("")
          setAlertcontact(true)
          setTimeout(() => {
            setAlertcontact(false)
            setOpe(false)
            window.location.reload()
          }, 1000)
        } else {
          console.log("error");
        }

      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <section className='back3'></section>
      <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '200px' }}>
      
       

        <Element name="heading"> {/* Nommez l'élément que vous souhaitez animer */}
              <Fade top>
              <h1 style={{ fontSize: '80px', color: 'white' }}>Ressources</h1>
                
              </Fade>
            </Element>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Fade left>
             
                {/* <Button style={{ backgroundColor: ' #329358 ', color: 'white', marginRight: '10px' }} onClick={handleOpens} disabled={!loggedInPwd || !loggedInUser}>
                  Publier média
                </Button> */}
               
                </Fade>
                <Fade bottom>
                <Button style={{ backgroundColor: ' #329358 ', color: 'white', marginRight: '10px' }} onClick={handleOpen} disabled={!loggedInPwd || !loggedInUser}>
                  Publier document
                </Button>
                </Fade>
                 
                <Fade right>
                {/* <Button style={{ backgroundColor: ' #329358 ', color: 'white' }} onClick={handleOpe} disabled={!loggedInPwd || !loggedInUser}>
                  Publier répertoire de service
                </Button> */}
                </Fade>
                </div>
           



      </div>
      <div className='margin' style={{ marginTop: '400px' }}></div>

      <AboutCard />


      {/* Modal ajouter document */}
      <Modal open={open} onClose={handleClose}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Document</Typography>

          {alertvide ? <Alert severity="error">
            Veuilez séléctionner une document
          </Alert> : null}

          {alertsucs ? <Alert severity="success">
            Document publié avec success
          </Alert> : null}
          <TextField style={{ marginTop: '20px', width: "100%" }} label="Titre" onChange={(e) => setTitre(e.target.value)} /> <br />
          <InputLabel>Pôles</InputLabel>
          <Select style={{ marginTop: '20px', width: "100%" }}   onChange={(e) =>setDep(e.target.value)} >
            <MenuItem  value="Services généraux">Services généraux</MenuItem>
            <MenuItem  value="HSSE">HSSE</MenuItem>
            <MenuItem  value="Marketing et Communication">Marketing et Communication</MenuItem>
            <MenuItem  value="Système d'information">Système d'information</MenuItem>
            <MenuItem value="Supply Chain" >Supply Chain</MenuItem>
            <MenuItem value="Ressources Humaines" >Ressources Humaines</MenuItem>
            <MenuItem value="Administratif et Financier" >Administratif et Financier</MenuItem>
            <MenuItem  value="Assistance de direction">Assistance de direction</MenuItem>
        </Select>
         <br />
          <TextareaAutosize
            style={{ marginTop: "20px", width: "100%", height: "100px" }}
            rowsMin={3}
            placeholder="Description" onChange={(e) => setDescription(e.target.value)}
          /> <br />
         
         <input type="file" accept=".txt, .xlx, .xlsx, .doc, .docx, .pdf" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />

         
          <Typography variant="subtitle1" color="textSecondary">
            Formats acceptés :  .txt, .xlx,.xlsx,.doc,.docx,.pdf
          </Typography>
          <Button variant="contained" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={uploadImage}>Enregistrer</Button>
        </div>
      </Modal>

      {/* modal ajouter media */}
      <Modal open={opens} onClose={handleCloses}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Média</Typography>

          {alertvide ? <Alert severity="error">
            Veuilez séléctionner une photo
          </Alert> : null}
          {alertsuc ? <Alert severity="success">
            Média publié avec success
          </Alert> : null}
          <TextField style={{ marginTop: '20px', width: "100%" }} label="Titre" onChange={(e) => setTitre(e.target.value)} /> <br />
          <TextareaAutosize
            style={{ marginTop: "20px", width: "100%", height: "100px" }}
            rowsMin={3}
            placeholder="Description" onChange={(e) => setDescription(e.target.value)}
          /> <br />
          <Input style={{ display: 'none' }} type="file" inputProps={{ accept: '.mp4,.mp3,.jpg,.png' }}  //.txt, .xlx,.xlsx,.doc,.docx,
            id="fileToUpload"
            onChange={handleFileChange}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
          {/* <label htmlFor="fileToUpload">
            <Button variant="text" color="primary" component="span" style={{ marginTop: '20px' }}>  Cliquer ici pour joindre un fichier </Button>
          </label> */}
          <Typography variant="subtitle1" color="textSecondary">
            Formats acceptés :  .jpg, .png,.mp4,.mp3
          </Typography>
          <Button variant="contained" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={uploadImages}>Enregistrer</Button>
        </div>
      </Modal>
      {/* modal contanct */}
      <Modal open={ope} onClose={handleClos}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Répertoire</Typography>
          {alertcontact ? <Alert onClose={handleClos} severity="success">
            Contact bien enregistré
          </Alert> : null}
          <TextField label="Matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)} style={{ marginTop: '20px' }} /> <br />
          <TextField label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} style={{ marginTop: '20px' }} /> <br />
          <TextField label="Prénom(s)" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={{ marginTop: '20px' }} /><br />
          <TextField label="Téléphone" type='number' value={telephone} onChange={(e) => setTelephone(e.target.value)} style={{ marginTop: '20px' }} /><br />
          <TextField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: '20px' }} /><br />
          <TextField label="Rôle" value={role} onChange={(e) => setRole(e.target.value)} style={{ marginTop: '20px' }} />  <br />
          <Button variant="contained" color="success" style={{ marginTop: '20px' ,backgroundColor: ' #329358 '}} onClick={ajoutercontact}>Enregistrer</Button>
        </div>
      </Modal>
    </>
  )
}

export default About

