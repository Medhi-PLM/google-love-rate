import React, { Component } from 'react';
import api from '../api';

class Corpus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      corpus: []
    }
  }
  componentDidMount() {
    api.getCampaignAnalyze()
      .then(corpus => {
        console.log(corpus)
        this.setState({
          corpus: corpus
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="corpus">
        <h2>List of corpus</h2>
        {this.state.corpus.h1}
      </div>
    );
  }
}

export default Corpus;
