import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';


class AddCampaigns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      keyword: "",
      URL: "",
      corpus: {}
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.keyword)
    let data = {
      name: this.state.name,
      keyword: this.state.keyword,
      URL: this.state.URL
    }
    api.postCampaigns(data)
      .then(result => {
        console.log('SUCCESS! Result', result)
        api.postCampaignAnalyze(result.newCampaign._id)
          .then(corpus => {
            console.log('Success! Result NewCorpus', corpus)
            this.setState({
              corpus: corpus,
              message: `Your corpus '${corpus.URL}' has been created`
            })
            this.props.history.push(`/campaigns/${corpus._id}/analysis`)
          setTimeout(() => {
            this.setState({
              message: null
            })
          }, 2000)
        })
          .catch(err => {
            console.log('ERROR postCampaignAnalyze')
          })
      })
      .catch(err => {
          console.log('ERROR postCampaigns')
      })
    }
  render() {                
    return (
      <div class="formReact">
      <h2>Créer votre campagne</h2>
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input class="input" type="text" placeholder="Nom" value={this.state.name} onChange={(e) => {this.handleInputChange("name", e)}} />
          </div>
        </div>
        <div class="field">
          <label class="label">Mot clé</label>
          <div class="control">
            <input class="input" type="text" placeholder="Mot clé" value={this.state.keyword} onChange={(e) => {this.handleInputChange("keyword", e)}} />
          </div>
        </div>
        <div class="field">
          <label class="label">URL</label>
          <div class="control">
            <input class="input" type="text" placeholder="URL" value={this.state.URL} onChange={(e) => {this.handleInputChange("URL", e)}} />
          </div>
        </div>  
        <button class="button is-link" onClick={(e) => this.handleClick(e)}>Créer votre campagne</button>
        <div style={{
            margin: 10,
            backgroundColor: "red",
            display: this.state.message ? "block" : "none"
          }}>
            {this.state.message}
        </div>
          {this.state.corpus.keywords ? this.state.corpus.keywords.map( keyword => (<li>{keyword.text}</li>)) : ''}
      </div>
    );
  }
}

export default AddCampaigns;
