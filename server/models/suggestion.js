const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
//Need Competitor Model
const suggestionSchema = new Schema({
    title: String,
    h1: String,
    textLength: Number,
    keywords: [],
    synonyms: [],
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
module.exports = Suggestion;