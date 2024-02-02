import mongoose from "mongoose";
const {Schema} = mongoose;
const UserSchema= new Schema({
    name:String,
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    role:String,
    password:String,
    numberOfSolves: {
        type: Number,
        default: 0
    },
    numberOfSubmissions: {
        type: Number,
        default: 0        
    },
    problemsSolved: {
        type: [String],
        default: []
    }
});

const User = mongoose.model('User',UserSchema);
export default User;