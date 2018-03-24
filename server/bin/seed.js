const mongoose = require('mongoose');
const User = require('../models/user');

require('../configs/database');



User.create([{
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'passowrd'
}, {
    firstname: 'Medhi',
    lastname: 'Doe',
    email: 'medhi.doe@gmail.com',
    password: 'pass'
}
])