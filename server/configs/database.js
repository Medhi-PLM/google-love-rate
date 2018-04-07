'use strict';

const mongoose = require('mongoose');
const dbName = 'google-love-rate';
const mongoURI = process.env.mondoDBURI || `mongodb://localhost/${dbName}`

// connect to the database
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {  
  console.log(`Connected to ${mongoURI}`);
});