const express=require("express");
const router=express.Router();
const Admin=require("../models/Admin");

router.post("/create",async(req,res)=>{
 try{
  const {username,password}=req.body;
  if(await Admin.findOne({username}))return res.status(400).json({message:"Admin already exists"});
  const admin=await new Admin({username,password}).save();
  res.status(201).json({message:"Admin created successfully",admin});
 }catch(e){res.status(500).json({message:e.message});}
});
router.post("/login",async(req,res)=>{
 try{
  const {username,password}=req.body;
  const admin=await Admin.findOne({username,password});
  if(!admin)return res.status(401).json({message:"Invalid admin credentials"});
  res.json({message:"Admin login successful",admin});
 }catch(e){res.status(500).json({message:e.message});}
});
module.exports=router;