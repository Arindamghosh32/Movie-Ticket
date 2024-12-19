const express = require('express');
const app = express();
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookiParser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const userRouter = require('./Routes/userRouter');


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',userRouter);

PORT = 3000

app.listen(PORT,()=>{
    console.log("The server is running on port 3000");
})