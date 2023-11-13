import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import BlogHome from "./components/Blogs/BlogHome"

import Af from "./components/pole/daf/Af"
import Assistdir from "./components/pole/assistdir/Assistdir"
import Supply from "./components/pole/supply/Supply"
import Si from "./components/pole/si/Si"
import Servicegenerau from "./components/pole/servgenerau/Servicegenerau"
import Rh from "./components/pole/rh/Rh"
import Hsse from "./components/pole/hsse/Hsse"
import Marketcom from "./components/pole/marketcom/Maketcom"
import Organigramme from "./components/Organigramme/Organigramme"
import Listeuser from "./components/listeuser/Listeuser"
import Histo from "./components/histo/Histo"
import Cgu from "./components/cgu/Cgu"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/ressource' component={About} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/message' component={Pricing} />
          <Route exact path='/journal' component={Blog} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/BlogHome' component={BlogHome} />

          <Route exact path='/af' component={Af} />
          <Route exact path='/assistdir' component={Assistdir} />
          <Route exact path='/supply' component={Supply} />
          <Route exact path='/si' component={Si} />
          <Route exact path='/servicegenerau' component={Servicegenerau} />
          <Route exact path='/rh' component={Rh} />
          <Route exact path='/hsse' component={Hsse} />
          <Route exact path='/marketcom' component={Marketcom} />
          <Route exact path='/organigramme' component={Organigramme} />
          <Route exact path='/listeuser' component={Listeuser} />
          <Route exact path='/historique' component={Histo} />
          <Route exact path='/cgu' component={Cgu} />
         
          
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
