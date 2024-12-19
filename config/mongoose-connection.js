const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const config = require('config');
const {MongoClient,GridFSBucket} = require('mongodb');


mongoose.connect(`${config.get('MONGODB_URI')}/movieticket`,({
    useNewUrlParser:true,
    useUnifiedTopology:true
}))
.then(()=>{dbgr("The database is connected")})
.catch((err)=>{
console.log("There is some error connecting with mongodb",err)
});

//Function to get the gridfsbucket after the connection is established
function getGridFS(){
 const db = mongoose.connection.db;
 return new GridFSBucket(db,{bucketName:'uploads'});
}

module.exports = mongoose.connection
module.exports.getGridFS = getGridFS;


