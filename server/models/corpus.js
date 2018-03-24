const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const Suggestion = require('./suggestion');
const Competitor = require('./competitor');

const corpusSchema = new Schema({  
  text: String,
  URL: String,
  h1: String,
  title: String,
  position: Number,
  textLength: Number,
  keywords: [],
  score: Number,
  suggestions: [{type: Schema.Types.ObjectId, ref: 'Suggestion'}],
  competitors: [{type: Schema.Types.ObjectId, ref: 'Competitor'}]
},{
    timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Corpus = mongoose.model('Corpus', corpusSchema);

module.exports = Corpus;