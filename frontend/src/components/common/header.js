import React, { useState } from 'react';
import { Anchor, Drawer, Button, Flex, Modal } from 'antd';
import logos from '../../assets/images/LOGO NPA.png'
import { Input } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import axios from 'axios';
import { Alert, Space } from 'antd';
const { Link } = Anchor;

function AppHeader() {
  const url = 'http://172.16.0.92:8000/'
  const [visible, setVisible] = useState(false);
  const loggedInUser = sessionStorage.getItem('loginUser');
 
  const [alertvides, setAlertvides] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [alerterror, setAlerterror] = useState(false)

  const ids = sessionStorage.getItem('ids');
  const statut = sessionStorage.getItem('poste');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const login = async () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (username == "" || password == "") {
      setAlertvides(true)
      setTimeout(() => {
        setAlertvides(false)
      }, 2000)
    }
    else if (!emailPattern.test(username)) {

      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 2000);
      return;

    }
    else {
      try {
        const response = await axios.post(`${url}login`, { username, password });

        if (response.data.success === true) {

          sessionStorage.setItem('ids', response.data.ids);
          sessionStorage.setItem('loginUser', response.data.login);
          sessionStorage.setItem('pwdUser', response.data.pwd);
          sessionStorage.setItem('poste', response.data.poste);
          window.location.reload();
        } else {
          setAlerterror(true)
          setTimeout(() => {
            setAlerterror(false)
          }, 2000)
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
    sessionStorage.removeItem('ids');
    window.location.reload();
  }

  const modalFooter = (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={login}  >
        Connexion
      </Button>
    </div>
  );



  return (
    <div className="container-fluid">
      <div className="header">
      <div className="logo">
        <a href="http://172.16.0.92:3000/">
          <img src={logos} style={{ width: '150px', height: '70px' }} />
        </a>
      </div>

        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/" title="Accueil" />
            <Link href="histo" title="Notre histoire" />
            <Link href="team" title="Groupe" />
            <Link href="actus" title="Actualités" />
            <Link href="ressource" title="Ressources" />
            <Link href="annuaire" title="Annuaire du groupe" />

           
            
            {(loggedInUser === "rakotobe.marco@npakadin.mg") ||(loggedInUser === "ravelomanatsoa.faniry@npakadin.mg") ||(loggedInUser === "rafanomezantsoa.espoir@npakadin.mg")  ||(loggedInUser === "maholiarisoa.jeamis@npakadin.mg")? (
                <Link href="pbxlogger" title="Pbxlogger" />
              ) : null}




            {/* <Link href="evaluateur" title="Evaluateur" /> */}
            
            {(statut === "Super admin") ? (
                <Link href="listeuser" title="Liste utilisateur" />
              ) : null}


            {!loggedInUser ? (
              <Button type="primary" onClick={showModal} >   Connexion </Button>
            ) : (
              <Button type="primary" danger onClick={deconnexion}>
                Déconnexion
              </Button>
            )}


          </Anchor>
        </div>


        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Accueil" />
              <Link href="histo" title="Notre histoire" />
              <Link href="team" title="Groupe" />
              <Link href="actus" title="Actualités" />
              <Link href="ressource" title="Ressources" />
              <Link href="annuaire" title="Annuaire du groupe" />

              {(loggedInUser === "rakotobe.marco@npakadin.mg") ||(loggedInUser === "ravelomanatsoa.faniry@npakadin.mg") ||(loggedInUser === "rafanomezantsoa.espoir@npakadin.mg")  ||(loggedInUser === "maholiarisoa.jeamis@npakadin.mg")? (
                <Link href="pbxlogger" title="Pbxlogger" />
              ) : null}

            

              {(statut === "Super admin") ? (
                <Link to='/listeuser'>Liste utilisateur</Link>
              ) : null}
              
              {!loggedInUser ? (
                <Button type="primary" onClick={showModal}> Connexion  </Button>
              ) : (
                <Button type="primary" danger onClick={deconnexion}>    Déconnexion   </Button>
              )}

            </Anchor>
          </Drawer>


          <Modal
            title={<div style={{ textAlign: 'center' }}>Connexion</div>}
            visible={isModalOpen}
            footer={modalFooter}
            onCancel={handleCancel}
            width={310}
          >

            {invalidEmail && (<Alert type="error" message=" Veuillez vérifier votre e-mail " showIcon />)}
            {alertvides && (<Alert message="Veuiller remplir les champs vides" type="error" showIcon />)}
            {alerterror && <Alert severity="error" message="Nom d'utilisateur ou mot de passe " showIcon />}
            <br />

            <Input
              placeholder="Entrer votre E-mail"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="(nom.prenom@npakadin.mg) (nom.prenom@guilmann.mg) (nom.prenom@spider.mg)">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <br />
            <br />
            <Input.Password placeholder="Mot de passe session windows" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
          </Modal>

        </div>
      </div>
    </div >
  );
}

export default AppHeader;