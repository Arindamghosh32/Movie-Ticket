const express = require('express');
const app = express();
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookiParser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const AuthRouter = require('./Routes/AuthRouter');
const userRouter = require('./Routes/userRouter');
const ownerRouter = require('./Routes/ownerRouter');
//require dotenv.config is necessary because it uses all the config file without requiring manually
require('dotenv').config();
console.log('JWT_SECRET:',process.env.JWT_KEY);

app.set("view engine","ejs");
app.use(cookiParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
}));


app.use('/',AuthRouter);
app.use('/user',userRouter);
app.use('/owner',ownerRouter);



PORT = 3000

app.listen(PORT,()=>{
    console.log("The server is running on port 3000");
})