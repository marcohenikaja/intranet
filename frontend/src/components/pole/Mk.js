import React from 'react';
import videos from '../../assets/video/si.mp4'
import '../../assets/video/si.mp4'
import imgassdir from '../../assets/pole/Pole-3 MKTG.png'
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





const Mk = () => {
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
    const [mks,setMks]= useState([])



    const recupeaf = async () => {

        try {
            const recupeservig = await axios.get(`${url}recupemark`);
            console.log((recupeservig.data));
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const recupemks= async () => {

        try {
            const recupeservig = await axios.get(`${url}recupemks`);
            setMks(recupeservig.data.count)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }



    const confsupprimeraf = async (e) => {
        try {
            const confsupprimeraf = await axios.delete(`${url}confsupprimermark/${e}`)
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
            const responseUpload = await axios.post(`${url}UploadImagemark`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);

            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouteraf = await axios.post(`${url}ajoutermark`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();


        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedataaf = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedatamark/${idup}`, data)
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
        recupemks()
    }, [])


    return (
        <div>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <img style={{ width: '100%' }} src={imgassdir} />
                        <div class="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Marketing et Communication</Title>
                        </div>
                    </div>
                </div>
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>   Le pôle marketing et communication - pour la visibilité et de l'influence collective</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'justify', margin: '0 auto', padding: '0 50px' }}>
                    Au service de chaque entité du groupe, le pôle marketing et communication œuvre pour tisser les fils invisibles qui renforcent notre visibilité et notre influence. En tant qu'architectes des messages et gardiens de l'image, ce pôle est au cœur de notre stratégie de communication, travaillant à forger une présence remarquable sur tous les fronts.

                  <p> <b>Stratégie marketing transversale :</b>  Le pôle marketing et communication élabore des stratégies marketing transversales, s'adaptant aux besoins spécifiques de chaque entité du groupe. Chaque campagne est conçue pour refléter l'essence unique de notre entreprise.</p> 

                   <p> <b>Communication impactante :</b>  Des communiqués de presse aux contenus numériques percutants, ce pôle façonne des messages qui captivent et engagent notre audience, renforçant ainsi notre positionnement sur le marché.</p> 

                  <p><b> Gestion de l'image de Marque :</b> L'image de marque est notre empreinte digitale. Notre équipe veille à maintenir une image cohérente et positive, renforçant ainsi la confiance de nos partenaires et clients.</p> 

                 <p> <b>Veille concurrentielle :</b>  La compétition est féroce. Le pôle marketing et communication effectue une veille constante pour anticiper les tendances, rester en phase avec le marché et positionner nos entités en leaders d'opinion.</p>  

                   <p> <b>Événements impactant :</b> Des lancements de produits aux conférences, notre pôle organise des événements qui marquent les esprits, renforçant notre présence dans le paysage professionnel.</p>

                   <p> <b>Communication digitale :</b>  À l'ère du numérique, la communication en ligne est cruciale. Ce pôle gère notre présence digitale, optimisant nos canaux pour maximiser l'impact et l'engagement.</p> 

                  <p>
                   <b> Partenariats Stratégiques :</b>  Le pôle marketing et communication cultive des partenariats stratégiques, élargissant notre réseau d'influence et renforçant notre positionnement dans le marché. <br/>
                    Le pôle marketing et communication participe à la construction d'une présence robuste et dynamique. Artisans de la visibilité et de l'influence collective, ce pôle façonne le récit qui définit notre groupe.</p>  
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
                                    <Statistic title="Personnes" value={mks} formatter={formatter} />
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

export default Mk;