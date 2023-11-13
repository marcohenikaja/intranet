
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { Alert,Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const Discu = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const ids = sessionStorage.getItem('ids');
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const [allutilisateur, setAllutilisateur] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [mess,setMess]  = useState('');
  const [sms,setSms] =useState([]);
  const [alertmess,setAlertmess]=useState(false)
  const [envoyer,setEnvoyer]=useState('')
  const fetchAll = async () => {

    try {
      const response = await axios.get(`${url}fetchAll/${ids}`);
      setAllutilisateur(response.data);
    } catch (error) {
      console.log(error);
    }
  };
    
  const envoyermess = async () => {
    
    const data = { ids, mess, selectedPerson };
    if (selectedPerson=="" || selectedPerson==null) {
      setAlertmess(true)
      setTimeout(() => {
        setAlertmess(false)
      }, 2500);
    } else {
        try {
            const envoyer = await axios.post(`${url}envoyermess`, data);
            if (envoyer.data.success === true) {
              setMess("");
            
               makamessjiaby(selectedPerson);
            }
          } catch (error) {
            console.log(error);
          }
    }
  
  }
  

  const makamessjiaby = async (id,nom) => {
    setEnvoyer(nom)
    setSelectedPerson(id);
    try {
      const response = await axios.get(`${url}makamessjiaby/${id}/${ids}`);
      if (response.data.success === true) {
        setSms(response.data.sms); // Mettez à jour la valeur de 'sms' avec les données des messages reçus
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const filteredUtilisateurs = allutilisateur.filter((utilisateur) =>
    utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  useEffect(() => {
    fetchAll();
   
  }, []);
  

 
useEffect(()=>{
  makamessjiaby();
},[]);
  

const renderMessages = () => {
  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }}> 
      {sms.map((m, index) => {
        const isCurrentUser = m.id_send.toString() === ids;
      
        const messageStyle = {
          backgroundColor: isCurrentUser ? '#2D41A4' : ' #329358 ',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px',
          float: isCurrentUser ? 'right' : 'left',
          clear: 'both',
        };
    
        const dateStyle = {
          fontSize: '12px',
          color: 'gray',
          marginTop: '5px',
        };
    
        return (
          <div key={index} style={messageStyle}>
            {m.content}
            <div style={dateStyle}>{m.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

  
 
  return (
    <div style={{ backgroundColor: '#F3F6F9', textAlign: 'center' }}>
     <h2 style={{ backgroundColor: '#F6F6F6', color: '#5463a9', fontSize: '38px', marginTop: '100px', textAlign: 'center' }}>Discussion</h2>
      {/* ato le tsy hita */}
      <input type='hidden' value={selectedPerson}/>
      <div style={{ textAlign: 'center' ,width:'400px'}}>
           
        </div>
      <TextField label="Recherche" style={{ backgroundColor: 'white', textAlign: 'center', width: '400px', marginBottom: '20px' }} variant="outlined" InputProps={{startAdornment: <SearchIcon fontSize="small" />, }}
        fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
         {alertmess? <Alert  severity="error"> Veuillez sélectionner un destinataire !</Alert>:null}
   <br/>
         <Button variant="contained">envoyer à:{envoyer}</Button>

      <div className="messenger-list" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {filteredUtilisateurs.map((nom, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', textAlign: 'center' }}>
            <IconButton style={{ backgroundColor: ' #329358 ', color: 'white' }} aria-label="Ajouter" size="large" onClick={() => makamessjiaby(nom.id,nom.nom)}>
            </IconButton>
            <p style={{ color: 'black', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nom.nom}
            </p>
          </div>
        ))}
      </div>
      {/* ici l'affichage des messages */}
      {renderMessages()}
      
      <TextField  label="Message" variant="outlined" value={mess}
        onChange={(e)=>setMess(e.target.value)}
        style={{backgroundColor:'white',width:'500px'}}
        InputProps={{
          endAdornment: (
            <button  style={{ border: 'none',background: 'transparent', cursor: 'pointer', }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ImageIcon/>
                <AttachFileIcon />
                <SendIcon style={{ color: 'blue' }} onClick={envoyermess} />
              </div>

            </button>
          ),
          style: { paddingRight: '40px' }, 
        }}
      />
    </div>
  );
};

export default Discu;

