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
    },
    Location:{
        type:String
    },
    genre:{
        type:String,
        enum:['Thriller','Action','Comedy','Romentic'],
        default:'Action'
    }
});

module.exports = mongoose.model('movie',moviesSchema);