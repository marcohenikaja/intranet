import React from 'react';
import videos from '../../assets/video/si.mp4'
import '../../assets/video/si.mp4'
import imgassdir from '../../assets/pole/Pole-5 Supply.png'
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





const Sup = () => {
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
    const [sups, setSups] = useState([])

    const recupeaf = async () => {

        try {
            const recupeservig = await axios.get(`${url}recupesupply`);
            console.log((recupeservig.data));
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const recupesups= async () => {

        try {
            const recupesis = await axios.get(`${url}recupesups`);
            setSups(recupesis.data.count)
            console.log(sis);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const confsupprimeraf = async (e) => {
        try {
            const confsupprimeraf = await axios.delete(`${url}confsupprimersupply/${e}`)
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
            const responseUpload = await axios.post(`${url}UploadImagesupply`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);

            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouteraf = await axios.post(`${url}ajoutersupply`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();


        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedataaf = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedatasupply/${idup}`, data)
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
        recupesups()
    }, [])


    return (
        <div>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <img style={{ width: '100%' }} src={imgassdir} />
                        <div class="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Supply Chain</Title>
                        </div>
                    </div>
                </div>
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}> Le pôle supply chain – pour la chaîne d'approvisionnement, le stock et les transits</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'justify', margin: '0 auto', padding: '0 50px' }}>
                    En tant que maîtres de la chaîne d'approvisionnement au sein de NP AKADIN Services, le pôle supply chain joue un rôle central en orchestrant une chaîne d'approvisionnement agile et efficace pour chaque entité du groupe. De la gestion des stocks à la distribution stratégique, ce pôle contribue à l'efficacité opérationnelle globale du groupe.
                    <br/>   <br/>
                   <b>Gestion stratégique des stocks :</b>   Le pôle supply chain met en œuvre une gestion stratégique des stocks, optimisant les niveaux pour assurer une disponibilité suffisante tout en minimisant les coûts et les excédents.
                    <br/>   <br/>
                    <b>   Logistique et distribution :</b> De la réception des marchandises à leur distribution, le pôle supply chain supervise une logistique efficace et une distribution stratégique selon les besoins de chaque entité.
                    <br/>   <br/>
                    <b>  Collaboration avec les fournisseurs :</b> Les relations avec les fournisseurs sont essentielles. Ce pôle collabore étroitement avec les fournisseurs pour garantir des délais de livraison fiables et des relations durables.
                    <br/>   <br/>
                    <b>   Optimisation des processus logistiques : </b>L'efficacité logistique est au cœur de la performance. Le pôle supply Chain travaille à optimiser les processus, intégrant des solutions technologiques pour améliorer la visibilité et la traçabilité des opérations.
                    <br/>   <br/>
                    <b>  Analyse des données d'approvisionnement :</b> Les données guident la prise de décision. Le pôle supply Chain utilise des analyses approfondies pour évaluer les performances, identifier des opportunités d'optimisation et anticiper les tendances du marché.
                    <br/>   <br/>
                    Le pôle supply chain contribue t une chaîne d'approvisionnement robuste et réactive. Maîtres d'une chaîne d'approvisionnement agile, ce pôle assure que NP AKADIN Services répond efficacement aux demandes de chaque entité du groupe.




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
                                    <Statistic title="Personnes" value={sups} formatter={formatter} />
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

export default Sup;