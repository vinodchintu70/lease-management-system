const express=require("express");
const router=express.Router();
const Property=require("../models/Property");

router.post("/add",async(req,res)=>{
 try{const property=await new Property(req.body).save();res.status(201).json({message:"Property added successfully",property});}
 catch(e){res.status(500).json({message:e.message});}
});
router.get("/all",async(req,res)=>{
 try{res.json(await Property.find().sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}
});
router.get("/available",async(req,res)=>{
 try{res.json(await Property.find({status:"Available"}));}catch(e){res.status(500).json({message:e.message});}
});
router.get("/:id",async(req,res)=>{
 try{const p=await Property.findById(req.params.id);if(!p)return res.status(404).json({message:"Property not found"});res.json(p);}
 catch(e){res.status(500).json({message:e.message});}
});
router.put("/update/:id",async(req,res)=>{
 try{const p=await Property.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:"Property not found"});res.json({message:"Property updated successfully",property:p});}
 catch(e){res.status(500).json({message:e.message});}
});
router.delete("/delete/:id",async(req,res)=>{
 try{const p=await Property.findByIdAndDelete(req.params.id);if(!p)return res.status(404).json({message:"Property not found"});res.json({message:"Property deleted successfully"});}
 catch(e){res.status(500).json({message:e.message});}
});
module.exports=router;