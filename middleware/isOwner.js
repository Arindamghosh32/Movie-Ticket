const jwt = require('jsonwebtoken');

module.exports.isOwner = (req,res)=>{
    try{
      if(!req.cookies.token){
        res.redirect('/');
      }
      const decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
      const owner = ({email:decoded.email,id:decoded.id,role:decoded.role});

      if(!user){
        return res.redirect('/');
      }
      req.owner = owner
      next();
    }catch(err){
     console.error(err);
    }
}