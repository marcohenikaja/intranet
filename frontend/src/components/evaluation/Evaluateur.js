import React, { useState, useEffect } from 'react';
import { Anchor, Drawer, Button, Flex, Modal } from 'antd';
import { message, Steps, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom';
import { Typography,Tooltip } from 'antd';
import { Input } from 'antd';
import 'jspdf-autotable';
import { EyeTwoTone } from '@ant-design/icons';
import { DatePicker, Select } from 'antd';
import photo from '../../assets/images/eva.mp4'
import logonpa from './LOGO NPA.png'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';




const CheckboxGroup = Checkbox.Group;

const url = 'http://172.16.0.92:8000/'



const Evaluateur = () => {
   
    const [api, contextHolder] = notification.useNotification();
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[ideva, setIdeva] = useState('');
  
    
    const [dataeva,setDataeva]=useState([])


    const getgataeva=async()=>{
       try {
        const getgataeva=await axios.get(`${url}getgataeva/${loggedInUser}`);
        console.log(getgataeva);
        setDataeva(getgataeva.data)
       } catch (error) {
         console.log(error);
       }
    }
    

    const contentStyle = {
        textAlign: 'center',
        color: 'black', // Couleur du texte
        backgroundColor: 'white', // Couleur de fond
        // borderRadius: '10px', // Bordure arrondie
        marginTop: 16,
        padding: '20px', // Ajout de padding
        boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)' // Ombre
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
      };



      
    

      const getdatabyid=async()=>{
      
        try {
            const response =axios.get(`${url}getdatabyid/${ideva}`);
            const data = response.data;

            console.log(data[0]);

            if (data && data.length > 0) {
                console.log(data[0].nom);
                setEmail(data[0].maileval);
                setNom(data[0].nom);
                setPrenom(data[0].prenom);
                setMat(data[0].mat);
                setDaty(data[0].dateentree);
                setDir(data[0].direction);
                setNomeval(data[0].nomeval);
                setFonc(data[0].fonc);
                setDatys(data[0].datedu);
                setDatyss(data[0].dateau);
                setMission(data[0].mission);
                setResultat(data[0].res1);
                setR1(data[0].r1);
                setPoste(data[0].posteeval);
                setCmt1(data[0].com1);
                setCmt2(data[0].com2);
                setCmt3(data[0].com3);
                setCmt4(data[0].com4);
                setCmt5(data[0].com5);
                setNivactus(data[0].nivactus);
                setConcl(data[0].conclusion);
                setNouvnivs(data[0].nouvnivs);
                setCom(data[0].comment);
                setAncienneteniv(data[0].ancienneteniv);
                setIdr(data[0].idr);
                setF1(data[0].f1);
                setF2(data[0].f2);
                setF3(data[0].f3);
                setF4(data[0].f4);
                setF5(data[0].f5);


                setC1(data[0].c1);
                setC2(data[0].c2);
                setC3(data[0].c3);
                setC4(data[0].c4);
                setC5(data[0].c5);

                setAm1(data[0].am1);
                setAm2(data[0].am2);
                setAm3(data[0].am3);
                setAm4(data[0].am4);
                setAm5(data[0].am5);


                setC21(data[0].c21);
                setC22(data[0].c22);
                setC23(data[0].c23);
                setC24(data[0].c24);
                setC25(data[0].c25);


                setT1(data[0].t1);
                setT2(data[0].t2);
                setT3(data[0].t3);
                setT4(data[0].t4);

                setCompac1(data[0].compac1);
                setCompac2(data[0].compac2);
                setCompac3(data[0].compac3);
                setCompac4(data[0].compac4);

                setApav1(data[0].apav1);
                setApav2(data[0].apav2);
                setApav3(data[0].apav3);
                setApav4(data[0].apav4);

                setApap1(data[0].apap1);
                setApap2(data[0].apap2);
                setApap3(data[0].apap3);
                setApap4(data[0].apap4);

                setComm1(data[0].comm1);
                setComm2(data[0].comm2);
                setComm3(data[0].comm3);
                setComm4(data[0].comm4);







                setCcd1(data[0].ccd1);
                setCcd2(data[0].ccd2);
                setCcd3(data[0].ccd3);
                setCcd4(data[0].ccd4);


                setCatcomp1(data[0].catcomp1);
                setCatcomp2(data[0].catcomp2);
                setCatcomp3(data[0].catcomp3);
                setCatcomp4(data[0].catcomp4);

                setMotif1(data[0].motif1);
                setMotif2(data[0].motif2);
                setMotif3(data[0].motif3);
                setMotif4(data[0].motif4);

                setPa1(data[0].pa1);
                setPa2(data[0].pa2);
                setPa3(data[0].pa3);
                setPa4(data[0].pa4);


                setDp1(data[0].dp1);
                setDp2(data[0].dp2);
                setDp3(data[0].dp3);
                setDp4(data[0].dp4);

                setCt1(data[0].ct1);
                setCt2(data[0].ct2);
                setCt3(data[0].ct3);

                setMt1(data[0].mt1);
                setMt2(data[0].mt2);
                setMt3(data[0].mt3);


                setMl1(data[0].ml1);
                setMl2(data[0].ml2);
                setMl3(data[0].ml3);


                setCpr1(data[0].cpr1);
                setCpr2(data[0].cpr2);
                setCpr3(data[0].cpr3);

                setCg1(data[0].cg1);
                setCg2(data[0].cg2);
                setCg3(data[0].cg3);



                setComcollab(data[0].comcollab);

                setSelectedValue1(data[0].val1);
                setSelectedValue2(data[0].val2);

                setSelectedVal1(data[0].val1);
                setSelectedVal2(data[0].val2);
                setSelectedVal3(data[0].v3);
                setSelectedVal4(data[0].v4);
                setSelectedVal5(data[0].v5);
                setSelectedVal6(data[0].v6);
                setSelectedVal7(data[0].v7);
                setSelectedVal8(data[0].v8);
                setSelectedVal9(data[0].v9);
                setSelectedVal10(data[0].v10);
                setSelectedVal11(data[0].v11);
                setSelectedVal12(data[0].v12);
                setSelectedVal13(data[0].v13);
                setSelectedVal14(data[0].v14);
                setSelectedVal15(data[0].v15);




                const l1 = data[0].libelle1
                const p1 = parseInt(data[0].poids1);
                const n1 = parseInt(data[0].notation1)
                const cmts1 = data[0].commentaire1



                const l2 = data[0].libelle2
                const p2 = parseFloat(data[0].poids2);
                const n2 = parseFloat(data[0].notation2)
                const cmts2 = data[0].commentaire2

                const l3 = data[0].libelle3
                const p3 = parseFloat(data[0].poids3);
                const n3 = parseFloat(data[0].notation3)
                const cmts3 = data[0].commentaire3


                const l4 = data[0].libelle4
                const p4 = parseFloat(data[0].poids4);
                const n4 = parseFloat(data[0].notation4)
                const cmts4 = data[0].commentaire4






                const l11 = data[0].libelleend1
                const p11 = parseInt(data[0].poidsend1);
                const n11 = parseInt(data[0].notationend1)
                const cmts11 = data[0].commentaireend1



                const l21 = data[0].libelleend2
                const p21 = parseFloat(data[0].poidsend2);
                const n21 = parseFloat(data[0].notationend2)
                const cmts21 = data[0].commentaireend2

                const l31 = data[0].libelleend3
                const p31 = parseFloat(data[0].poidsend3);
                const n31 = parseFloat(data[0].notationend3)
                const cmts31 = data[0].commentaireend3


                const l41 = data[0].libelleend4
                const p41 = parseFloat(data[0].poidsend4);
                const n41 = parseFloat(data[0].notationend4)
                const cmts41 = data[0].commentaireend4






                const dataFromDB = {
                    libelle1: l1,
                    poids1: p1,
                    notation1: n1,
                    commentaire1: cmts1,

                    libelle2: l2,
                    poids2: p2,
                    notation2: n2,
                    commentaire2: cmts2,

                    libelle3: l3,
                    poids3: p3,
                    notation3: n3,
                    commentaire3: cmts3,

                    libelle4: l4,
                    poids4: p4,
                    notation4: n4,
                    commentaire4: cmts4,
                };


                const dataFromDBs = {
                    libelle1: l11,
                    poids1: p11,
                    notation1: n11,
                    commentaire1: cmts11,

                    libelle2: l21,
                    poids2: p21,
                    notation2: n21,
                    commentaire2: cmts21,

                    libelle3: l31,
                    poids3: p31,
                    notation3: n31,
                    commentaire3: cmts31,

                    libelle4: l41,
                    poids4: p41,
                    notation4: n41,
                    commentaire4: cmts41,
                };


                const transformedObjectifs1 = transformData(dataFromDBs);
                setObjectifs1(transformedObjectifs1);


                const transformedObjectifs = transformData(dataFromDB);
                setObjectifs(transformedObjectifs);

                console.error('Les données reçues sont vides ou invalides');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }

    }



    const modalFooter = (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={getdatabyid} >
            Connexion
          </Button>
        </div>
      );
    

      const afficheconnex=(ide)=>{
        setIdeva(ide)
        setIsModalOpen(true)
      }

        useEffect(()=>{
            getgataeva();
        },[])

    return (

        <div style={{ position: 'relative', width: '100%', height: '100%', }}>
            <video
                src={photo}                      
                autoPlay                         
                loop                             
                muted                        
                style={{
                    width: '100%',               
                    height: '100%',                
                    objectFit: 'cover',          
                    position: 'absolute',          
                    top: 0,                        
                    left: 0,                       

                }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '100px', zIndex: +1 }}>
                {contextHolder}
                <div style={{ width: '90%', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)', padding: '20px', zIndex: +1 }}>
                    <img src={logonpa} width={180} height={100} alt="logo npa" />

                    <h2>Validation de N+1</h2>
                    {dataeva ? (
                <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '70%' }}>
                    <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '10px', border: '1px solid white' }}>Nom</th>
                            <th style={{ padding: '10px', border: '1px solid white' }}>Prénom(s)</th>
                            <th style={{ padding: '10px', border: '1px solid white' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataeva.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                    {item.nom}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                    {item.prenom}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                    {/* Ajoutez des actions ici si nécessaire */}
                                    <Link to={`/getevaluationid/${item.id_pers}`}>
                                        <EyeTwoTone />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
                </div>

            </div>
            <br /><br /><br /><br /><br />
            <Modal
            title={<div style={{ textAlign: 'center' }}>Connexion</div>}
            visible={isModalOpen}
            footer={modalFooter}
            onCancel={handleCancel}
            width={310}
          >
            <br />

            <Input
              placeholder="Entrer votre E-mail"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="(nom.prenom@npakadin.mg) (nom.prenom@guilmann.mg) (nom.prenom@spider.mg)">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
               />
            <br />
            <br />
            <Input.Password placeholder="Mot de passe session windows"  />
            <br />
            <br />
          </Modal>
        </div>

    );
};

export default Evaluateur; // Assurez-vous que cette ligne est présente pour exporter le composant Evaluateur
