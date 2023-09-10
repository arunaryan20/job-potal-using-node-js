const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    var { firstName, lastName, email, password } = req.body
    if (!firstName) {
      res
        .status(400)
        .json({ success: false, message: 'please provide First Name' })
    }
    if (!lastName) {
      res
        .status(400)
        .json({ success: false, message: 'please provide Last Name' })
    }
    if (!email) {
      res.status(400).json({ success: false, message: 'please provide email' })
    }
    if (!password) {
      res
        .status(400)
        .json({ success: false, message: 'please provide password' })
    }

    const emailExist = await userModel.findOne({ email: email })
    if (emailExist) {
      res
        .status(200)
        .json({ success: true, message: 'This email is already exist' })
    } else {
      try {
      
        bcrypt.genSalt(10, async function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              res.status(401).json('Password error')
            } else {
              password = hash
             const user = await userModel.create({
                firstName,
                lastName,
                email,
                password
              })
              res.status(201).json({
                success: true,
                message: 'User created successfully',
                user:{
                  firstName:user.firstName,
                  lastName:user.lastName,
                  email:user.email,
                  location:user.location,
                }
              })
            }
          })
        })
      } catch (error) {
        console.log('error------>', error)
      }
    }
  } catch (error) {
    // next(error)
    res.status(400).json({
      message: 'register controller not working',
      error: error
    })
  }
}

const loginController=async(req,res)=>{
      try{
            const data=await userModel.findOne({email:req.body.email});
            if(data){
                const isMatch=await bcrypt.compare(req.body.password,data.password);
              if(isMatch){
                jwt.sign({data},"secretkey",{expiresIn:'1d'}, function(err, token) {
                     if(err){
                      res.status(200).json({success:true,message:"login token generating error",error:err})
                     }else{
                      res.status(200).json({success:true,message:"login successfull",token:token,data:data})
                     }
                });
              }else{
                res.status(200).json({success:true,message:"passoword is not matching"})
              }
            }else{
              res.status(200).json({success:true,message:"User does not exit"})
            }       
                
      }catch(error){
        res.status(404).json({
          success:false,
          message:"Login Controller error"
        })
      }
}

module.exports = {registerController,loginController}
