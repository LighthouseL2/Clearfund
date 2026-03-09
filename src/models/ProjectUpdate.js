import mongoose from 'mongoose';

const ProjectUpdateSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide a title for the update.'],
        },
        content: {
            type: String,
            required: [true, 'Please provide the update content.'],
        },
        images: {
            type: [String], // Array of URLs
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.ProjectUpdate || mongoose.model('ProjectUpdate', ProjectUpdateSchema);
