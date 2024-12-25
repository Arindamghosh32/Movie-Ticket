const express = require('express');
const router = express.Router();
const { isLoggedin } = require('./../middleware/isLoggedin');

router.get('/home',isLoggedin,(req,res)=>{
    res.render('Home');
})

module.exports = router;