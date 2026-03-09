import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tip from '@/models/Tip';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit')) || 10;

        await dbConnect();

        // Get recent tips
        const tips = await Tip.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('projectId', 'name slug logo');

        // Calculate today's total
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayStats = await Tip.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        return NextResponse.json({
            success: true,
            data: tips,
            todayTotal: todayStats[0]?.total || 0,
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
