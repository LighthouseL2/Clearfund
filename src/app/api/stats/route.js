import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Donation from '@/models/Donation';

export async function GET() {
    try {
        try {
            await dbConnect();
        } catch (dbError) {
            console.warn("Database connection failed, returning mock data:", dbError.message);
            return NextResponse.json({
                success: true,
                data: {
                    totalGDonated: 0,
                    projectCount: 0,
                    donorCount: 0,
                    isMock: true
                },
            });
        }

        // Aggregated stats
        const totalRaised = await Project.aggregate([
            { $match: { status: 'APPROVED' } },
            { $group: { _id: null, total: { $sum: '$totalRaised' } } },
        ]);

        // Real number of projects: Curated (6) + Approved in DB
        const dbProjectCount = await Project.countDocuments({ status: 'APPROVED' });
        const projectCount = 6 + dbProjectCount;

        // Count unique donor wallets (tippers)
        const donors = await Donation.distinct('donorWallet');

        return NextResponse.json({
            success: true,
            data: {
                totalGDonated: totalRaised[0]?.total || 0,
                projectCount: projectCount,
                donorCount: donors.length,
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
