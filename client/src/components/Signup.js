import React, { Component } from 'react';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div class="formReact">
        <h2>Créer un compte</h2>
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input class="input" type="text" placeholder="Nom" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} />
          </div>
        </div>
        <div class="field">
          <label class="label">Prénom</label>
          <div class="control">
            <input class="input" type="text" placeholder="Prénom" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} />
          </div>
        </div>
        <div class="field">
          <label class="label">Adresse email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Adresse email" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} />
          </div>
        </div>
        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control">
            <input class="input" type="password" placeholder="Mot de passe" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} />
          </div>
        </div>
        <button class="button is-link" onClick={(e) => this.handleClick(e)}>Créer votre compte</button>
      </div>
    );
  }
}

export default Signup;
