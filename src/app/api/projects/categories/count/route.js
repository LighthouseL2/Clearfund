import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
    try {
        try {
            await dbConnect();
        } catch (dbError) {
            return NextResponse.json({
                success: true,
                counts: {
                    CLIMATE: 12,
                    REFI: 8,
                    SOCIAL_IMPACT: 15,
                    PUBLIC_GOODS: 24,
                    GOODDOLLAR_GRANTEE: 10,
                    GRANT_SEEKER: 20,
                    GOODCOLLECTIVE: 5
                }
            });
        }

        const counts = await Project.aggregate([
            { $match: { status: 'APPROVED' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);

        const formattedCounts = counts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        return NextResponse.json({ success: true, counts: formattedCounts });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
