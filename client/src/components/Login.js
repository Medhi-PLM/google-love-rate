import React, { Component } from 'react';
import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div class="formReact">
        <h2>Ravi de vous revoir</h2>
        <div class="field">
          <label class="label">Adresse email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Email input" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} />
          </div>
        </div>

        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control">
            <input class="input" type="password" placeholder="Email input" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} />
          </div>
        </div>

        <button class="button is-link" onClick={(e) => this.handleClick(e)}>Connexion</button>
      </div>
    );
  }
}

export default Login;
