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
      corpus: {},
      isCampaignLoading: false
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({
      isCampaignLoading: true
    })
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
            this.setState({
              isCampaignLoading: false,
              errorMessage: "ERROR postCampaignAnalyze"
            })
          })
      })
      .catch(err => {
          console.log('ERROR postCampaigns')
          this.setState({
            isCampaignLoading: false,
            errorMessage: "ERROR postCampaigns"
          })
      })
    }
  render() {
    if (this.state.isCampaignLoading) {
      return (
        <div className="formReact">
          Chargement...
        </div>
      )
    }                
    return (
      <div className="formReact">
        {this.state.errorMessage && 
          <div className="notification is-danger">
            <button onClick={(e) => this.setState({errorMessage: null})} className="delete"></button>
            {this.state.errorMessage}
          </div>
        }
        <h2>Créer votre campagne</h2>
        <div className="field">
          <label className="label">Nom</label>
          <div className="control">
            <input className="input" type="text" placeholder="Nom" value={this.state.name} onChange={(e) => {this.handleInputChange("name", e)}} />
          </div>
        </div>
        <div className="field">
          <label className="label">Mot clé</label>
          <div className="control">
            <input className="input" type="text" placeholder="Mot clé" value={this.state.keyword} onChange={(e) => {this.handleInputChange("keyword", e)}} />
          </div>
        </div>
        <div className="field">
          <label className="label">URL</label>
          <div className="control">
            <input className="input" type="text" placeholder="URL" value={this.state.URL} onChange={(e) => {this.handleInputChange("URL", e)}} />
          </div>
        </div>  
        <button className="button is-link" onClick={(e) => this.handleClick(e)}>Créer votre campagne</button>
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
