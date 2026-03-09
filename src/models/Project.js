import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a project name.'],
            maxlength: [100, 'Project name cannot be more than 100 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        tagline: {
            type: String,
            required: [true, 'Please provide a project tagline.'],
            maxlength: [150, 'Tagline cannot be more than 150 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a project description.'],
            minlength: [100, 'Description must be at least 100 characters'],
        },
        category: {
            type: String,
            required: [true, 'Please specify a category.'],
            enum: [
                'GOODDOLLAR_GRANTEE',
                'GRANT_SEEKER',
                'CLIMATE',
                'SOCIAL_IMPACT',
                'EDUCATION',
            ],
        },
        logo: {
            type: String,
            required: [true, 'Please provide a project logo URL.'],
        },
        images: {
            type: [String],
            default: [],
        },
        fundingGoal: {
            type: Number,
            required: false,
        },
        totalRaised: {
            type: Number,
            default: 0,
        },
        donationCount: {
            type: Number,
            default: 0,
        },
        walletAddress: {
            type: String,
            required: [true, 'Please provide a wallet address to receive donations.'],
        },
        website: String,
        twitter: String,
        discord: String,
        telegram: String,
        github: String,
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED'],
            default: 'PENDING',
        },
        featured: {
            type: Boolean,
            default: false,
        },
        submittedBy: {
            type: String, // Wallet address of the submitter
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
