import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Problem from "./models/Problems.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";
import executePy from "./executePy.js";
const app = express();
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ygfyugwefyfuew78wefg8wef7';

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/test", function (req, res) {
    res.json("test ok");
})

mongoose.connect(process.env.MONGO_URL);


app.post('/register', async (req, res) => {
    const { name, email, username, role, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            username,
            role,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e)
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const UserDocument = await User.findOne({ email })
    if (UserDocument) {
        const passOk = bcrypt.compareSync(password, UserDocument.password);
        if (passOk) {
            jwt.sign({ email: UserDocument.email, id: UserDocument._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(UserDocument);
            })
        } else {
            res.status(422).json("pass not ok")
        }
    }
    else {
        res.json("not found");
    }
})
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, username, role, _id } = await User.findById(userData.id);
            res.json({ name, email, username, role, _id });
        });
    } else {
        res.json(null);
    }
})
app.post('/run', async (req, res) => {
    const { language, code,input } = req.body;
    if (code === undefined || code === "") {
        return res.status(400).json({ success: false, error: "empty code body" })
    }
    let job;
    try {
        const filePath = await generateFile(language, code);
        job=await new Job({language,filePath}).save();
        const jobId=job["_id"];
        console.log(job);
        res.status(201).json({success:true,jobId});
        job["startedAt"]=new Date();
        if(language==="py"){
            const output= await executePy(filePath);
            //res.json({output,filePath});
            //console.log({filePath,output});
            job["output"]=output;
        }
        else{
            const output2= await executeCpp(filePath,input);
            //console.log({filePath,output2});
            job["output"]=output2;
            //res.json({output2,filePath});
        }
        job["finishedAt"]=new Date();
        job["status"]="success";
        await job.save();
        console.log(job);
        
    } catch (err) {
        job["finishedAt"]=new Date();
        job["status"]="error";
        job["output"]=JSON.stringify(err);
        await job.save();
        //res.status(500).json({ err });
        console.log(job);
    }
})
app.get("/status", async(req,res)=>{
    const jobId=req.query.id;
    console.log("status requested",jobId);
    if(jobId===undefined){
        return res.status(400).json({success:false, error:"missing id query"});
    }
    //console.log(jobId);
    try{
        const job=await Job.findById(jobId);
        if(job===undefined){
            return res.status(404).json({success:false,error:"invalid job id"});
        }
        res.status(200).json({success: true ,job});
    }catch(err){
        return res.status(400).json({success:false,error:JSON.stringify(err)});
    }
})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});
app.post('/problems',(req,res)=>{
    const{token} = req.cookies;
    const {name,statement,inputformat,outputformat,sampleInput,sampleOutput,inbuiltinput}=req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
        if(err) throw err;
        const problemDoc =await Problem.create({
            owner:userData.id,
            name,
            statement,
            inputformat,
            outputformat,
            sampleInput,
            sampleOutput,
            inbuiltinput
        })
        res.json(problemDoc);
    });
})
app.get('/problems',async(req,res)=>{
    res.json( await Problem.find() )
})
app.get('/problems/:id',async (req,res)=>{
    const {id}=req.params;
    res.json(await Problem.findById(id));
});
app.listen(4000);