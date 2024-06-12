import React from 'react';
import videos from '../../assets/video/si.mp4'
import imgassdir from '../../assets/pole/Pole-9 AstDir.png'
import '../../assets/video/si.mp4'
import { useEffect, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, AutoComplete, Input, Modal, Badge, Image, Tooltip,Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { message, Popconfirm } from 'antd';
import { Avatar } from 'antd';
import axios from 'axios';
import { Card } from 'antd';
import { Col, Row,Statistic} from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;
import CountUp from 'react-countup';
const { Meta } = Card;
const { Title } = Typography;





const Assdir = () => {
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
    const [assdirs, setAssdirs] = useState([])



    const recupeaf = async () => {

        try {
            const recupeservig = await axios.get(`${url}recupead`);
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const recupenbrassdir= async () => {
        try {
            const recupeservig = await axios.get(`${url}recupenbrassdir`);
            console.log((recupeservig.data));
            setAssdirs(recupeservig.data.count)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }




    const confsupprimeraf = async (e) => {
        try {
            const confsupprimeraf = await axios.delete(`${url}confsupprimerad/${e}`)
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

        ;
        const formData = new FormData();
        formData.append("image", image);
        try {
            const responseUpload = await axios.post(`${url}UploadImagead`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);

            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouteraf = await axios.post(`${url}ajouterad`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();


        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedataaf = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedataad/${idup}`, data)
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
        recupenbrassdir()
    }, [])


    return (
        <div>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <img style={{ width: '100%' }} src={imgassdir} />

                        <div class="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Assistance de Direction</Title>
                        </div>
                    </div>
                </div>
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}> Le Pôle Assistance de Direction, au service des directions et de l'accueil</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'justify', margin: '0 auto', padding: '0 50px' }}>
                    Dédié à la gestion fluide des directions au sein de chaque entité du groupe, le pôle assistance de direction joue un rôle crucial dans le groupe. En charge de coordonner les emplois du temps, faciliter les communications avec les directions, et assurer un accueil chaleureux au siège de NP AKADIN, ce pôle contribue à créer un environnement où chaque interaction est empreinte de professionnalisme et d'efficacité.
                    <br /><br /> <b>Coordination des emplois du temps :</b>
                     La gestion précise des agendas est une priorité. Le pôle assistance de direction assiste les directions de chaque entité.
                    <br /> <br />
                    <b> Communication transparente avec les directions :</b> La clarté dans la communication est essentielle. Ce pôle facilite les échanges entre les différentes directions, veillant à ce que les informations circulent de manière fluide et efficace.
                    <br /> <br />
                    <b>Accueil au siège de NP AKADIN :</b>  La première impression compte. Le Pôle Assistance de Direction assure un accueil chaleureux et professionnel au siège de NP AKADIN, reflétant ainsi les valeurs d'hospitalité du groupe.
                    <br /> <br />
                    <b> Gestion des communications : </b> Des correspondances aux réunions, ce pôle gère les communications avec les directions, s'assurant que chaque interaction est traitée avec la diligence et la confidentialité nécessaires.
                    <br /> <br />
                    <b> Support administratif personnalisé :</b>  Chaque directeur a des besoins uniques. Le Pôle Assistance de Direction offre un support administratif personnalisé, répondant aux exigences spécifiques de chaque direction.
                    <br /> <br />
                    <b>Organisation d'événements et réunions :</b>   Des rencontres stratégiques aux événements internes, ce pôle coordonne l'organisation d'événements et de réunions, contribuant ainsi à renforcer la cohésion et l'efficacité des équipes.
                    <br /> <br />
                    Le pôle assistance de direction est la passerelle entre les entités et les directions.
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
                                    <Statistic title="Personnes" value={assdirs} formatter={formatter} />
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

export default Assdir;