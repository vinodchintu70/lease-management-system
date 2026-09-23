const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 title:{type:String,required:true},
 location:{type:String,required:true},
 propertyType:{type:String,required:true},
 rent:{type:Number,required:true},
 deposit:{type:Number,required:true},
 bedrooms:{type:Number,required:true},
 description:String,
 status:{type:String,default:"Available"}
},{timestamps:true});
module.exports=mongoose.model("Property",schema);