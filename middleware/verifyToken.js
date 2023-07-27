
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
      
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET, async (err,Decoded)=>{
            if(err)  res.status(403).json('Invalid token')

            req.user = await User.findById(Decoded.id);

            console.log(Decoded.id)

            next();
       })
     }else{
        return res.status(401).json("You are not authenicated")   
        }
    };

    const verifyAndAuthorization = (req,res,next)=>{
       verifyToken(req, res , ()=> {
        if(req.user.id === req.params.id){
            next();
        }else{
            res.status(403).json("You are restricted from performaing this operation")
        }
       })
    };

    const verifyAndAdmin = (req,res,next)=>{
        verifyToken(req, res , ()=> {
         if(req.user.isAdmin){
             next();
         }else{
             res.status(403).json("You are restricted from performaing this operation")
         }
        })
     }
 


module.exports = {verifyToken, verifyAndAuthorization,verifyAndAdmin };
