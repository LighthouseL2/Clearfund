import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import Project from '@/models/Project';

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

        const donations = await Donation.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('projectId', 'name slug logo');

        return NextResponse.json({ success: true, data: donations });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        await dbConnect();

        const donation = await Donation.create(data);

        // Update Project totals
        await Project.findByIdAndUpdate(data.projectId, {
            $inc: {
                totalRaised: data.amount,
                donationCount: 1,
            },
        });

        return NextResponse.json({ success: true, data: donation });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
