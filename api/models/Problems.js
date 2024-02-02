import mongoose from "mongoose";
const ProblemSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,  
    },
    statement: String,
    inputformat:String,
    outputformat:String,
    sampleInput: String,
    sampleOutput: String,
    inbuiltinput:{
        type: String,
        required: true,
    },
    inbuiltoutput:{
        type: String,
        required: true,
    },
    difficulty: {
        type: String, 
        default: "Easy"
    },
    numberOfSolves: {
        type: Number,
        default: 0
    },
    solvers: {
        type: [String],
        default: []    
    }
})
const Problem = mongoose.model('Problem',ProblemSchema);
export default Problem;