import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import Modal from '@mui/material/Modal';
import { TextField, Button, Paper, Typography, Container, Select, InputLabel, MenuItem } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';



const Header = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const [click, setClick] = useState(false)
  const [isOpens, setIsOpens] = useState(false);
  const [alertvert, setAlertvert] = useState(false);
  const [alertvides, setAlertvides] = useState(false)
  const [alerterror, setAlerterror] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const loggedInUser = sessionStorage.getItem('loginUser');
  const statut = sessionStorage.getItem('poste');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const [nominscr, setNominscr] = useState('')
  const [passincr, setPassinscr] = useState('')
  const [passwordcomfinscr, setPasswordcomfinscr] = useState('')
  const [mailinscr, setMailinscr] = useState('')
  const [alertmail, setAlertmail] = useState(false)
  const [mailvalider, setMailvalider] = useState(false)

  const [courtmdp, setCourtmdp] = useState(false)
  const [mdpnot, setMdpnot] = useState(false)
  const [chmpvide, setChmpvide] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [mailexist, setMailexist] = useState(false)
  const [nomexist, setNomexist] = useState(false)
  const [comptenonactiver, setComptenonactiver] = useState(false)
  const login = async () => {
    if (username == "" || password == "") {
      setAlertvides(true)
      setTimeout(() => {
        setAlertvides(false)
      }, 2000)
    } else {
      try {
        const response = await axios.post(`${url}login`, { username, password });

        if (response.data.success === true) {
          sessionStorage.setItem('ids', response.data.ids);
          sessionStorage.setItem('loginUser', response.data.login);
          sessionStorage.setItem('pwdUser', response.data.pwd);
          sessionStorage.setItem('poste', response.data.poste);
          window.location.reload();
        } else if (response.data.message === "Nom d'utilisateur ou mot de passe incorrect") {
          setAlerterror(true)
          setTimeout(() => {
            setAlerterror(false)
          }, 2000)
        } else if (response.data.message === "Compte non activé. Veuillez vérifier votre boîte e-mail.") {
          setComptenonactiver(true)
          setTimeout(() => {
            setComptenonactiver(false)
          }, 2500)
        }
        else {
          setAlerterror(true)
          setTimeout(() => {
            setAlerterror(false)
          }, 2500)
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST :', error);
      }
    }

  };




  const deconnexion = async () => {
    sessionStorage.removeItem('loginUser');
    sessionStorage.removeItem('pwdUser');
    sessionStorage.removeItem('poste');
    window.location.reload();
  }

  const insrciptionIntra = async () => {
    try {
      if (passincr === "" || passwordcomfinscr === "" || mailinscr === "" || nominscr === "") {
        setChmpvide(true);
        setTimeout(() => {
          setChmpvide(false);
        }, 2000);
        return;
      }

      if (passincr.length < 8) {
        setCourtmdp(true);
        setTimeout(() => {
          setCourtmdp(false);
        }, 2000);
        return;
      }

      if (passincr !== passwordcomfinscr) {
        setMdpnot(true);
        setTimeout(() => {
          setMdpnot(false);
        }, 2000);
        return; // Sortir de la fonction
      }

      // Vérifier si l'adresse e-mail est valide
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(mailinscr)) {
        setInvalidEmail(true);
        setTimeout(() => {
          setInvalidEmail(false);
        }, 2000);
        return;
      }

      const response = await axios.post(`${url}insrciptionIntra`, {
        nom: nominscr,
        mot_de_passe: passincr,
        mail: mailinscr,
      });
      console.log();
      if (response.data.message === "Le nom d'utilisateur existe déjà") {
        setNomexist(true)
        setTimeout(() => {
          setNomexist(false)
        }, 2500);
        return;
      }
      if (response.data.message === "L'adresse e-mail existe déjà") {
        setMailexist(true)
        setTimeout(() => {
          setMailexist(false)
        }, 2500);
        return;
      }
      setMailvalider(true)
      if (response.status === 200) {
        setTimeout(() => {
          setAlertmail(false);
          // setIsRegistrationOpen(false);
        }, 2500);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <Head />
      <header>
        <nav className='flexSB' >
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li> <Link to='/'>Accueil</Link> </li>
            <li><Link to='/journal'>Actualités </Link></li>
            <li> <Link to='/ressource'>Ressources </Link></li>
            <li><Link to='/team'>Groupe </Link></li>

            {/* <li>
              {loggedInUser ? (
                <li> <Link to='/message'>Messagerie </Link> </li>
              ) : null}
            </li> */}

            <li > <Link to='/organigramme'>Organigramme </Link> </li>
            <li > <Link to='/historique'>Notre histoire </Link> </li>

            <li>
              {(statut === "Super admin") ? (
                <Link to='/listeuser'>Liste utilisateur</Link>
              ) : null}
            </li>

            <li>
              {!loggedInUser ? (
                <Button
                  style={{  backgroundColor: ' #329358 ', color: 'white' }}
                  onClick={() => setIsOpens(true)}
                >
                  Connexion
                </Button>
              ) : null}
            </li>


            <li>
              {loggedInUser ? (
                <Button onClick={deconnexion} style={{ marginTop: '-8px', backgroundColor: '#FF333E', color: 'white' }} > Déconnexion</Button>
              ) : null}
            </li>

          </ul>
          <div className='start'>
            <img style={{ width: '100%', maxWidth: '350px', height: 'auto' }} src="./Logo NPA.svg" alt="" />
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>


      <Modal open={isOpens} onClose={() => setIsOpens(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" style={{ color: 'black' }}>Connexion</Typography>
            {alertvert && (<Alert severity="success">Inscription reussie!</Alert>)}
            {alertvides && (<Alert severity="error" fullWidth>Veuiller remplir les champs vides</Alert>)}

            {alerterror && <Alert severity="error" fullWidth>Nom d'utilisateur ou mot de passe invalide</Alert>}
            {comptenonactiver && <Alert severity="error" fullWidth>Compte non activé. Veuillez vérifier votre boîte e-mail.</Alert>}
            <TextField
              margin="normal"
              label="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth onClick={login}>
              Se connecter
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Vous n'avez pas de compte ?{' '}
              <a href="#" onClick={() => setIsRegistrationOpen(true)} style={{ color: 'blue' }} >Créer un compte</a>
            </Typography>
          </Paper>
        </Container>
      </Modal>


      {/* Modal pour l'inscription */}
      <Modal open={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" style={{ color: 'black' }}>Inscription</Typography>
            {alertmail && (<Alert severity="success" fullWidth>Veuillez vérifier votre e-mail pour activer votre compte.</Alert>)}
            {courtmdp && (<Alert severity="error" fullWidth>Le mot de passe est trop court (plus de 8 caractères) !</Alert>)}
            {mdpnot && (<Alert severity="error" fullWidth> Veuillez s'il vous plaît vérifier votre mot de passe</Alert>)}
            {chmpvide && (<Alert severity="error" fullWidth> Veuillez s'il vous plaît remplir les champs vides</Alert>)}
            {invalidEmail && (<Alert severity="error" fullWidth> Veuillez vérifier votre e-mail</Alert>)}
            {nomexist && (<Alert severity="error" fullWidth> Le nom d'utilisateur existe déjà</Alert>)}
            {mailexist && (<Alert severity="error" fullWidth> L'adresse e-mail existe déja</Alert>)}
            {mailvalider && (<Alert severity="success" fullWidth> Un e-mail de validation a été envoyé à votre adresse e-mail</Alert>)}
            <TextField margin="normal" label="Nom d'utilisateur" value={nominscr} onChange={(e) => setNominscr(e.target.value)} fullWidth />
            <TextField margin="normal" label="Mot de passe" type="password" value={passincr} onChange={(e) => setPassinscr(e.target.value)} fullWidth />
            <TextField margin="normal" label="Comfirmation mot de passe" type="password" value={passwordcomfinscr} onChange={(e) => setPasswordcomfinscr(e.target.value)} fullWidth />
            <TextField margin="normal" label="Mail" type="mail" value={mailinscr} onChange={(e) => setMailinscr(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" fullWidth onClick={insrciptionIntra}> S'inscrire </Button>
          </Paper>
        </Container>
      </Modal>
    </>
  )
}

export default Header
