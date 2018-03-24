import React, { Component } from 'react';
import api from '../api';

class Corpus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      corpus: {}
    }
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
    api.getCampaignAnalyze(this.props.match.params.id)
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
        <div>title: {this.state.corpus.title}</div>
        <div>h1: {this.state.corpus.h1}</div>
        <div>position: {this.state.corpus.position}</div>
        <div>textLength: {this.state.corpus.textLength}</div>
        <div>score: {this.state.corpus.score}</div>
        <ul>
        {this.state.corpus.keywords ? this.state.corpus.keywords.map(keyword => <li>{keyword.text+" "+keyword.relevance}</li>) : ""}
        </ul>
      </div>
    );
  }
}

export default Corpus;
