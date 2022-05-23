import mongoose from "mongoose";




const emailVerificationToken = mongoose.model('emailVerificationToken', new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    token: {type: String, required: true},
    createAt: {type: Date, expires: 3600, default: Date.now()},

}))

export default emailVerificationToken