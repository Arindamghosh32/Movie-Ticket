// const jwt = require('jsonwebtoken');

// module.exports.isOwner = (req,res)=>{
//     try{
//       if(!req.cookies.token){
//         res.redirect('/');
//       }
//       const decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
//       const owner = ({email:decoded.email,id:decoded.id,role:decoded.role});

//       if(!user){
//         return res.redirect('/');
//       }
//       req.owner = owner
//       next();
//     }catch(err){
//      console.error(err);
//     }
// }

const jwt = require("jsonwebtoken");
module.exports.isOwner = (req,res,next)=>{
  try
  {
    if(!req.cookies.token)
    {
       return res.redirect('/');
    }
    const decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
    if(!decoded || decoded.role !== 'owner')
    {
        return res.redirect('/');
    }
    req.user = {
        id:decoded.id,
        email:decoded.email,
        role:decoded.role
    }
    next();
  }catch{
    console.error("Auth middleware error:",err);
  }
}