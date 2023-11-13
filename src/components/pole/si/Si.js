import React, { useEffect } from 'react';
import './si.css';
import Heading from '../../common/heading/Heading';
import { Button } from '@mui/material';
import { Modal, Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Awrapper from '../../about/Awrapper';
import Alert from '@mui/material/Alert';


const Servicegenerau = () => {
    const url = 'http://intranet.npakadin.mg:8000/'
    
    const statut = sessionStorage.getItem('poste');
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const postes = sessionStorage.getItem('poste')
    const [open, setOpen] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [poste, setPoste] = useState('');
    const [desc, setDesc] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [si, setSi] = useState([])
    const [ouvrir, setOuvrir] = useState(false)
    const [sokafana, setSokafana] = useState(false)
    const [tel, setTel] = useState("")
    const [mail, setMail] = useState("")

    const [nomupdate, setNomupdate] = useState("")
    const [prenomupdate, setPrenomupdate] = useState("")
    const [telupdate, setTelupdate] = useState("")
    const [mailupdate, setMailupdate] = useState("")
    const [posteupdate, setPosteupdate] = useState("")
    const [descupdate, setDescupdate] = useState("")
    const [idup, setIdup] = useState("")

    const [alertup, setAlertup] = useState(false)
    const [alertsup, setAlertsup] = useState(false)
    const [idsuppr, setIdsuppr] = useState("")

    const modifpersonne = async (nomup, prenomup, posteup, mailup, telup, descup, id) => {
        setNomupdate(nomup)
        setPrenomupdate(prenomup)
        setPosteupdate(posteup)
        setMailupdate(mailup)
        setTelupdate(telup)
        setDescupdate(descup)
        setIdup(id)
        setOuvrir(true)

    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const ajoutersi = async () => {
        const data = { nom, prenom, poste, tel, mail, desc, image };


        const formData = new FormData();
        formData.append("image", image);
        try {
            const responseUpload = await axios.post(`${url}UploadImagesi`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);

            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouterdir = await axios.post(`${url}ajoutersi`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }




    const recupesi = async () => {

        try {
            const recupeservig = await axios.get(`${url}recupesi`);
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedata = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedata/${idup}`, data)
            setAlertup(true)
            recupesi()
            setTimeout(() => {
                setAlertup(false)
                setOuvrir(false)
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    }

    const modalsupr = (id) => {
        setIdsuppr(id)
        setSokafana(true)
    }

    const supprimerPersonnes = async () => {
        try {
            const confsupprimer = await axios.delete(`${url}supprimerPersonnes/${idsuppr}`)
            setAlertsup(true)

            recupesi()
            setTimeout(() => {
                setAlertsup(false)
                setSokafana(false)

            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        recupesi()
    }, [])


    return (
        <>
            <section className='back13'></section>
            <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '200px' }}>
                <h1 style={{ fontSize: '80px', color: 'white' }}>Système d'Information </h1>
            </div>
            <div className='margin' style={{ marginTop: '380px' }}></div>

            <section className="section-white" style={{ textAlign: 'center' }}>
                <Heading subtitle='nos groupes' title='Nos collaborateurs' />
                <Button
                    onClick={handleOpen}
                    style={{
                        backgroundColor: ' #329358 ',
                        color: 'white',
                        marginRight: '10px',
                        textAlign: 'center',
                    }}
                    disabled={!loggedInPwd || !loggedInUser || (statut !== "Administrateur" && statut !== "Super admin")}
                >
                    Ajouter un collaborateur
                </Button>

                <div className="container">
                    <div className="grid">
                        {si.map((c, index) => (
                            <div className="team-item" key={index}>
                                <img src={url + c.imageUrl} className="team-img" alt="pic" />
                                <h3>{c.nom} {c.prenom}</h3>
                                <div className="team-info"><p>{c.poste}</p></div>
                                <div className="team-info"><p>{c.mail}</p></div>
                                <div className="team-info"><p>{c.tel}</p></div>
                                <p>{c.description}</p>

                                {/* <ul className="team-icon">
                                    <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                                    <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                                </ul> */}
                                <ul className="team-icon">
                                {loggedInUser || loggedInPwd ? (postes === "Super admin" || postes === "Administrateur") ? (
                                        <div style={{ textAlign: 'center' }}>

                                            <IconButton onClick={() => modifpersonne(c.nom, c.prenom, c.poste, c.mail, c.tel, c.description, c.id)} aria-label="edit" style={{ color: ' #329358 ' }} >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton style={{ color: 'red' }} aria-label="delete" onClick={() => modalsupr(c.id)}  >
                                                <DeleteForeverIcon />
                                            </IconButton>

                                        </div>
                                    ) : null : null}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


          <Awrapper/>

            <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center', }} >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 4, p: 4, maxWidth: '400px', }}>
                    <Typography variant="h6" gutterBottom>
                        Informations personnelles
                    </Typography>

                    <TextField label="Nom" variant="outlined" fullWidth value={nom} onChange={(e) => setNom(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Prénom" variant="outlined" fullWidth value={prenom} onChange={(e) => setPrenom(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Poste" variant="outlined" fullWidth value={poste} onChange={(e) => setPoste(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Téléphone" variant="outlined" type='number' fullWidth value={tel} onChange={(e) => setTel(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Mail" variant="outlined" fullWidth value={mail} onChange={(e) => setMail(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Description" variant="outlined" fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} sx={{ mt: 2 }} />
                    <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
                    <Button variant="contained" color="primary" style={{ backgroundColor: ' #329358 ' }} sx={{ mt: 2 }} onClick={ajoutersi}>
                        Enregistrer
                    </Button>
                </Box>
            </Modal>



            <Modal open={ouvrir} onClose={() => setOuvrir(false)}>
                <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
                    <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
                    {alertup ? <Alert severity="success">
                        Modification avec success
                    </Alert> : null}
                    <TextField id="outlined-basic" value={nomupdate} onChange={(e) => setNomupdate(e.target.value)} label="Nom" variant="outlined" sx={{ mb: 2 }} /> <br />
                    <TextField id="outlined-basic" value={prenomupdate} onChange={(e) => setPrenomupdate(e.target.value)} label="Prénom(s)" variant="outlined" sx={{ mb: 2 }} /><br />
                    <TextField id="outlined-basic" value={telupdate} onChange={(e) => setTelupdate(e.target.value)} label="Téléphone" type='number' variant="outlined" sx={{ mb: 2 }} /><br />
                    <TextField id="outlined-basic" value={mailupdate} onChange={(e) => setMailupdate(e.target.value)} label="Mail" variant="outlined" sx={{ mb: 2 }} /><br />
                    <TextField id="outlined-basic" value={posteupdate} onChange={(e) => setPosteupdate(e.target.value)} label="Poste" variant="outlined" sx={{ mb: 2 }} /><br />
                    <TextField id="outlined-basic" value={descupdate} onChange={(e) => setDescupdate(e.target.value)} label="Déscription" variant="outlined" sx={{ mb: 2 }} /><br />
                    <Button variant="contained" onClick={updatedata} color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }}>Enregistrer</Button>
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
                    <Button color="primary" autoFocus onClick={supprimerPersonnes}>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Servicegenerau;


