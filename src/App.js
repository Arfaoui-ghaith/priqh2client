import ApolloProvider from './ApolloProvider';
import React from 'react'
import Sidebar from './droit-acce/components/Sidebar'
import Navbar from './droit-acce/components/Navbar'
import Footer from './droit-acce/components/Footer'
import Dashboard from './droit-acce/pages/Dashboard'
import Role from './droit-acce/pages/Role'
import Group from './droit-acce/pages/Group'
import Interface from './droit-acce/pages/Interface'
import Specification from './droit-acce/pages/Specification'
import Settings from './droit-acce/pages/Settings'
import Profile from './droit-acce/pages/Profile'
import Login from './droit-acce/pages/Login'
import Traces from './droit-acce/pages/Traces/Traces'

import Quartiers from './identification/quartier/Quartiers'
import Projets from './identification/projet/Projets'
import E404 from './identification/pages/E404'
import Criteres from './identification/critere/Criteres'

import Commune from './identification/commune/Communes'
import Elig from './identification/pages/Eligible'
import Beilleurs from './financement/bailleur_fonds/Beilleurs'
import Tranches from './identification/tranche/Tranches'
import Budget from './identification/pages/Budget'
import Prestataire from './financement/prestataire/Prestataire'
import Memoire from './financement/memoire/Memoire'
import Financement from './financement/financement/Financement'
import Decompte from './financement/decompte/Decompte'
import Avancement from './execution physique/dashboard/Avancement'

import Avenant from './execution physique/avenant/Avenant'

import {BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { StoreProvider } from './context/store';
import DynamicRoutes from './utils/DynamicRoutes';
import './App.css';
import './Scroll.css';



function App() {

  if (typeof window !== 'undefined') {
    window.React = React;
  }
 
  return (
    
    <ApolloProvider>
    <AuthProvider>
    <StoreProvider>
    <Router>
      
        <div className="wrapper">
          <Sidebar />
          <div className="main">
          <Navbar />
          <Switch>
            <DynamicRoutes exact path="/Login" component={Login} guest />
            <DynamicRoutes exact path="/Utilisateurs" component={Dashboard} authenticated interface="gestion des utilisateurs"/>
            <DynamicRoutes exact path="/Roles" component={Role} authenticated interface="gestion des roles"/>
            <DynamicRoutes exact path="/Groupes" component={Group} authenticated interface="gestion des groupes"/>
            <DynamicRoutes exact path="/Interfaces" component={Interface} authenticated interface="gestion des interfaces"/>
            <DynamicRoutes exact path="/Specifications" component={Specification} authenticated interface="gestion des groupes" /> 
            <DynamicRoutes exact path="/Profile" component={Profile} authenticated />
            <DynamicRoutes exact path="/Settings" component={Settings} authenticated />
            <DynamicRoutes exact path="/Quartiers" component={Quartiers} authenticated />
            <DynamicRoutes exact path="/Projets" component={Projets} authenticated />
            <DynamicRoutes exact path="/Eligible" component={Elig} authenticated />
            <DynamicRoutes exact path="/Critéres d'éligibilité" component={Criteres} authenticated />
            <DynamicRoutes exact path="/communes" component={Commune} authenticated />
            <DynamicRoutes exact path="/beilleurs" component={Beilleurs} authenticated />
            <DynamicRoutes exact path="/Tranches" component={Tranches} authenticated />
            <DynamicRoutes exact path="/Budget" component={Budget} authenticated />
            <DynamicRoutes exact path="/Prestataire" component={Prestataire} authenticated />
            <DynamicRoutes exact path="/Memoire" component={Memoire} authenticated />
            <DynamicRoutes exact path="/Financement/:id" component={Financement} authenticated />
            <DynamicRoutes exact path="/Decompte" component={Decompte} authenticated />
            <DynamicRoutes exact path="/Avancement" component={Avancement} authenticated />
            <DynamicRoutes exact path="/Traces" component={Traces} authenticated />
            <DynamicRoutes exact path="/Avenant" component={Avenant} authenticated />
            <DynamicRoutes component={E404} authenticated />
          </Switch>
          <Footer />
          </div>
        </div>
      
    </Router>
    </StoreProvider>
    </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
