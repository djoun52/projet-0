import mongoose from "mongoose";

const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, unique: true },
    pseudo: { type: String },
    password: { type: String },
    roles: { type: Array }, 
    isVerified : {type: Boolean, required: true, default: false}
}));

export default User