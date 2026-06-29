const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generatewebtoken} = require('../utils/generatewebtoken');
const {isLoggedin} = require('./../middleware/isLoggedin');

router.get('/',(req,res)=>{
    res.render("Login");
});

router.post('/register',async(req,res)=>{
    try{
        const {fullname,email,password,role} = req.body;

        const existingUser = await userModel.findOne({email})
        if(existingUser){
          return  res.status(400).send("The User is already created.Please Login!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword,
        role
    });

    const token = generatewebtoken(user);
    res.cookie("token",token);

    return res.status(201).send({
        message:"The user created successfully",
        user: {fullname:user.fullname,email:user.email,role:user.role}
    });
    }catch(err){
      console.log("================ REGISTRATION ERROR ================");
    console.error(err);
    console.log("====================================================");
    return res.status(500).send("Registration failed internal error.");
    }
    
});

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        console.log("Please Fill Your Details");
        return res.status(401).send("Invalid email or password");
    }
    const match = await bcrypt.compare(password,user.password);
    if(match){
      const token = generatewebtoken(user);
      res.cookie("token",token);
      if(user.role === 'user'){
        res.redirect('/user/home');
      }else{
        res.redirect('/owner/create');
      }
    }
});


router.get('/logout',isLoggedin,(req,res)=>{
  res.clearCookie("token");
  res.redirect('/');
})


module.exports = router;
