const express = require('express');
const router = express.Router();
const userModel = require('./../models/userModel');

router.get('/',(req,res)=>{
    res.render("Login");
});

router.post('/user/register',(req,res)=>{
    try{
        const {fullname,email,password,role} = req.body;
    userModel.create({
        fullname:fullname,
        email:email,
        password:password,
        role:role
    })
    }catch(err){
      console.log("There is an error registering the user");
    }
    
})

module.exports = router;
