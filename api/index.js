import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";
const app=express();
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ygfyugwefyfuew78wefg8wef7';

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.get("/test",function(req,res){
    res.json("test ok");
})

mongoose.connect(process.env.MONGO_URL);


app.post('/register', async (req,res)=>{
    const{name,email,username,password}=req.body;
    try {
        const userDoc=await User.create({
            name,
            email,
            username,
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
            const {name,email,username,_id}=await User.findById(userData.id);
            res.json({name,email,username,_id});
        });
    }else{
        res.json(null);
    }
})
app.post('/run',async(req,res)=>{
    const{language,code}=req.body;
    if(code===undefined || code===""){
        return res.status(400).json({success:false,error:"empty code body"})
    }
    const filePath=await generateFile(language,code);
    const output=await executeCpp(filePath);
    res.json(output);
})
app.post('/logout', (req,res) => {
    res.cookie('token','').json(true);
}); 
app.listen(4000);