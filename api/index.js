import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ygfyugwefyfuew78wefg8wef7';

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
app.use(express.json());
app.use(cookieParser());
app.get("/test",function(req,res){
    res.json("test ok");
})

mongoose.connect(process.env.MONGO_URL);


app.post('/register', async (req,res)=>{
    const{name,email,password}=req.body;
    try {
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }catch(e){
        res.status(422).json(e)
    }
    
});

app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    const UserDocument=await User.findOne({email})
    if(UserDocument){
        const passOk=bcrypt.compareSync(password,UserDocument.password);
        if(passOk){
            jwt.sign({email:UserDocument.email, id:UserDocument._id},jwtSecret, {}, (err,token) =>{
                if(err) throw err;
                res.cookie('token',token).json(UserDocument);
            })
        }else{
            res.status(422).json("pass not ok")
        }
    }
    else{
        res.json("not found");
    }
})
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
            if(err) throw err;
            const {name,email,_id}=await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
})
app.listen(4000);