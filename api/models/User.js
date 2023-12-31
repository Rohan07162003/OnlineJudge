import mongoose from "mongoose";
const {Schema} = mongoose;
const UserSchema= new Schema({
    name:String,
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    role:String,
    password:String,
});

const User = mongoose.model('User',UserSchema);
export default User;