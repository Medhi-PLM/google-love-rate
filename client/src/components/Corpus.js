import React, { Component } from 'react';
import api from '../api';
import './App.css';

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

  scoreMessage() {
    const evaluateScore = this.state.corpus.score;
    if (evaluateScore < 5) {
      return 'Need Optimisations';
    } else {
      return 'good';
    }
  }  


  render() {                
    return (
      <div className="corpus container">
        <h1>Analyse des mots clés</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.corpus.score}</td>
              <td>{this.scoreMessage()}</td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <thead>
            <tr>
              <th>Critères SEO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Balise title</td>
              <td>{this.state.corpus.title}</td>
            </tr>
            <tr>
              <td>Balise h1</td>
              <td>{this.state.corpus.h1}</td>
            </tr>
            <tr>
              <td>Position SEO</td>
              <td>{this.state.corpus.position}</td>
            </tr>
            <tr>
              <td>Longueur du contenu textuel</td>
              <td>{this.state.corpus.textLength}</td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <thead>
            <tr>
              <th>Liste des mots clés</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.corpus.keywords && this.state.corpus.keywords.map(keyword => (
              <tr>
                <td>{keyword.text}</td>
                <td>{keyword.relevance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Corpus;
