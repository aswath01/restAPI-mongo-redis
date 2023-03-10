const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : false
    },
    phone : {
        type : Number,
        required : true
    }
});

const User  = mongoose.model('user', UserSchema);

module.exports = User;