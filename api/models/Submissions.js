import mongoose from "mongoose";
const SubmissionSchema = new mongoose.Schema({
    owner: {
        type: String,
    },
    name: {
        type: String,  
    },
    language:String,
    result:String,
    submittedAt:String,
    
})
const Submission = mongoose.model('Submission',SubmissionSchema);
export default Submission;