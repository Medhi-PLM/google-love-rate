const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {type: String, required: [true, "A firstname is required"]},
  lastname: {type:String, required: [true, "A lastname is required"]},
  email: {type: String, required: [true, "An email is required"]},
  password: String,
},{
  timestamps: { 
    createdAt: "createdAt", 
    updatedAt: "updatedAt"
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const User = mongoose.model('User', userSchema);
module.exports = User;