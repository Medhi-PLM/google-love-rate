import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import api from '../api';
import Corpus from './Corpus';

class Campaigns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: []
    }
  }
  componentDidMount() {
    api.getCampaigns()
      .then(campaigns => {
        console.log(campaigns)
        this.setState({
          campaigns: campaigns
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="campaigns">
        <h2>List of campaigns</h2>
        {this.state.campaigns.filter(c => c.analysis.length > 0).map((c, i) => <li key={i}>
          <Link to={`/campaigns/${c.analysis[0]}/analysis`}>{c.name}</Link>
        </li>)}
      </div>
    );
  }
}

export default Campaigns;
