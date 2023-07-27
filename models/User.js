const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        username:{type:String, required:true,unique:true,},
        email:{type:String, required:true,unique:true,},
        password:{type:String, required:true,},
        location:{type:String, required:false,},
        isAdmin:{type:String, default:false,},
        isAgent:{type:String, default:false,},
        skills:{type:String, default:false,},
        userToken: { type: String },
        profile:{type:String, required:false,default:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",},
    },{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);