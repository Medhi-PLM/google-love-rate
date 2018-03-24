import React, { Component } from 'react';
import api from '../api';

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
        {this.state.campaigns.map((c, i) => <li key={i}>{c.name}</li>)}
      </div>
    );
  }
}

export default Campaigns;
