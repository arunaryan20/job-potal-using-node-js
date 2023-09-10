const mongoose=require("mongoose");

const jobsSchema=new mongoose.Schema({
       company:{
           type:String,
           require:[true,"Company name is required"]
       },
       position:{
        type:String,
        require:[true,"Job position is required"],
        minlength:10
       },
       status:{
        type:String,
        enum:["pending","reject","interview"],
        default:"pending"
       },
       workType:{
        type:String,
        enum:["full-time","part-time","internship","contract"],
        default:"full-time"
       },
       workLocatoin:{
        type:String,
        default:"Gurgaon",
        require:[true,"Job location is required"]
       },
       createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
       }
},
{timestamps:true})

module.exports=mongoose.model("Job",jobsSchema)