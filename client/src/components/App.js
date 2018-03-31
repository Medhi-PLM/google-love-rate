import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Campaigns from './Campaigns';
import AddCampaigns from './AddCampaigns';
import Corpus from './Corpus';
import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import logo from '../ranking.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {                
    return (
      //Bulma Navbar 
    <div>
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <Link class="navbar-item" to="/">
            <img src={logo} />
          </Link>
        </div>
        
        <div class="navbar-end">
          <div id="navbarExampleTransparentExample" class="navbar-menu">
            <Link class="navbar-item" to="/campaigns">Campagnes</Link>
            {!api.isLoggedIn() && <Link class="navbar-item" to="/login">Se connecter</Link> }
            {!api.isLoggedIn() && <Link class="navbar-item" to="/signup">S'inscrire</Link> }
            {api.isLoggedIn() && <Link class="navbar-item" to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
          </div>
          <div class="navbar-item">
            <p class="control">
              <Link class="button is-success" to="/add-campaigns">
                <span>Lancer votre campagne</span>
              </Link>
            </p>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/campaigns" exact component={Campaigns} />
        <Route path="/campaigns/:id/analysis" component={Corpus} />
        <Route path="/add-campaigns" component={AddCampaigns} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/secret" component={Secret} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      <footer class="footer footer-color">
        <div class="footerContainer">
          <div class="footerItem">
            <h4>Google Love Rate</h4>
            <ul>
              <li>Qui sommes-nous ?</li>
              <li>Optimisations de contenus</li>
              <li>SEO Blog</li>
              <li>Nous rejoindre</li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>Mentions Légales</h4>
            <ul>
              <li>Conditions d'utilisation</li>
              <li>Politique de remboursement</li>
              <li>Conditions d'annulation</li>
              <li>Politique de confidentialité</li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>Nos produits</h4>
            <ul>
              <li>Rapports d'analyse</li>
              <li>Projets</li>
              <li>Programme d'affiliation</li>
              <li>Webinaires</li>
            </ul>
          </div>
        </div>
      </footer>     
    </div>
    );
  }
}

export default App;
