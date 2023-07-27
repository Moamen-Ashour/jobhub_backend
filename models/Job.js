const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        location:{type:String, required:false},
        description:{type:String, required:false},
        company:{type:String, required:false},
        salary:{type:String, required:false},
        period:{type:String, required:false},
        contract:{type:String, required:false},
        requiements:{type:String, required:false},
        imageUrl:{type:String, required:false},
        agentId:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:false},
    },{timestamps:true}
);

module.exports = mongoose.model("Job", JobSchema);