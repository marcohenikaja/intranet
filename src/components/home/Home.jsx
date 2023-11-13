import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import WSPGallery from "../galery/WSPGallery"
import BlogHome from '../Blogs/BlogHome'
import Faq from "../pricing/Faq"
import Awrapper from "../about/Awrapper"
import WSPVideoGallery from "../videos/WSPVideoGallery"
const Home = () => {
  return (
    <>
      <Hero />

      <Hprice />
      <HAbout />
      {/* < AboutCard/> */}
      <WSPGallery /> 
      <WSPVideoGallery />
      <Awrapper/>                                                                                                                     
      <Faq />
      {/* edouard */}
      {/* <Testimonal /> */}
      {/* <Hblog /> */}



    </>
  )
}

export default Home
