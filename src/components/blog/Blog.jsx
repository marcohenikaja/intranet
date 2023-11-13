import React from "react"
import BlogCard from "./BlogCard"
import "./blog.css"
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Alert from '@mui/material/Alert';
import { Input } from '@mui/material';
import Heading from "../common/heading/Heading";
import { Fade } from "react-reveal";
import { Link, Element } from "react-scroll"; // Importez Link et Element depuis react-scroll
import Awrapper from "../about/Awrapper";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Bonplan from "./Bonplan";
import Actuscollab from "./Actuscollab";
import Actusentre from "./Actusentre";
const Blog = () => {
  const url = 'http://intranet.npakadin.mg:8000/'
  const statut = sessionStorage.getItem('poste');
  const ids = sessionStorage.getItem('ids');
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const postes = sessionStorage.getItem('poste');
  const [opens, setOpens] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [alertvide, setAlertvide] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [alertmety, setAlertmety] = useState(false);
  const [pole, setPole] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleCloses = () => {
    setOpens(false);
  };
  const handleOpens = () => {
    setOpens(true);
  };

  const uploadImages = async () => {

    if (image === null) {
      setAlertvide(true)
      setTimeout(() => {
        setAlertvide(false)
      }, 2000)

      return;
    } else if (image !== null) {

      const formData = new FormData();
      formData.append("image", image);
      try {
        const responseUpload = await axios.post(`${url}uploadImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImageUrl(responseUpload.data.imageUrl);

        const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;

        const responseEnregitrermedia = await axios.post(`${url}Enregitrermedia`, { ids, imageUrl: imageUrlToSend, titre, description, loggedInUser, pole });

        if (responseEnregitrermedia.data['success'] === true) {
          setDescription("");
          setTitre("");
          setImageUrl(null);
          setAlertmety(true)
          setTimeout(() => {
            setAlertmety(false)
            setOpens(false);
            window.location.reload()
          }, 1000);

        } else {
          alert("false");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  return (
    <>

      <section className='backs'>
      </section>

      <div style={{ fontSize: '80px', color: 'white', textAlign: 'center', marginTop: '200px' }}>

        <Element name="heading"> {/* Nommez l'élément que vous souhaitez animer */}
          <Fade top>
            <h1 style={{ fontSize: '80px', color: 'white', textAlign: 'center' }}>Actualités</h1>
           
          </Fade>
          <Fade bottom>
            <Button style={{ backgroundColor: ' #329358 ', color: 'white', marginRight: '10px' }} onClick={handleOpens} disabled={!loggedInPwd || !loggedInUser} >
              Publier actualité
            </Button>


          </Fade>

        </Element>


      </div>

      <div className='margins' > <br /><br /><br /><br /><br /><br />   <br /><br /><br /><br /><br /><br /></div>
     
      <section className='blog padding'>
      <p style={{ fontSize: '26px', lineHeight: '1.5', color: '#555', textAlign: 'justify', margin: '0 200px' }}>
  Restez connecté(e) à l'univers dynamique du groupe NP Akadin Service grâce à notre menu Actualités, conçu pour vous informer sur tous les aspects passionnants de notre entreprise. Les informations sont soigneusement classées en trois catégories pour une expérience de lecture optimale :
</p>


        <div className='container grid2 custom-grid'>
          <Fade left>
            <Heading subtitle='Actualités' title='Bons Plans' /> <br />
            <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555', textAlign: 'justify' }}> Profitez des bons plans exclusifs dédiés à la communauté NP Akadin Service. De la reconnaissance des talents à des offres spéciales, cette rubrique est dédiée à vous, notre précieuse communauté. </p> 
          </Fade>

          <Bonplan />
        </div>

        <div className='container grid2' style={{ marginTop: '2vh' }}>
          <Fade left>
            <Heading subtitle='Actualités' title='Actus Collaborateurs' /> <br />
            <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555', textAlign: 'justify' }}>Découvrez les nouvelles passionnantes du quotidien de nos collaborateurs, allant des réussites personnelles aux moments inspirants. Restez connecté(e) avec la vie au sein de notre communauté.  </p> 
          </Fade>
          <Actuscollab />
        </div>

        <div className='container grid2' style={{ marginTop: '2vh' }}>
          <Fade left>
            <Heading subtitle='Actualités' title='Actus Entreprises' /> <br />
            Explorez les derniers développements, projets innovants de notre groupe. Soyez au courant des grandes avancées dont vous êtes les acteurs. 
          </Fade>
          <Actusentre />
        </div>
      </section>



      <Awrapper />
      <Modal open={opens} onClose={handleCloses}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Actus</Typography>
          {alertvide ? <Alert severity="error">
            Veuilez séléctionner une photo
          </Alert> : null}
          {alertmety ? <Alert severity="success">
            Actus bien publié
          </Alert> : null}
          <TextField style={{ marginTop: '20px', width: "100%" }} label="Titre" onChange={(e) => setTitre(e.target.value)} /> <br />

          <InputLabel style={{ marginTop: '20px', width: "100%" }} id="demo-simple-select-label" >Actus</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(e) => setPole(e.target.value)} value={pole} fullWidth label="Genre" sx={{ mb: 2 }}>
            <MenuItem value="Bons plans">Bons plans</MenuItem>
            <MenuItem value="Actus collaborateurs">Actus collaborateurs</MenuItem>
            <MenuItem value="Actus entreprises">Actus entreprises</MenuItem>
          </Select>     <br />
          <TextareaAutosize
            style={{ marginTop: "20px", width: "100%", height: "100px" }}
            rowsMin={3}
            placeholder="Description" onChange={(e) => setDescription(e.target.value)}
          /> <br />
          <Input style={{ display: 'none' }} type="file" inputProps={{ accept: '.jpg, .png, .mp4 , mp3, .avi' }}
            id="fileToUpload"
            onChange={handleFileChange}
          />
          <label htmlFor="fileToUpload">
            <Button variant="text" color="primary" component="span" style={{ marginTop: '20px' }}>  Cliquer ici pour joindre un fichier </Button>
          </label>
          <Typography variant="subtitle1" color="textSecondary">
            Formats acceptés :  .jpg, .png , mp4...
          </Typography>
          <Button variant="contained" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={uploadImages}>Enregistrer</Button>
        </div>
      </Modal>
    </>
  )
}

export default Blog
