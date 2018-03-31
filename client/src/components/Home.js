import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import AddCampaigns from './AddCampaigns';
import api from '../api';
import competition from '../competition.png';
import analysis from '../analysis.png';
import suggest from '../suggest.png';
import competitor from '../competitor.jpg';
import overview from '../overview.png';
import writing from '../writing.jpg';
import './App.css';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {   
    console.log(process.env)             
    return (
      //Bulma content
      <div>
        <section class="bg-img catchphrase container is-fullhd has-text-centered">
            <div class="titleHome">Votre outil indispensable</div> 
            <div class="titleHome">pour enrichir vos contenus SEO</div>
              <div class="items">
                <span class="callToAction">
                  <Link class="button is-success" to="/add-campaigns">Lancez votre campagne</Link>
                </span>
                <span class="callToAction">
                  {!api.isLoggedIn() && <Link class="button is-success" to="/signup">Créez votre compte</Link> }
                </span>
              </div>
        </section>
        <section class="gray">
          <h3>Découvrez les principales fonctionnalités</h3>
          <div class="features">
            <div class="oneFeature">
              <img class="keyword" src={analysis} style={{height: 80 +'px'}}/>
              <h2 class="keyword">Analyse de textes</h2>
            </div>
            <div class="oneFeature">
              <img class="keyword" src={suggest} style={{height: 80 +'px'}}/>
              <h2 class="keyword">Suggestions de mots clés</h2>
            </div>
            <div class="oneFeature">
              <img class="keyword" src={competition} style={{height: 80 +'px'}}/>
              <h2 class="keyword">Analyse de la concurrence</h2>
            </div>
          </div>
        </section>

        <h6>Travaillez avec Google Love Rate</h6>
        <div class="features">
          <div class="card orange">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={overview} alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <h5>Analyse</h5>
              <div class="content">
                Renseignez l'URL de la page à analyser puis lancer votre recherche.
                Vous obtiendrez une liste des mots clés actuels de votre texte.
              </div>
            </div>
          </div>
          <div class="card red">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={competitor} alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <h5>Benchmark</h5>
              <div class="content">
                Analysez les pages de vos concurrents positionnées sur les mêmes mots clés que vous.
                Vous obtiendrez de puissants insights.
              </div>
            </div>
          </div>
          <div class="card marron">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={writing} alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <h5>Suggestions</h5>
              <div class="content">
                Notre mission est de vous aider à optimiser vos contenus textuels.
                Vous boosterez vos contenus et augmenterez vos positions.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
