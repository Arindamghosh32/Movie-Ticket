const express = require('express');
const router = express.Router();
const moviesModel = require('./../models/moviesModel');
const { isOwner } = require('./../middleware/isOwner');
router.get('/create',isOwner,(req,res)=>{
    res.render('Create');
});    

router.post('/created',isOwner,async(req,res)=>{
    try{
        const movieData = {
            ...req.body,
            owner: req.user.id
        }
        const created = await moviesModel.create(movieData);
        res.status(201).json(created);
    }catch(error){
       res.status(400).json({error: error.message});
    }  
})

//Get route to render the owners dashboar
router.get('/dashboard',isOwner,async(req,res)=>{
    try{
       const ownerMovies = await moviesModel.find({owner:req.user.id});
       res.render('ownerdash',{movies:ownerMovies})
    }catch(error)
    {
      console.error("Dashboard error",error);
      res.status(500).send("ServerError");
    }
})

// POST route to securely delete a movie
router.post('/movie/delete/:id', isOwner, async (req, res) => {
    try {
        // Find the movie by ID AND make sure the owner ID matches the logged-in user's ID
        // This stops Owner A from tricking the system into deleting Owner B's movie
        const deletedMovie = await moviesModel.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!deletedMovie) {
            return res.status(404).send("Movie not found or unauthorized access.");
        }

        // After deleting, refresh the dashboard page for them
        res.redirect('/owner/dashboard');
    } catch (error) {
        console.error("Deletion error:", error);
        res.status(500).send("Server Error: Unable to remove movie.");
    }
});

module.exports = router;