const express = require('express');
const router = express.Router();
const moviesModel = require('./../models/moviesModel');
const User = require('./../models/userModel');

const { isLoggedin } = require('./../middleware/isLoggedin');

router.get('/home',isLoggedin,async(req,res)=>{
    const movies = await moviesModel.find();
    res.render('Home',{movies});
    console.log('The movies data sent in home is',movies);
});

router.get('/book/:id',isLoggedin,async(req,res)=>{
    console.log("User in Booking route",req.user);
   try{
      const movie = await moviesModel.findById(req.params.id);
      if(!movie){
         return res.status(404).send("The movie is not found");
      }
      res.render('Booking',{
        movie,
        userId: req.user.id
      });
   }catch(e){
      console.error(e);
   }
})

router.post("/update-seats/:movieId", async (req, res) => {
   try {
       const { movieId } = req.params;
       const { selectedSeats, userId } = req.body;

       if(userId){
        console.log(userId);
       }else{
        console.log("The userId is not been passed in the page");
       }

       console.log("Received Booking Request:", {movieId,selectedSeats,userId});//debugging
       if (!selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {//changed
           return res.status(400).json({ success: false, message: "No seats selected" });
       }

       // Find movie
       const movie = await moviesModel.findById(movieId);
       if (!movie) {
           return res.status(404).json({ success: false, message: "Movie not found" });
       }

       // Find user
       const user = await User.findById(userId);
       if (!user) {
           return res.status(404).json({ success: false, message: "User not found" });
       }

       
//changed
       let seatsUpdated = 0;
       selectedSeats.forEach(selectedSeat => {
        const row = movie.seating.find(r => r.row === selectedSeat.row); // Find correct row
        if (row) {
            const seat = row.seats.find(s => s.seatingNumber == selectedSeat.seat); // Find correct seat
            if (seat && seat.status === "available") {
                seat.status = "booked";
                seatsUpdated++;
            }
        }
    });//changed

       if (seatsUpdated === 0) {
           return res.status(400).json({ success: false, message: "No available seats found to book" });
       }

       movie.markModified("seating");//i have modified to use markModified to track the modifications in the nested seating

       // Save updated movie
       await movie.save();

       // Update user's booked movies
       if (!user.booked.includes(movieId)) {
           user.booked.push(movieId);
           await user.save();
       }

       res.json({ success: true, message: "Seats booked successfully!" });

   } catch (error) {
       console.error("Error:", error);
       res.status(500).json({ success: false, message: "Server error", error: error.message });
   }
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