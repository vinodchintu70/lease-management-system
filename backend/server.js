require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const propertyRoutes=require("./routes/propertyRoutes");
const leaseRoutes=require("./routes/leaseRoutes");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch(err=>console.log("MongoDB connection error:",err));

app.use("/users",userRoutes);
app.use("/admin",adminRoutes);
app.use("/properties",propertyRoutes);
app.use("/lease",leaseRoutes);

app.get("/",(req,res)=>res.json({message:"Lease Management API is running"}));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));