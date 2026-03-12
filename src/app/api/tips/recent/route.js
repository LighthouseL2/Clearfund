import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit')) || 10;

        // Get recent tips with project info
        const tips = await prisma.tip.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                project: {
                    select: { id: true, name: true, slug: true, logo: true },
                },
            },
        });

        // Calculate today's total
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayStats = await prisma.tip.aggregate({
            where: { createdAt: { gte: today } },
            _sum: { amount: true },
        });

        // Format tips to match expected frontend structure
        const formattedTips = tips.map(t => ({
            _id: t.id,
            projectId: t.project
                ? { _id: t.project.id, name: t.project.name, slug: t.project.slug, logo: t.project.logo }
                : { _id: t.projectId, name: 'ReFi Project', slug: t.projectId },
            donorWallet: t.donorWallet,
            amount: t.amount,
            anonymous: t.anonymous,
            createdAt: t.createdAt,
        }));

        return NextResponse.json({
            success: true,
            data: formattedTips,
            todayTotal: todayStats._sum.amount || 0,
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
