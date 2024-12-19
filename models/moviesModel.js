const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
    moviename:{
        type:String
    },
    movieprice:{
        type:Number
    },
    movieimage:{
        type:String
    },
    movieAbout:{
        type:String
    },
    movieDate:{
        type:Date
    }
});

module.exports = mongoose.model('movie',moviesSchema);