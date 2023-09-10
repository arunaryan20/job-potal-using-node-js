const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:[true,"First Name is required"]
    },
    lastName:{
        type:String,
        require:[true,"Last Name is required"]
    },
    email:{
        type:String,
        require:[true,"Email is require"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
    location:{
        type:String,
        default:"India"
    }
},
{timestamps:true}
);

// userSchema.pre('save',async function(){
//    const salt=await bcrypt.getSalt(10);
//    this.password=await bcrypt.hash(this.password,salt);
// })

module.exports=mongoose.model('User',userSchema);