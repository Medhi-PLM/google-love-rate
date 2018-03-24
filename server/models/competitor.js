const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const competitorSchema = new Schema({
    URL: String,
    Score: Number,
    Position: Number,
    textLength: Number,
    title: String, 
    h1: String,
    keywords: [],
    synonyms: []
});

const Competitor = mongoose.model('Competitor', competitorSchema);
module.exports = Competitor;