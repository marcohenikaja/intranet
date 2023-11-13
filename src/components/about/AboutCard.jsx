import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import Awrapper from "./Awrapper"
import photo from '../../img/fondnpa.png'
import pdp from '../../img/pdp1.png'
import Contact from "../blog/Contact"
import { useState, useEffect, useRef } from "react"
import WSPGallery from "../galery/WSPGallery"
import icons from '../../img/ICONS.png'
import xlsx from '../../img/xlsx.png'
import iconw from '../../img/wordico.png'
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from "axios"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import WSPVideoGallery from "../videos/WSPVideoGallery"
import './scroll.css'
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal'
import { InputLabel, MenuItem, Select } from "@mui/material"
import './ac.css'




const AboutCard = () => {
  const url = 'http://intranet.npakadin.mg:8000/'

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const statut = sessionStorage.getItem('poste');
  const [getfichier, setFichier] = useState([])
  const [idtemp, setIdtemp] = useState("");
  const [idtemps, setIdtemps] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [titrenew, setTitrenew] = useState("");
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const postes = sessionStorage.getItem('poste');
  const [opens, setOpens] = useState(false);
  const [alersuccss, setAlersuccss] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [alertmamafa, setAlertmamafa] = useState(false)
  const [deps, setDeps] = useState("");
  const tester = useRef();
  const [selectedPole, setSelectedPole] = useState("");


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        tester.current.classList.add('annimer');
        // Une fois l'animation terminée, supprimez la classe pour qu'elle puisse se déclencher à nouveau
        tester.current.addEventListener('animationend', () => {
          tester.current.classList.remove('annimer');
        });
      }
    });

    if (tester.current) {
      observer.observe(tester.current);
    }

    return () => {
      if (tester.current) {
        observer.unobserve(tester.current);
      }
    };
  }, []);





  const columns = [
    { id: 'Titre', label: 'Titre', minWidth: 100 },

    { id: 'Pôles', label: 'Pôles', minWidth: 100 },
    { id: 'Type', label: 'Type', minWidth: 170 },
    { id: 'Action', label: 'Action', minWidth: 170 },

  ];


  const makafichier = async () => {
    try {
      const fichier = await axios.get(`${url}makafichier`).then((result) => {
        setFichier(result.data);
      })
    } catch (error) {
      console.log(error);
    }

  }

  const openModalconf = async (id) => {
    setIdtemp(id)
    setOpenModal(true)

  }

  const handleOpens = (id, t) => {
    setTitrenew(t)
    setIdtemps(id)
    setOpens(true);
  };
  const deleteMedia = async (idtemp) => {

    try {
      const med = await axios.delete(`${url}deleteMedia/${idtemp}`).then((result) => {
        makafichier()
        setAlertmamafa(true)
        setTimeout(() => {
          setAlertmamafa(false)
          setOpenModal(false)
        }, 1500);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const handleCloses = () => {
    setOpens(false);
  };

  const modifmedia = async () => {

    const data = { titrenew, deps }
    try {
      const med = await axios.put(`${url}modifmedia/${idtemps}`, data).then((result) => {
        setTitrenew("")
        setAlersuccss(true)
        makafichier()
        setTimeout(() => {
          setAlersuccss(false)
          setOpens(false);
        }, 1500);
      })
    } catch (error) {
      console.log(error);
    }
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('animated-element');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Si l'élément animé est visible à l'écran, activez l'animation
      if (elementPosition < windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };


  useEffect(() => {
    // Appelez makafichier uniquement lorsque vous en avez besoin, par exemple, en réponse à un événement ou une action utilisateur
    // ou lorsque vous souhaitez mettre à jour getfichier en réponse à d'autres changements de l'état du composant.
  }, [getfichier]);
  useEffect(() => {
    makafichier()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };
  return (
    <>
      <section className='aboutHome'>
      <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#555', textAlign: 'justify', margin: '0 200px' }}>
        Explorez Notre Menu Ressources : Votre Accès à une Bibliothèque Complète de Soutien Professionnel 

Découvrez tous les ressources mis à votre disposition pour maximiser votre efficacité au travail grâce à notre menu Ressources. Cette plateforme complète offre un accès instantané à une variété de documents et d'outils essentiels, soigneusement organisés pour faciliter votre recherche et améliorer votre expérience au sein de notre entreprise. </p> <br /> <br />
        <div className='container flexSB'>
          <div className='left row'>
            <Heading title='Organigramme des tâches - Fonctions supports' />

            <Zoom>
              {isImageEnlarged ? (
                <img
                  src={pdp}
                  alt=''
                  style={{ width: '800px', height: '900px', marginTop: '100px' }}
                  onClick={toggleImageSize}
                />
              ) : (
                <img
                  src={pdp}
                  alt=''
                  style={{ width: '600px', height: '700px' }}
                  onClick={toggleImageSize}
                />
              )}
            </Zoom>

          </div>

          <div className='right row' style={{ marginTop: "-100px" }}>
            <Fade right>
              <Heading subtitle='DOCUMENTS' title='Liste des documents publiés' />
            </Fade>


            <div style={{ textAlign: "center" }}  >
              <TextField label="Recherche" style={{ textAlign: "center", width: '500px', marginBottom: '20px', backgroundColor: 'white' }} variant="outlined" InputProps={{
                startAdornment: (<SearchIcon fontSize="small" />),
              }} fullWidthvalue={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> <br />
              <InputLabel>Filtrage par Pôles</InputLabel>
              <Select
                style={{ marginTop: '20px', width: "50%", marginBottom: "20px" }}
                value={selectedPole}
                onChange={(e) => setSelectedPole(e.target.value)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="Services généraux">Services généraux</MenuItem>
                <MenuItem value="HSSE">HSSE</MenuItem>
                <MenuItem value="Marketing et Communication">Marketing et Communication</MenuItem>
                <MenuItem value="Système d'information">Système d'information</MenuItem>
                <MenuItem value="Supply Chain">Supply Chain</MenuItem>
                <MenuItem value="Ressources Humaines">Ressources Humaines</MenuItem>
                <MenuItem value="Administratif et Financier">Administratif et Financier</MenuItem>
                <MenuItem value="Assistance de direction">Assistance de direction</MenuItem>
              </Select>

            </div>
            <Paper sx={{ width: '100%', overflow: 'auto' }} ref={tester}>
              <TableContainer sx={{ maxHeight: '600px' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead style={{ color: '#1565C0' }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: '#1565C0',
                            color: 'white',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        style={{
                          minWidth: isSmallScreen ? '80px' : '120px',
                          backgroundColor: '#1565C0',
                          color: 'white',
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {getfichier
                      .filter((row) => {
                        return (
                          ((row.titre && row.titre.toLowerCase().includes(searchValue.toLowerCase())) ||
                            (row.prenom && row.description.toLowerCase().includes(searchValue.toLowerCase()))) &&
                          (selectedPole === '' || row.service === selectedPole) // Filtrage par le pôle
                        );
                      })
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        let fileExtension = row.imageUrl.split('.').pop();
                        let imageToShow;

                        if (fileExtension === 'pdf') {
                          imageToShow = icons;
                        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                          imageToShow = iconw;
                        } else if (fileExtension === 'xlsx' || fileExtension === 'xlx') {
                          imageToShow = xlsx;
                        } else {
                          imageToShow = 'default.png';
                        }

                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell align="left">{row.titre}</TableCell>
                            <TableCell align="left"> {row.service} </TableCell>
                            <TableCell align="left">
                              <a href={url + row.imageUrl} target="_blank" rel="noopener noreferrer">
                                <img src={imageToShow} alt='' />
                              </a>
                            </TableCell>

                            <TableCell>
                              {(loggedInUser || loggedInPwd) && (statut === 'Super admin' || statut === 'Administrateur' || statut === 'Utilisateur') && (
                                <div style={{ textAlign: 'center' }}>
                                  <TableCell align="center">
                                    <IconButton aria-label="edit" style={{ color: ' #329358 ' }} onClick={() => handleOpens(row.id, row.titre)}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton style={{ color: 'red' }} aria-label="delete" onClick={() => openModalconf(row.id)}>
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </TableCell>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={getfichier.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>

        </div>
      </section>


      <div id="animated-element" className={`animated-element ${isVisible ? 'animate' : ''}`}>
        <Zoom cascade>
          <Contact />
        </Zoom>
      </div>

      <WSPGallery />
      <WSPVideoGallery />
      <Awrapper />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}>
          <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
          <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
          {alertmamafa ? (<Alert>Fichier supprimé avec succes</Alert>) : null}
          <Typography variant="h6" gutterBottom>
            <span style={{ color: 'black' }}>Êtes-vous sûr de vouloir supprimer ce fichier? </span>
          </Typography>
          <Button onClick={() => deleteMedia(idtemp)} style={{ color: 'red' }}>Oui</Button>
          <Button onClick={() => setOpenModal(false)}>Annuler</Button>
        </div>
      </Modal>

      <Modal open={opens} onClose={handleCloses}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
          {alersuccss ? <Alert severity="success">
            Modification avec success
          </Alert> : null}
          <TextField style={{ marginTop: '20px' }} label="Titre" value={titrenew} onChange={(e) => setTitrenew(e.target.value)} /> <br />
          <InputLabel>Pôles</InputLabel>
          <Select style={{ marginTop: '20px', width: "100%" }} onChange={(e) => setDeps(e.target.value)} >
            <MenuItem value="Services généraux">Services généraux</MenuItem>
            <MenuItem value="HSSE">HSSE</MenuItem>
            <MenuItem value="Marketing et Communication">Marketing et Communication</MenuItem>
            <MenuItem value="Système d'information">Système d'information</MenuItem>
            <MenuItem value="Supply Chain" >Supply Chain</MenuItem>
            <MenuItem value="Ressources Humaines" >Ressources Humaines</MenuItem>
            <MenuItem value="Administratif et Financier" >Administratif et Financier</MenuItem>
            <MenuItem value="Assistance de direction">Assistance de direction</MenuItem>
          </Select>
          <br />
          <Button variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={modifmedia}>Enregistrer</Button>
        </div>
      </Modal>
    </>
  )
}

export default AboutCard
