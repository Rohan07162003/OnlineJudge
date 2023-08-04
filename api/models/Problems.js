import mongoose from "mongoose";
const ProblemSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,  
        unique: true
    },
    statement: String,
    inputformat:String,
    outputformat:String,
    sampleInput: String,
    sampleOutput: String,
    inbuiltinput:{
        type: String,
        required: true,
    } 
})
const Problem = mongoose.model('Problem',ProblemSchema);
export default Problem;