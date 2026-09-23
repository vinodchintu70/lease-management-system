const express=require("express");
const router=express.Router();
const Lease=require("../models/LeaseRequest");
const Property=require("../models/Property");

router.post("/request",async(req,res)=>{
 try{
  const {userId,propertyId}=req.body;
  const property=await Property.findById(propertyId);
  if(!property)return res.status(404).json({message:"Property not found"});
  if(property.status!=="Available")return res.status(400).json({message:"Property is not available"});
  const existing=await Lease.findOne({userId,propertyId,status:{$in:["Waiting","Accepted"]}});
  if(existing)return res.status(400).json({message:"You already requested this property"});
  const request=await new Lease({userId,propertyId,status:"Waiting",paymentStatus:"Pending"}).save();
  res.status(201).json({message:"Lease request submitted",request});
 }catch(e){res.status(500).json({message:e.message});}
});
router.get("/all",async(req,res)=>{
 try{res.json(await Lease.find().populate("userId","name email").populate("propertyId","title location rent deposit status").sort({createdAt:-1}));}
 catch(e){res.status(500).json({message:e.message});}
});
router.get("/user/:userId",async(req,res)=>{
 try{res.json(await Lease.find({userId:req.params.userId}).populate("propertyId","title location rent deposit propertyType").sort({createdAt:-1}));}
 catch(e){res.status(500).json({message:e.message});}
});
router.put("/accept/:id",async(req,res)=>{
 try{
  const r=await Lease.findById(req.params.id); if(!r)return res.status(404).json({message:"Lease request not found"});
  if(r.status!=="Waiting")return res.status(400).json({message:"Only waiting requests can be accepted"});
  const p=await Property.findById(r.propertyId); if(!p)return res.status(404).json({message:"Property not found"});
  if(p.status!=="Available")return res.status(400).json({message:"Property is no longer available"});
  r.status="Accepted"; await r.save(); p.status="Rented"; await p.save();
  res.json({message:"Lease request accepted"});
 }catch(e){res.status(500).json({message:e.message});}
});
router.put("/deny/:id",async(req,res)=>{
 try{
  const r=await Lease.findById(req.params.id); if(!r)return res.status(404).json({message:"Lease request not found"});
  if(r.status!=="Waiting")return res.status(400).json({message:"Only waiting requests can be denied"});
  r.status="Denied"; await r.save(); res.json({message:"Lease request denied"});
 }catch(e){res.status(500).json({message:e.message});}
});
router.put("/payment/:id",async(req,res)=>{
 try{
  const r=await Lease.findById(req.params.id); if(!r)return res.status(404).json({message:"Lease request not found"});
  if(r.status!=="Accepted")return res.status(400).json({message:"Lease must be accepted before payment"});
  if(r.paymentStatus==="Paid")return res.status(400).json({message:"Payment already completed"});
  r.paymentStatus="Paid";r.paymentDate=new Date();await r.save();
  res.json({message:"Payment completed successfully",request:r});
 }catch(e){res.status(500).json({message:e.message});}
});
module.exports=router;