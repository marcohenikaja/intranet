
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import { Input } from '@mui/material';
import Zoom from 'react-reveal/Zoom';
import vide01 from '../../../src/components/videoss/Comment utiliser Microsoft TEAMS.mp4'
import vide02 from '../../../src/components/videoss/tuto répertoire.mp4'
import './contact.css'
// const ids = sessionStorage.getItem('ids');

// const loggedInUser = sessionStorage.getItem('loginUser');
// const loggedInPwd = sessionStorage.getItem('pwdUser');


function Contact() {
    const url = 'http://intranet.npakadin.mg:8000'
    const statut = sessionStorage.getItem('poste');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = useState('');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const postes = sessionStorage.getItem('poste')
    const [opens, setOpens] = useState(false);
    const [alertm, setAlertm] = useState(false)
    const [alertsupp, setAlertsupp] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'mat', label: 'Matricule', minWidth: 100 },
        { id: 'nom', label: 'Nom', minWidth: 170 },
        { id: 'prenom', label: 'Prénom', minWidth: 170 },
        { id: 'tel', label: 'Téléphone', minWidth: 170 },
        { id: 'mail', label: 'Mail', minWidth: 170 },
        { id: 'poste', label: 'Poste', minWidth: 170 },
        { id: 'action', label: 'Actions', minWidth: 170, textAlign: 'center' },
    ];



    const [con, setCon] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // Pour stocker l'ID sélectionné
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [idup, setIdup] = useState("")
    const [nomup, setNomup] = useState("")
    const [prenomup, setPrenomup] = useState("")
    const [matriculeup, setMatriculeup] = useState("")
    const [telup, setTelup] = useState("")
    const [mailup, setMailup] = useState("")
    const [roleup, setRoleup] = useState("")



    const openEditUserModal = (user) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };


    const closeEditUserModal = () => {
        setSelectedUser(null);
        setOpenEditModal(false);
    };

    const handleCloses = () => {
        setOpens(false);
    };
    const handleOpens = () => {
        setOpens(true);
    };
    const getcontact = async () => {
        try {
            const contact = await axios.get(`${url}/getcontact`).then((response) => {
                if (response.data.success === true) {
                    setCon(response.data.contact);
                }
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }

    }

    const deleteuser = async (id) => {
        try {
            const deleteuser = await axios.delete(`${url}/deleteuser/${id}`);
            getcontact()
            setSelectedId(null);
            setAlertsupp(true)
            setTimeout(() => {
                setOpenModal(false);
                setAlertsupp(false)
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }
    const modifiercontact = async (i, mat, n, p, t, m, r) => {
        setOpenEditModal(true);
        setIdup(i)
        setMatriculeup(mat)
        setNomup(n)
        setPrenomup(p)
        setTelup(t)
        setMailup(m)
        setRoleup(r)

    }

    const modif = async () => {
        try {
            const modif = await axios.put(`${url}/modif`, { idup, nomup, prenomup, matriculeup, telup, mailup, roleup }).then((response) => {
                if (response.data.success === true) {
                    setAlertm(true)
                    getcontact()
                    setTimeout(() => {
                        setOpenEditModal(false)
                        setAlertm(false)
                    }, 1500);

                }
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getcontact()
    }, [])


    return (
        <div className="video-section">
            <div className="heading-container">
                <h1 className="heading" style={{ color: '#329358', fontSize: '2.2rem' }}>
                    Votre répertoire dans Outlook & Teams
                </h1>
            </div>

            <div className="video-container">
                <div className="video">
                    <h3>Tuto Teams</h3>
                    <video width="100%" height="auto" controls>
                        <source src={vide01} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>

                <div className="video">
                    <h3>Tuto Outlook</h3>
                    <video width="100%" height="auto" controls>
                        <source src={vide02} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>
            </div>


            {/* <div style={{ textAlign: "center" }}  >
                <TextField label="Recherche" style={{ textAlign: "center", width: '500px', marginBottom: '20px', backgroundColor: 'white' }} variant="outlined" InputProps={{
                    startAdornment: (<SearchIcon fontSize="small" />),
                }} fullWidthvalue={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <Zoom>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div style={{ margin: '0 50px' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead style={{ color: '#1565C0' }}>
                                    <TableRow >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                                style={{ minWidth: column.minWidth, backgroundColor: '#1565C0', color: 'white' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {con
                                        .filter((row) => {
                                            // Filtrer en fonction de la valeur de recherche dans les colonnes pertinentes
                                            return (
                                                row.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.prenom.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.mat.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.tel.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.mail.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.poste.toLowerCase().includes(searchValue.toLowerCase())
                                            );
                                        })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    <TableCell align="left">{row.mat}</TableCell>
                                                    <TableCell align="left">{row.nom}</TableCell>
                                                    <TableCell align="left">{row.prenom}</TableCell>
                                                    <TableCell align="left">{row.tel}</TableCell>
                                                    <TableCell align="left">{row.mail}</TableCell>
                                                    <TableCell align="left">{row.poste}</TableCell>

                                                    <TableCell>
                                                    {loggedInUser || loggedInPwd ? (statut === "Super admin" || statut === "Administrateur" || statut === "Utilisateur") ? (
                                                            <div style={{ textAlign: 'center' }}>
                                                                <TableCell align="center">
                                                                    <IconButton aria-label="edit" style={{ color: ' #329358 ' }} onClick={() => modifiercontact(row.id, row.mat, row.nom, row.prenom, row.tel, row.mail, row.poste)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                    <IconButton style={{ color: 'red' }} aria-label="delete" onClick={() => { setSelectedId(row.id); setOpenModal(true); }} >
                                                                        <DeleteForeverIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </div>
                                                        ) : null : null}
                                                    </TableCell>

                                                   
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>




                            </Table>
                        </TableContainer>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={con.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Zoom> */}


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
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous sûr de vouloir supprimer </span>
                        {alertsupp ? (<Alert>Suppreqqion du contact avec succes</Alert>) : null}
                        <span style={{ color: 'red' }}>"{con.find(user => user.id === selectedId)?.nom}"?</span>
                    </Typography>
                    <Button onClick={() => deleteuser(selectedId)} style={{ color: 'red' }}>Oui</Button>
                    <Button onClick={() => setOpenModal(false)}>Annuler</Button>
                </div>
            </Modal>




            <Modal open={openEditModal} onClose={closeEditUserModal} aria-labelledby="modal-edit-title" aria-describedby="modal-edit-description" >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', }}>
                    <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
                        <Typography variant="h5" style={{ color: 'black' }}>Modification</Typography>
                        {alertm ? (<Alert>Modification avec succes</Alert>) : null}
                        <TextField value={idup} type="hidden" label="id" style={{ marginTop: '20px' }} /> <br />
                        <TextField value={matriculeup} onChange={(e) => setMatriculeup(e.target.value)} label="Matricule" style={{ marginTop: '20px' }} /> <br />
                        <TextField value={nomup} onChange={(e) => setNomup(e.target.value)} label="Nom" style={{ marginTop: '20px' }} /> <br />
                        <TextField value={prenomup} onChange={(e) => setPrenomup(e.target.value)} label="Prénom(s)" style={{ marginTop: '20px' }} /><br />
                        <TextField value={telup} type="number" onChange={(e) => setTelup(e.target.value)} label="Téléphone" style={{ marginTop: '20px' }} /><br />
                        <TextField value={mailup} onChange={(e) => setMailup(e.target.value)} label="E-mail" style={{ marginTop: '20px' }} /><br />
                        <TextField value={roleup} onChange={(e) => setRoleup(e.target.value)} label="Rôle" style={{ marginTop: '20px' }} />  <br />
                        <Button variant="contained" style={{ backgroundColor: 'green', marginTop: '20px', marginRight: '10px' }} onClick={modif} >Valider</Button>
                        <Button variant="contained" onClick={closeEditUserModal} style={{ marginTop: '20px' }}>Annuler</Button>
                    </div>
                </div>
            </Modal>


            <Modal open={opens} onClose={handleCloses}>
                <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
                    <Typography variant="h5" style={{ color: 'black' }}>Média </Typography>

                    <TextField style={{ marginTop: '20px' }} label="Titre" /> <br />
                    <TextField style={{ marginTop: '20px' }} label="Description" /> <br />
                    <Input
                        style={{ display: 'none' }}
                        type="file"
                        inputProps={{ accept: '.mp4, .jpg, .png, .pdf, .xlsx, .xls, .docx, .doc, .txt' }}
                        id="fileToUpload"

                    />
                    <Button variant="contained" color="success" style={{ marginTop: '20px' }} >Enregistrer</Button>
                </div>
            </Modal>
        </div>
    );
}

export default Contact;
