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
    },
    seating: [
        {
            row: {
                type: String, // e.g., "A", "B", "C"
                required: true
            },
            seats: [
                {
                    seatingNumber: {
                        type: String, // e.g., "1", "2", "3"
                        required: true
                    },
                    type: {
                        type: String,
                        enum: ['standard', 'vip', 'deluxe'],
                        default: 'standard'
                    },
                    status: {
                        type: String,
                        enum: ['available', 'selected', 'booked'],
                        default: 'available'
                    },
                    selectedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('movie',moviesSchema);