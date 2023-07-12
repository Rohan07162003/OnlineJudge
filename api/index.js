import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app=express();
dotenv.config();
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
app.use(express.json());
app.get("/test",function(req,res){
    res.json("test ok");
})

//5rOFoCpX2t4tvr3a
//2nd password-ijqUdVQ2q6hsjPx4

app.post("/register",function(req,res){
    const {name,email,password}=req.body;
    res.json({name,email,password});
})
app.listen(4000);