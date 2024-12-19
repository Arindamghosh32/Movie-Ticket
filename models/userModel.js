const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:{
        type:String
    },
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user','owner'],
        default:'user'
    },
    booked:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'movie',
        default:[]
    }]
});

module.exports = mongoose.model('user',userSchema);