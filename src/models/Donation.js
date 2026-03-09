import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        donorWallet: {
            type: String, // Wallet address of the donor
            required: true,
        },
        amount: {
            type: Number, // Amount in G$
            required: true,
        },
        amountUSD: {
            type: Number, // Optional USD equivalent at time of donation
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
