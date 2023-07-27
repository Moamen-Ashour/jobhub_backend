const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req,res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:  CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),
        });

        try{
            const savedUser = await newUser.save();

            res.status(201).json(savedUser);
        }catch(error){
            res.status(500).json(error)
        }
    },

    loginUser: async (req,res)=>{
        try{
          const user = await User.findOne({email: req.body.email});
        if(!user) res.status(401).json("Wrong Login Details");
           const decryptedpass = CryptoJS.AES.decrypt(user.password,process.env.SECRET);
           const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);
           
           depassword !== req.body.password && res.status(401).json("Wrong Password My Friend");

           const {password, __v, createdAt, ...others} = user._doc;
           
           try {
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" });
            res.status(201).json({ userToken, ...others });
          } catch (err) {
            console.error(err);
            res.status(500).send('Error signing token');
          }


           
        }catch(error){
            res.status(500);
        }
    }
}



