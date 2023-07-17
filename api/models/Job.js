import mongoose from "mongoose";
const {Schema} = mongoose;
const JobSchema= new Schema({
    language:{
        type: String,
        required: true,
        enum:["cpp","py","c","C++"],
    },
    filePath:{
        type: String,
        required: true,
    },
    submittedAt:{
        type: Date,
        default:Date.now,
    },
    startedAt:{
        type: Date,
    },
    finishedAt:{
        type: Date,
    },
    output:{
        type:String,
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","success","error"],
    }
});

const Job = mongoose.model('Job',JobSchema);
export default Job;