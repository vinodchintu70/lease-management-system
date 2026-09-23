const express=require("express");
const router=express.Router();
const User=require("../models/User");

router.post("/register",async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(await User.findOne({email})) return res.status(400).json({message:"Email already registered"});
  const user=await new User({name,email,password}).save();
  res.status(201).json({message:"Registration successful",user});
 }catch(e){res.status(500).json({message:e.message});}
});
router.post("/login",async(req,res)=>{
 try{
  const {email,password}=req.body;
  const user=await User.findOne({email,password});
  if(!user)return res.status(401).json({message:"Invalid email or password"});
  res.json({message:"Login successful",user});
 }catch(e){res.status(500).json({message:e.message});}
});
router.get("/all",async(req,res)=>{
 try{res.json(await User.find().select("-password"));}catch(e){res.status(500).json({message:e.message});}
});
module.exports=router;