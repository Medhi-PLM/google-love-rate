const mongoose = require('mongoose');
const Corpus = require('./corpus');
const Schema = require('mongoose').Schema;

const campaignSchema = new Schema({  
  name: {
    type: String,
    required: [true, 'The name of the campaign is required']
  },
  keyword: {
    type: String,
    required: [true, 'The main keyword is required']
  },
  text: String,
  URL: String,
  analysis: [{ type: Schema.Types.ObjectId, ref: 'Corpus' }],
  _creator: { type: Schema.Types.ObjectId, ref: 'User'},
  },{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;