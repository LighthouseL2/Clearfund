import mongoose from 'mongoose';

const TipSchema = new mongoose.Schema(
    {
        projectId: {
            type: String, // Accepts both ObjectId string and custom IDs like 'gc1'
            required: true,
            ref: 'Project'
        },
        donorWallet: {
            type: String, // Wallet address of the tipper
            required: true,
        },
        amount: {
            type: Number, // Amount in G$
            required: true,
        },
        amountUSD: {
            type: Number, // Optional USD equivalent at time of tip
            required: false,
        },
        txHash: {
            type: String,
            required: true,
            unique: true,
        },
        blockNumber: {
            type: Number,
            required: false,
        },
        network: {
            type: String,
            default: 'celo',
        },
        message: {
            type: String,
            required: false,
        },
        anonymous: {
            type: Boolean,
            default: false,
        },
        projectName: {
            type: String,
            required: false,
        },
        projectLogo: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Tip || mongoose.model('Tip', TipSchema);
