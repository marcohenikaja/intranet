
import React from 'react';
import videos from '../../assets/video/si.mp4'
import '../../assets/video/si.mp4'
import imgassdir from '../../assets/pole/Pole-6 RH.png'
import { useEffect, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, AutoComplete, Input, Modal, Badge, Image, Tooltip, Row, Col, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { message, Popconfirm } from 'antd';
import { Avatar } from 'antd';
import { Statistic} from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;
import CountUp from 'react-countup';
import axios from 'axios';
import { Card } from 'antd';
const { Meta } = Card;
const { Title } = Typography;





const Rh = () => {
    const url = 'http://172.16.0.92:8000/'

    const statut = sessionStorage.getItem('poste');
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const [open, setOpen] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [poste, setPoste] = useState('');
    const [desc, setDesc] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [tel, setTel] = useState("")
    const [mail, setMail] = useState("")
    const postes = sessionStorage.getItem('poste')
    const [rsg, setRsg] = useState([])


    const [ouvrir, setOuvrir] = useState(false)
    const [sokafana, setSokafana] = useState(false)
    const [alertup, setAlertup] = useState(false)
    const [alertsup, setAlertsup] = useState(false)
    const [nomupdate, setNomupdate] = useState("")
    const [prenomupdate, setPrenomupdate] = useState("")
    const [telupdate, setTelupdate] = useState("")
    const [mailupdate, setMailupdate] = useState("")
    const [posteupdate, setPosteupdate] = useState("")
    const [descupdate, setDescupdate] = useState("")
    const [idup, setIdup] = useState("")
    const [idsuppr, setIdsuppr] = useState("")

    const [si, setSi] = useState([])
    const [rhs,setRhs]= useState([])




    const recupeaf = async () => {

        try {
            const recupeservig = await axios.get(`${url}recuperh`);
            console.log((recupeservig.data));
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }



    const recuperhs= async () => {

        try {
            const recupeservig = await axios.get(`${url}recuperhs`);
            setRhs(recupeservig.data.count)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }





    const confsupprimeraf = async (e) => {
        try {
            const confsupprimeraf = await axios.delete(`${url}confsupprimerrh/${e}`)
            setAlertsup(true)

            recupeaf()
            setTimeout(() => {
                setAlertsup(false)
                setSokafana(false)

            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }


    const confirm = (e) => {
        message.success('Suppression avec succes');
        confsupprimeraf(e)
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };



    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const ajouteraf = async () => {
        const data = { nom, prenom, poste, tel, mail, desc, image };
        const formData = new FormData();
        formData.append("image", image);
        try {
            const responseUpload = await axios.post(`${url}UploadImagerh`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);
            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouteraf = await axios.post(`${url}ajouterrh`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedataaf = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedatarh/${idup}`, data)
            message.success('Modification avec succes');
            recupeaf()
            setTimeout(() => {
                setIsModalOpens(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }




    const modalFooter = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={ajouteraf} >
                Ajouter
            </Button>
        </div>
    );


    const modalFooters = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={updatedataaf}>
                Modifier
            </Button>
        </div>
    );



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const showModals = (no, pre, post, tel, mai, mat, id) => {
        setNomupdate(no)
        setPrenomupdate(pre)
        setPosteupdate(post)
        setTelupdate(tel)
        setMailupdate(mai)
        setIdup(id)
        setIsModalOpens(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancels = () => {
        setIsModalOpens(false);
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    useEffect(() => {
        recupeaf()
        recuperhs()
    }, [])


    return (
        <div>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <img style={{ width: '100%' }} src={imgassdir} />
                        <div class="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Ressources Humaines</Title>
                        </div>
                    </div>
                </div>
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>  Le pôle Ressources Humaines - architectes de l'épanouissement professionnel collectif</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'justify', margin: '0 auto', padding: '0 100px' }}>
                    Œuvrant pour chaque entité du groupe, le pôle ressources humaines est l'architecte de l'épanouissement professionnel collectif. En tant que gardiens du capital humain, ce pôle place l'humain au cœur de notre succès, travaillant à créer un environnement où chaque collaborateur peut s'épanouir et contribuer à notre réussite commune.
                   <p><b> Gestion intégrée des talents :</b>  Le pôle ressources humaines orchestre une gestion intégrée des talents, identifiant et développant les compétences nécessaires pour répondre aux besoins de chaque entité du groupe.</p>
                   <p><b>Développement professionnel :</b>L'évolution constante est encouragée. Notre équipe RH propose des programmes de développement professionnel, offrant aux collaborateurs les outils nécessaires pour exceller dans leurs rôles.</p>
                   <p><b>Gestion des performances :</b>  La performance individuelle contribue à notre succès collectif. Le Pôle RH établit des mécanismes pour suivre et évaluer les performances, favorisant une culture de l'excellence.</p>
                   <p><b> Gestion des relations sociales : </b>  Les relations harmonieuses sont fondamentales. Ce pôle veille à la gestion constructive des relations sociales, favorisant un environnement de travail sain et collaboratif.</p>
                   <p><b>  Recrutement stratégique :</b>  Les talents sont le moteur de notre croissance. Le Pôle RH met en œuvre des stratégies de recrutement efficaces pour attirer les meilleurs profils et renforcer nos équipes.</p>
                   <p><b> Bien-être au travail :</b>   L'épanouissement professionnel va de pair avec le bien-être. Notre équipe RH travaille à créer un environnement où chaque collaborateur se sent soutenu et valorisé.</p>
                   <p><b> Formations et développements continus :</b>  L'apprentissage est un parcours continu. Le Pôle RH propose des programmes de formation adaptés, favorisant une culture d'apprentissage permanent.</p>
                  

                    Notre pôle ressources humaines contribue à bâtir une culture d'épanouissement professionnel. Gardiens du capital humain, ce pôle façonne un environnement où chaque talent est reconnu, développé et épanoui.

                </p>
                <br /> <br />
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>Nos collaborateurs</h2> <br />
                {statut === 'Super admin' || statut === 'Admin' ? (
                                     <Button type="primary" onClick={showModal}>Ajouter un collaborateur</Button>
                                ) : (
                                    <Tooltip title="Veuillez vous connecter avant de publier">
                                        <Button type="primary" style={{ display: 'none' }}>
                                            Publier actualités
                                        </Button>
                                    </Tooltip>
                                )}
                                <Row gutter={16} align="middle" justify="center">
                                    <Col span={3}>
                                    <Statistic title="Personnes" value={rhs} formatter={formatter} />
                                    </Col> 
                                </Row>
                 </div>


            <Row gutter={[16, 16]}>
                {si.map((c, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card key={index} style={{ margin: ' 0 auto', width: 300, height: 570, textAlign: 'center ', boxShadow: '0px 4px 8px rgba(0.8, 0.8, 0.8, 0.8)' }}>
                            <Avatar
                                style={{
                                    width: 200, height: 200, margin: 'auto', marginTop: 2, backgroundColor: '#F2F6F7', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={url + c.imageUrl}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down',
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>

                            <br /><br />
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Badge.Ribbon text={c.mat} color="green" style={{ width: 250 }}>
                                    <br />
                                    <Card size="small"> {c.prenom} {c.nom}</Card>
                                    <Card size="small">Fonction: {c.poste}</Card>
                                    <Card size="small">Téléphone: {c.tel}</Card>
                                    <Card size="small">
                                          E-mail:<a href={`mailto:${c.mail}`}> {c.mail}</a>
                                    </Card>
                                </Badge.Ribbon>
                            </Space>
                            <br />
                            {(loggedInUser || loggedInPwd) && (
                                (statut === 'Super admin' || statut === 'Administrateur') ||
                                (statut === 'Utilisateur' && val.id_pers.toString() === ids)
                            ) && (
                                    <>
                                        {/* <EditOutlined onClick={() => showModals(c.nom, c.prenom, c.poste, c.tel, c.mail, c.matricule, c.id)} />
                                        {'      '}

                                        <Popconfirm
                                            title="Êtes-vous sûr de vouloir supprimer cette personne ?"
                                            description="Are you sure to delete this task?"
                                            onConfirm={() => confirm(c.id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined />
                                        </Popconfirm> */}
                                    </>
                                )}
                        </Card>
                    </Col>
                ))}
            </Row>
            <br /> <br /><br /><br /><br />


            <Modal
                title={<div style={{ textAlign: 'center' }}>Nouveau collaborateur</div>}
                visible={isModalOpen}
                footer={modalFooter}
                onCancel={handleCancel}
                width={310}
            >


                <br />

                <Input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Poste" value={poste} onChange={(e) => setPoste(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Téléphone" value={tel} onChange={(e) => setTel(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Description" />
                <br />
                <br />
                <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
                <br />
                <br />

            </Modal>




            <Modal
                title={<div style={{ textAlign: 'center' }}>Modification</div>}
                visible={isModalOpens}
                footer={modalFooters}
                onCancel={handleCancels}
                width={310}
            >
                <br />
                <Input placeholder="Nom" value={nomupdate} onChange={(e) => setNomupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" value={prenomupdate} onChange={(e) => setPrenomupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Poste" value={posteupdate} onChange={(e) => setPosteupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Téléphone" value={telupdate} onChange={(e) => setTelupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Mail" value={mailupdate} onChange={(e) => setMailupdate(e.target.value)} />
                <br />
                <br />

            </Modal>
        </div >
    );
};

export default Rh;