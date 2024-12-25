const jwt = require('jsonwebtoken');

module.exports.isLoggedin = (req,res,next)=>{
   try{
      if(!req.cookies.token){
        return res.redirect('/')
      }
      const decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
      const user = {email:decoded.email,id:decoded.id,role:decoded.role}
      if(!user){
        console.log('The user is not found');
        return res.redirect('/');
      }

      req.user = user;
      next();
   }catch(err){
    console.log('There is some error',err);
    return res.redirect('/');
   }

}