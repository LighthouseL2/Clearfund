import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Tip from '@/models/Tip';

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
                    projectCount: 6,
                    donorCount: 0,
                    isMock: true
                },
            });
        }

        // Aggregated stats: Sum of ALL tips across the entire platform
        const tipSummary = await Tip.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const totalAmount = tipSummary[0]?.total || 0;

        // Real number of projects: Approved in DB + Curated Hardcoded ones
        const dbProjectCount = await Project.countDocuments({ status: 'APPROVED' });
        // We have 6 curated ReFi projects defined in the hybrid API
        const projectCount = 6 + dbProjectCount;

        // Count unique donor wallets (tippers)
        const donors = await Tip.distinct('donorWallet');
        const donorCount = donors.length;

        return NextResponse.json({
            success: true,
            data: {
                totalGDonated: totalAmount,
                projectCount: projectCount,
                donorCount: donorCount,
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
