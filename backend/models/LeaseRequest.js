const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 propertyId:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
 status:{type:String,enum:["Request","Waiting","Accepted","Denied"],default:"Waiting"},
 paymentStatus:{type:String,enum:["Pending","Paid"],default:"Pending"},
 requestDate:{type:Date,default:Date.now},
 paymentDate:Date
},{timestamps:true});
module.exports=mongoose.model("LeaseRequest",schema);