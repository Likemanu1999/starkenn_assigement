const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlength : 8 ,
        maxlength : 15 ,
        trim: true
    },
         
});
module.exports = mongoose.model('users', UserSchema)
