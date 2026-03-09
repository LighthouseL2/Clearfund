import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tip from '@/models/Tip';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');
        const limit = parseInt(searchParams.get('limit')) || 15;

        try {
            await dbConnect();
        } catch (dbError) {
            return NextResponse.json({ success: true, data: [] });
        }

        let query = {};
        if (projectId) {
            query.projectId = projectId;
        }

        const donorWallet = searchParams.get('donorWallet');
        if (donorWallet) {
            query.donorWallet = donorWallet;
        }

        const tips = await Tip.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('projectId', 'name slug logo');

        return NextResponse.json({ success: true, data: tips });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        await dbConnect();

        const tip = await Tip.create(data);
        const { projectId, amount } = data;

        // Update Project totals only if it's a valid MongoDB ID
        if (projectId && projectId.match(/^[0-9a-fA-F]{24}$/)) {
            try {
                await Project.findByIdAndUpdate(projectId, {
                    $inc: {
                        totalRaised: amount,
                        donationCount: 1,
                    },
                });
            } catch (pError) {
                console.error("Failed to update project totals:", pError);
            }
        }

        return NextResponse.json({ success: true, data: tip });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
