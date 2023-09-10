const express=require("express");
const authController = require("../controllers/authController");
const auth_router=express.Router();

auth_router.post("/register",authController.registerController);
auth_router.post("/login",authController.loginController)

module.exports=auth_router;