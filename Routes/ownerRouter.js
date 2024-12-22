const express = require('express');
const router = express.Router();
const moviesModel = require('./../models/moviesModel');

router.get('/create',(req,res)=>{
    res.render('Create');
});

router.post('/created',async(req,res)=>{
    try{
        const created = await moviesModel.create(req.body);
        res.status(201).json(created);
    }catch(error){
       res.status(400).json({error: error.message});
    }  
})

module.exports = router;