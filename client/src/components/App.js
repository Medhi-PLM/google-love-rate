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
import logo from '../logo.svg';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React campaigns</h1>
          <Link to="/">Home</Link> 
          <Link to="/campaigns">Campaigns</Link> 
          <Link to="/add-campaigns">Add campaigns</Link> 
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
          <Link to="/secret">Secret</Link> 
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/campaigns" component={Campaigns} />
          <Route path="/campaigns/${id}/analysis" component={Corpus} />
          <Route path="/add-campaigns" component={AddCampaigns} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
