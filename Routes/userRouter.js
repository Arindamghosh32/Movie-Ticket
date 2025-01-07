const express = require('express');
const router = express.Router();
const moviesModel = require('./../models/moviesModel')
const { isLoggedin } = require('./../middleware/isLoggedin');

router.get('/home',isLoggedin,async(req,res)=>{
    const movies = await moviesModel.find();
    res.render('Home',{movies});
    console.log('The movies data sent in home is',movies);
});

router.get('/movie/:id',async(req,res)=>{
  const movieId = req.params.id;
  try{
     const movie = await moviesModel.findById(movieId);
     if(movie){
        res.render("Movie",{movie});
     }else{
        console.log("There is an error storing the data");
     }
  }catch(e){
    console.error(e);
  }
})

module.exports = router;