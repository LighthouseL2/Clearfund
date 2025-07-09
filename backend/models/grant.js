import mongoose from "mongoose";


const grantSchema = new mongoose.Schema({
    title: String,
    contributions: Number,
    crowdfunded_usd: String,
    matched_usd: String,
    matched_usd_glo: String,
    total_usd: String
}, { timestamps: true })

const Grant = mongoose.model("Grant", grantSchema)

export default Grant