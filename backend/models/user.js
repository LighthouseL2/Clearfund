import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    role: String
}, { timestamps: true })


const User = mongoose.model("User", userSchema)

export default User