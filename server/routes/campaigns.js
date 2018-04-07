const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Campaign = require('../models/campaign');
const config = require('../config');
const Corpus = require('../models/corpus');
const passport = require('passport');

const watsonConfig = require('../configs/watson')["natural-language-understanding"][0].credentials;

const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  username: watsonConfig.username,
  password: watsonConfig.password,
  version: '2017-02-27',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

const axios = require('axios');

//Parse the URL content
const cheerio = require('cheerio');

//Retrieve the JavaScript content
const phantom = require('phantom');

//CRUD Campaign
router.get('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Campaign.find({_creator:  req.user._id})
  .then(campaigns => {
    res.json(campaigns);    
  })
});

//Create Campaign
router.post('/new', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  const {name, keyword, text, URL} = req.body;
  let newCampaign;
  if(text) {
    newCampaign =  new Campaign({
      name,
      keyword,
      text,
      _creator: req.user._id,
    });
  } else {
    newCampaign = new Campaign({
      name,
      keyword,
      URL,
      _creator: req.user._id,
    });
  }
  newCampaign.save((err) => {
    if(err) {
      res.json({success: false, msg: 'Campaign already exists.'});
    }
    else {
      res.json({success: true, newCampaign});
    }
  })
});

//Read Campaign
router.get('/:id', (req, res,next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    if(err) {return next(err);}

    campaign.populate('_creator', (err, campaign) => {
      if (err){ return next(err); }
      return res.json({success: 'Read campaign ID', campaign});
    });
  });
});

//Edit Campaign
//Delete Campaign


//Analysis campaign
//List of Analysis
router.get('/:id/analysis', (req, res, next) => {
  Corpus
  .findById(req.params.id)
  .then(corpus => {
    res.json({success: 'List of Corpus', corpus});
  })
  .catch((err) => {
    res.status(300).json({success: false});
  });
});

//Analysis campaign
//List of Analysis
router.post('/:id/analysis', (req, res, next) => {
  console.log(req.params.id);
  Campaign
  .findById(req.params.id)
  .then(campaign => {
    //Nouveau corpus

    (async function() {
      const instance = await phantom.create();
      const page = await instance.createPage();
      await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
      });
      
      console.log('hellllllo', campaign)
      const status = await page.open(campaign.URL);
      const content = await page.property('content');
      console.log(content);
      const $ = cheerio.load(content)
      console.log('Mon H1 !!!!!', $('h1').text());
      console.log('Mon Title !!!!!', $('title').text());
      nlu.analyze(
        {
          html: $('h1').text() + $('p').text() + $('title').text(),
          features: {
          concepts: {},
          keywords: {}
          }
        },
      
        function(err, response) {
  
          if (err) {
            console.log('error:', err);
            res.json(err);
          } else {
            console.log(JSON.stringify(response, null, 2));
            var myScore;
            var myH1 = $('h1').text();
            var myTitle = $('title').text();
            if (myH1.includes(campaign.keyword) && myTitle.includes(campaign.keyword)) {
              myScore = 10;
            } else {
              myScore = 0;
            }
            console.log('heloo', campaign);
            newCorpus = new Corpus ({
              URL: campaign.URL, 
              h1: $('h1').text(),
              title: $('title').text(),
              keywords: response.keywords,
              position: 3,
              textLength: content.length,
              score: myScore
            })
            newCorpus.save((err, corpus) => {
              campaign.analysis.push(newCorpus._id);
        
              campaign.save()          
              res.json(corpus);
            })
          }
        });
      await instance.exit();
    })();
  });
});

//Analyze text -- Route Analysis
//Get the data from the form
/*router.get('/test', (req, res, next) => {

  (async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
      console.info('Requesting', requestData.url);
    });
    
    const status = await page.open('https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50');
    const content = await page.property('content');
    console.log(content);
    const $ = cheerio.load(content)
    console.log('Mon H1 !!!!!', $('h1').text());
    console.log('Mon Title !!!!!', $('title').text());
    nlu.analyze(
      {
        html: $('h1').text() + $('p').text() + $('title').text(),
        features: {
        concepts: {},
        keywords: {}
        }
      },


    
      function(err, response) {

        if (err) {
          console.log('error:', err);
          res.json(err);
        } else {
          console.log(JSON.stringify(response, null, 2));
          if (//text is not null) {
            newCorpus = new Corpus ({
              text:,
              h1:,
              title:,
              position:,
              textLength:,
              score:
            })
          } else {
            newCorpus = new Corpus ({
              URL:, 
              h1:,
              title:,
              position:,
              textLength,
              score:
            })

          }
          res.json(response);
        }
      }
      );
    await instance.exit();
  })();
    
});*/


module.exports = router;