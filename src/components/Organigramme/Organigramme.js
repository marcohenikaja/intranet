import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import Select from '@mui/material/Select';
// import 'dayjs/locale/fr';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import './Organigramme.css'
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fade } from "react-reveal";
import Awrapper from '../about/Awrapper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom"

const Organigramme = () => {
    const url = 'http://intranet.npakadin.mg:8000/'
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const [sokafana, setSokafana] = useState(false)
    const statut = sessionStorage.getItem('poste');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [alertnom, setAlertnom] = useState(false)
    const [alertprenom, setAlertPrenom] = useState(false)
    const [alertgenre, setAlertGenre] = useState(false)
    const [alertnum, setAlertNum] = useState(false)
    const [alertposte, setAlertPoste] = useState(false)
    const [alertmail, setAlertMail] = useState(false)
    const [open, setOpen] = useState(false);
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [genre, setGenre] = useState("")
    const [num, setNum] = useState("")
    const [poste, setPoste] = useState("")
    const [mail, setMail] = useState("")




    const [nommod, setNommod] = useState("")
    const [prenommod, setPrenommod] = useState("")
    const [genremod, setGenremod] = useState("")
    const [nummod, setNummod] = useState("")
    const [postemod, setPostemod] = useState("")
    const [mailmod, setMailmod] = useState("")

    const handleClose = () => setOpen(false);
    const [image, setImage] = useState(null);
    const [sg, setSg] = useState([])
    const [rsg, setRsg] = useState([])
    const [nomv, setNomv] = useState([])
    const [dhsse, setDhsse] = useState([])
    const [mark, setMark] = useState([])
    const [dsi, setDsi] = useState([])
    const [supply, setSupply] = useState([])
    const [drh, setDrh] = useState([])
    const [daf, setDaf] = useState([])

    const [dadhssev, setDadhssev] = useState([])
    const [markv, setMarkv] = useState([])
    const [dsiv, setDsiv] = useState([])
    const [supplyv, setSupplyv] = useState([])
    const [drhv, setDrhv] = useState([])
    const [dafv, setDafv] = useState([])


    const [contintinv, setContintinv] = useState([])
    const [nomup, setNomup] = useState("")
    const [prenomup, setPrenomup] = useState("")
    const [genreup, setGenreup] = useState("")
    const [numup, setNumup] = useState("")
    const [posteup, setPosteup] = useState("")
    const [mailup, setMailup] = useState("")
    const [photoup, setPhoto] = useState("")
    const [ouvrir, setOuvrir] = useState(false)
    const [idsuppr, setIdsuppr] = useState("")
    const [idmodif, setIdmodif] = useState("")
    const [tour, setTour] = useState([])
    const [dethse, setDethse] = useState([])
    const [deths, setDeths] = useState([])


    const imgurl = 'http://intranet.npakadin.mg:8000/images/';


    const [opens, setOpens] = useState(false);
    const [openss, setOpenss] = useState(false);


    const [selectedButton, setSelectedButton] = useState(null);

    const handleOpen = (buttonValue) => {
        setSelectedButton(buttonValue);
        setOpen(true);
    };



    const handleOpens = (id, nom, prenom, genre, num, poste, mail, photo) => {

        const fileName = photo.substring(photo.lastIndexOf('/') + 1);

        setNomup(nom)
        setPrenomup(prenom)
        setGenreup(genre)
        setNumup(num)
        setPosteup(poste)
        setMailup(mail)
        setPhoto(fileName)
        setOpens(true);
    }


    const handleOpenss = () => { //id, nom, prenom, genre, num, poste, mail, photo
        setOpenss(true);
    }

    const handleCloses = () => setOpens(false);
    const handleClosess = () => setOpenss(false);


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const ajouterPersonne = async () => {

        const noms = nom.toUpperCase();
        const p = prenom.trim();
        const prenoms = p
            .split(' ')
            .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
            .join(' ');



        if (nom === "") {
            setAlertnom(true);
            setTimeout(() => {
                setAlertnom(false);
            }, 2000);

        } else if (prenom === "") {
            setAlertPrenom(true);
            setTimeout(() => {
                setAlertPrenom(false);
            }, 2000);
        }
        else if (genre === "") {
            setAlertGenre(true);
            setTimeout(() => {
                setAlertGenre(false);
            }, 2000);
        }
        else if (num === "" || num.length !== 10) {
            setAlertNum(true);
            setTimeout(() => {
                setAlertNum(false);
            }, 2000);
        }
        else if (poste === "") {
            setAlertPoste(true);
            setTimeout(() => {
                setAlertPoste(false);
            }, 2000);
        }
        else if (mail === "") {
            setAlertMail(true);
            setTimeout(() => {
                setAlertMail(false);
            }, 2000);
        }
        else {
            try {
                let imageUrl = null;
                const formData = new FormData();
                formData.append("image", image);

                const response = await axios.post(`${url}UploadImage2`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response) {
                    imageUrl = response.data;

                } else {
                    console.error("Image upload failed:", response.data.error);
                }
                const data = { noms, prenoms, genre, num, poste, mail, imageUrl };

                const addEt = await axios.post(`${url}ajouterPersonne`, data).then((result) => {
                    window.location.reload()
                    if (result.data['success'] === true) {


                        setOpen(false);
                        setPoste("");
                        setMail("");
                        setNum("");
                        setNom("");
                        setPrenom("");

                        setGenre("");
                        setImage("")


                    } else {

                    }
                }).catch((error) => {
                    console.log(error);
                })


            } catch (error) {
                console.log(error);
            }
        }


    }

    const nomsg = async () => {
        try {
            const nomsg = await axios.get(`${url}nomsg`).then((result) => {
                setSg(result.data);
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }


    const nomrsg = async () => {
        try {
            const nomsg = await axios.get(`${url}nomrsg`).then((result) => {

                setRsg(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const nomvert = async () => {
        try {
            const nomsg = await axios.get(`${url}nomvert`).then((result) => {

                setNomv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const nomdhsse = async () => {
        try {
            const nomsg = await axios.get(`${url}nomdhsse`).then((result) => {

                setDhsse(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nommark = async () => {
        try {
            const nomsg = await axios.get(`${url}nommark`).then((result) => {

                setMark(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomdsi = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomdsi`).then((result) => {

                setDsi(result.data);

            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomsupply = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomsupply`).then((result) => {

                setSupply(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomsdrh = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomsdrh`).then((result) => {

                setDrh(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomdaf = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomdaf`).then((result) => {

                setDaf(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomdhssev = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomdhssev`).then((result) => {

                setDadhssev(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const nommarkv = async () => {
        try {
            const nomdsi = await axios.get(`${url}nommarkv`).then((result) => {

                setMarkv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const nomdsiv = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomdsiv`).then((result) => {

                setDsiv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomsupplyv = async () => {
        try {
            const nomdsi = await axios.get(`${url}nomsupplyv`).then((result) => {

                setSupplyv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }


    const nomdrhv = async () => {
        try {
            const nomdrhv = await axios.get(`${url}nomdrhv`).then((result) => {

                setDrhv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomdafv = async () => {
        try {
            const nomdrhv = await axios.get(`${url}nomdafv`).then((result) => {

                setDafv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const contintinvs = async () => {
        try {
            const nomdafvs = await axios.get(`${url}contintinvs`).then((result) => {

                setContintinv(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }


    const nomtour = async () => {
        try {
            const nomtour = await axios.get(`${url}nomtour`).then((result) => {

                setTour(result.data);


            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const nomdethse = async () => {
        try {
            const nomdethse = await axios.get(`${url}nomdethse`).then((result) => {
                setDethse(result.data);
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const nomdethssee = async () => {
        try {
            const nomdethse = await axios.get(`${url}nomdethssee`).then((result) => {
                setDeths(result.data);
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const openmodif = (id, nom, prenom, genre, numero, poste, mail, photo) => {

        setOuvrir(true)

        setIdmodif(id)
        setNommod(nom)
        setPrenommod(prenom)
        setGenremod(genre)
        setNummod(numero)
        setMailmod(mail)
    }
    const modifperso = async () => {
        const data = { nom: nommod, prenom: prenommod, genre: genremod, numero: nummod, email: mailmod };

        try {

            const response = await axios.put(`${url}modifperso/${idmodif}`, data);

            setTimeout(() => {
                setOuvrir(false)
                window.location.reload()
            }, 1000);


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        nomsg()
        nomrsg()
        nomvert()
        nomdhsse()
        nommark()
        nomdsi()
        nomsupply()
        nomsdrh()
        nomdaf()
        nomdhssev()
        nommarkv()
        nomdsiv()
        nomsupplyv()
        nomdrhv()
        nomdafv()
        contintinvs()
        nomtour()
        nomdethse()
        nomdethssee()
    }, [])





    function groupByPoste(data) {
        const groupedData = {};

        data.forEach((item) => {
            if (!groupedData[item.poste]) {
                groupedData[item.poste] = {
                    poste: item.poste,
                    names: [],
                };
            }
            groupedData[item.poste].names.push({ id: item.id, nom: item.nom, prenom: item.prenom, genre: item.genre, numero: item.numero, poste: item.poste, mail: item.mail, photo: item.imageUrl });
        });

        return Object.values(groupedData);
    }

    const modalconf = async (id) => {
        setIdsuppr(id)
        setSokafana(true)
    }
    const confsupprimer = async () => {

        try {
            const confsupprimer = await axios.delete(`${url}confsupprimer/${idsuppr}`)

            setTimeout(() => {
                setSokafana(false)
                window.location.reload()
            }, 1000);


        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div >
            <section className='back0'></section>
            <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '500px', textAlign: 'center' }}>
                <Fade top>
                    <h2 style={{ textAlign: 'center', fontSize: '80px', color: 'white' }}>Organigramme</h2>
                </Fade>

            </div>
            <h1 className="heading" style={{ textAlign: 'center', color: ' #329358 ', fontSize: '38px', textTransform: 'uppercase', fontSize: '60px', fontFamily: 'adria_groteskbold', marginTop: '300px' }}>Organigramme</h1>


            <div className="node " >
                <div className="node-content" style={{ backgroundColor: "pink", textAlign: "center", marginTop: "10px" }}>
                    <u>Secrétaire Général</u> <br />
                    {(statut === "Super admin" || statut === "Administrateur") ? (
                        <div style={{ textAlign: 'center' }}>
                            <AddIcon onClick={() => handleOpen(18)} style={{ cursor: "pointer" }} />

                        </div>
                    ) : null}

                    {sg.map((s) => (
                        <div key={s.id}>
                            <Button style={{ color: "white" }} onClick={() => handleOpens(s.id, s.nom, s.prenom, s.genre, s.numero, s.poste, s.mail, s.imageUrl)}>{s.nom}  {s.prenom}</Button>
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <>
                                    <EditIcon onClick={() => openmodif(s.id, s.nom, s.prenom, s.genre, s.numero, s.poste, s.mail, s.photo)} style={{ color: "white", cursor: "pointer" }} />
                                    <ClearIcon onClick={() => modalconf(s.id)} style={{ cursor: "pointer" }} />
                                </>
                            ) : null}
                        </div>
                    ))}
                    <br />
                </div>

                <div className="node-children ">
                    <div className="node">
                        <div className="node-content">
                            Pôle generaux
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(1)} style={{ cursor: "pointer" }} />

                                </div>
                            ) : null}

                        </div>
                        {rsg.map((item, index) => (
                            <div key={index} >
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }} >
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (

                                                <>

                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>
                                            ) : null}
                                            <br />
                                            <Link to="/servicegenerau" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>


                                        </div>



                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content">
                            Pôle HSE
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>

                                    <AddIcon onClick={() => handleOpen(3)} style={{ color: "white", cursor: "pointer" }} />

                                </div>
                            ) : null}

                        </div>
                        {dhsse.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u><br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom} <br /></Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>
                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>
                                            ) : null}
                                            <br />
                                            <Link to="/hsse" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node" style={{ textAlign: "center" }}>
                        <div className="node-content">
                            Pôle Marketing et Communication
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(5)} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}

                        </div>
                        {mark.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>

                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>) : null}
                                            <br />
                                            <Link to="/marketcom" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content">
                            Pôle du Systeme d'Information
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(7)} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}
                        </div>
                        {dsi.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>

                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>) : null}
                                            <br />
                                            <Link to="/si" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content" >
                            Pôle Supply Chain
                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(9)} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}
                        </div>
                        {supply.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}> {item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>


                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>) : null}
                                            <br />
                                            <Link to="/supply" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content">
                            Pôle des Ressources Humaines

                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(11)} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}
                        </div>
                        {drh.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>

                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} />
                                                </>) : null}
                                            <br />
                                            <Link to="/rh" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content">
                            Pôle Administratif et Financier

                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen(13)} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}
                        </div>
                        {daf.map((item, index) => (
                            <div key={index}>
                                <div className="node-children">
                                    <div className="node">
                                        <div className="node-content" style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}>
                                            <u>{item.poste}</u>   <br />
                                            <Button style={{ color: "white" }} onClick={() => handleOpens(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.imageUrl)}>{item.nom}  {item.prenom}</Button>
                                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                                <>

                                                    <EditIcon onClick={() => openmodif(item.id, item.nom, item.prenom, item.genre, item.numero, item.poste, item.mail, item.photo)} style={{ color: "white", cursor: "pointer" }} />
                                                    <ClearIcon onClick={() => modalconf(item.id)} style={{ cursor: "pointer" }} /> </>) : null}
                                            <br />
                                            <Link to="/af" style={{ textDecoration: 'none', color: 'white' }}>
                                                <VisibilityIcon />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="node">
                        <div className="node-content">
                            Pôle Assistante de Direction

                            {(statut === "Super admin" || statut === "Administrateur") ? (
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon onClick={() => handleOpen()} style={{ color: "white", cursor: "pointer" }} />
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>
            </div>
            <Awrapper />
            {/* Modal ajout */}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ color: 'black' }} sx={{ mb: 2 }}>
                        Ajouter une personne
                    </Typography>
                    {alertnom ? <Alert severity="error">Veuillez remplir le champ nom</Alert> : !alertnom}
                    {alertprenom ? <Alert severity="error">Veuillez remplir le champ prénom</Alert> : !alertprenom}
                    {alertgenre ? <Alert severity="error">Veuillez choisir un genre</Alert> : !alertgenre}
                    {alertnum ? <Alert severity="error">Veuillez vérifier votre numéro de téléphone</Alert> : !alertnum}
                    {alertposte ? <Alert severity="error">Veuillez remplir le champ poste</Alert> : !alertposte}
                    {alertmail ? <Alert severity="error">Veuillez remplir le champ mail</Alert> : !alertmail}

                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            id="outlined-basic"
                            label="Nom "
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />


                        <TextField
                            id="outlined-basic"
                            label="Prénom(s)"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setPrenom(e.target.value)}
                        />

                        <InputLabel id="demo-simple-select-label" >Genres</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            fullWidth
                            label="Genre"
                            onChange={(e) => setGenre(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="Masculin">Homme</MenuItem>
                            <MenuItem value="Feminin">Femme</MenuItem>
                        </Select>

                        <TextField
                            id="outlined-basic"
                            label="Numero tél"
                            type="number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setNum(e.target.value)}
                        />
                        <InputLabel id="poste-label" sx={{ position: 'relative' }}>
                            Poste
                        </InputLabel>

                        <Select label="Poste" variant="outlined" fullWidth sx={{ mb: 2 }} value={poste} onChange={(e) => setPoste(e.target.value)} labelId="poste-label" id="poste-select"
                        >


                            {selectedButton === 1 ? (
                                <MenuItem value="Responsable SG">Responsable SG</MenuItem>
                            ) : selectedButton === 2 ? (
                                [
                                    <MenuItem key="coursier" value="Coursier">Coursier</MenuItem>,
                                    <MenuItem key="femmes-de-menage" value="Femmes de Ménage">Femmes de Ménage</MenuItem>,
                                    <MenuItem key="responsable-contrat-groupe" value="Responsable Contrat Groupe">Responsable Contrat Groupe</MenuItem>,
                                    <MenuItem key="assistant-achat-interne" value="Assistant achat interne">Assistant achat interne</MenuItem>
                                ]
                            ) : selectedButton === 3 ? (
                                <MenuItem value="DHSSE">DHSSE</MenuItem>
                            ) : selectedButton === 4 ? (

                                [
                                    <MenuItem key="responsable-service-audit" value="Responsable Service Audit">Responsable Service Audit</MenuItem>,
                                    <MenuItem key="responsable-service-surete" value="Responsable Service Sureté">Responsable Service Sureté</MenuItem>,
                                    <MenuItem key="responsable-hse" value="Responsable HSE">Responsable HSE</MenuItem>,
                                    <MenuItem key="assistante-de-direction-hsse" value="Assistante de direction hsse">Assistante de direction</MenuItem>
                                ]
                            ) : selectedButton === 4.1 ? (

                                [
                                    <MenuItem key="responsable-service-audit" value="Investigation">Investigation</MenuItem>,
                                    <MenuItem key="Contrôleur interne + Process" value="Contrôleur interne + Process">Contrôleur interne + Process</MenuItem>,
                                ]
                            ) : selectedButton === 5 ? (
                                <MenuItem value="Directrice Marketing et Communication">Directrice Marketing et Communication</MenuItem>
                            ) : selectedButton === 6 ? (
                                [
                                    <MenuItem key="Coordinateur-Marketing-Détachée" value="Coordinateur Marketing-Détachée">Coordinateur Marketing-Détachée</MenuItem>,
                                    <MenuItem key="responsable-service-surete" value="Responsable Communication">Responsable Communication</MenuItem>,
                                    <MenuItem key="responsable-service-surete" value="Responsable Marketing">Responsable Marketing</MenuItem>,
                                    <MenuItem key="responsable-service-surete" value="Assistante de direction Marketing et Communication">Assistante de direction Marketing et Communication</MenuItem>
                                ]
                            ) : selectedButton === 7 ? (
                                <MenuItem value="Directeur du Système d'Information">Directeur du Système d'Information</MenuItem>
                            ) : selectedButton === 8 ? (
                                <MenuItem value="Responsable Système d'information">Responsable Système d'information</MenuItem>
                            ) : selectedButton === 9 ? (
                                <MenuItem value="Directrice Supply Chain">Directrice Supply Chain</MenuItem>
                            ) : selectedButton === 10 ? (
                                [
                                    <MenuItem value="Chef de Departement Opérations">Chef de Departement Opérations</MenuItem>,
                                    <MenuItem value="Chef de Departement Transit">Chef de Departement Transit</MenuItem>,
                                    <MenuItem value="Chef de Departement Approvisionnement">Chef de Departement Approvisionnement</MenuItem>,
                                    <MenuItem value="Assistante de direction Supply Chain">Assistante de direction Supply Chain</MenuItem>
                                ]
                            ) : selectedButton === 11 ? (
                                <MenuItem value="DRH">DRH</MenuItem>
                            ) : selectedButton === 12 ? (
                                [
                                    <MenuItem value="Contrôleur Interne">Contrôleur Interne</MenuItem>,
                                    <MenuItem value="Trésoriers">Trésoriers</MenuItem>,
                                    <MenuItem value="ADMINISTRATION RH">ADMINISTRATION RH</MenuItem>,
                                    <MenuItem value="Responsable Développement RH/Recrutement">Responsable Développement RH/Recrutement</MenuItem>
                                ]
                            )
                                : selectedButton === 13 ? (
                                    <MenuItem value="DAF">DAF</MenuItem>
                                )
                                    : selectedButton === 14 ? (
                                        [
                                            <MenuItem value="Assistante de direction DAF">Assistante de direction DAF</MenuItem>,
                                            <MenuItem value="RAF">RAF</MenuItem>,
                                            <MenuItem value="Resp Contrôle de Gestion">Resp Contrôle de Gestion</MenuItem>,
                                            <MenuItem value="Resp Process & Contrôle interne">Resp Process & Contrôle interne</MenuItem>,
                                            <MenuItem value="Resp Trésorerie">Resp Trésorerie</MenuItem>,
                                            <MenuItem value="Resp Facturations & Recouvrements">Resp Facturations & Recouvrements</MenuItem>
                                        ]
                                    ) : selectedButton === 15 ? (
                                        <MenuItem value="Surveillant tour de contrôl">Surveillant tour de contrôl</MenuItem>
                                    ) : selectedButton === 16 ? (
                                        <MenuItem value="Détaché HSE">Détaché HSE</MenuItem>
                                    ) : selectedButton === 17 ? (
                                        [
                                            <MenuItem value="Chantier">Chantier</MenuItem>,
                                            <MenuItem value="Entrepôt">Entrepôt</MenuItem>,
                                            <MenuItem value="Base principale NP AKADIN">Base principale NP AKADIN</MenuItem>,
                                            <MenuItem value="Base secondaire en région">Base secondaire en région</MenuItem>,
                                            <MenuItem value="Accueil">Accueil</MenuItem>,

                                        ]
                                    )
                                        : selectedButton === 18 ? (
                                            [
                                                <MenuItem value="Secrétaire Général">Secrétaire Général</MenuItem>,
                                            ]
                                        )
                                            : (
                                                <MenuItem value="Directrice Marketing et Communication"></MenuItem>
                                            )
                            }




                        </Select>
                        <TextField
                            id="outlined-basic"
                            label="Mail"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <input type="file" accept="image/*" onChange={handleImageChange} />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            fullWidth
                            onClick={ajouterPersonne}

                            id='test'
                        >
                            Ajouter
                        </Button>
                    </Typography>
                </Box>
            </Modal>



            <div>

                <Modal
                    open={opens}
                    onClose={handleCloses}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Nom:</u> {nomup}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Prénom(s):</u> {prenomup}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Genre:</u> {genreup}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Numéro:</u> {numup}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Poste:</u> {posteup}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <u>Mail:</u> {mailup}
                                </Typography>
                            </div>
                            <img src={`${imgurl}${photoup}`} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '-100px' }} />
                        </div>
                    </Box>
                </Modal>





                <Modal
                    open={openss}
                    onClose={handleClosess}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                                <Typography sx={{ mt: 2 }}>

                                </Typography>
                            </div>
                            <img src={`${imgurl}${photoup}`} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '-100px' }} />
                        </div>
                    </Box>
                </Modal>


                <Modal open={ouvrir} onClose={() => setOuvrir(false)}>
                    <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
                        <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
                        <TextField id="outlined-basic" label="Nom" variant="outlined" sx={{ mb: 2 }} value={nommod} onChange={(e) => setNommod(e.target.value)} /> <br />
                        <TextField id="outlined-basic" label="Prénom(s)" variant="outlined" value={prenommod} sx={{ mb: 2 }} onChange={(e) => setPrenommod(e.target.value)} /><br />
                        <InputLabel id="demo-simple-select-label" >Genres</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genremod}
                            fullWidth
                            label="Genre"
                            onChange={(e) => setGenremod(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="Masculin">Homme</MenuItem>
                            <MenuItem value="Feminin">Femme</MenuItem>
                        </Select><br />
                        <TextField id="outlined-basic" type='number' label="Numéro" variant="outlined" sx={{ mb: 2 }} value={nummod} onChange={(e) => setNummod(e.target.value)} /><br />

                        <TextField id="outlined-basic" label="Mail" variant="outlined" sx={{ mb: 2 }} value={mailmod} onChange={(e) => setMailmod(e.target.value)} /><br />

                        <Button onClick={() => modifperso(nommod, prenommod, genremod, mailmod, nummod, postemod)} variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }}>Enregistrer</Button>
                    </div>
                </Modal>


                <Dialog open={sokafana} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
                    <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Êtes-vous sûr de vouloir effectuer cette action ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSokafana(false)} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={confsupprimer} color="primary" autoFocus>
                            Confirmer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>


    );
};

export default Organigramme;