import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const counts = await prisma.project.groupBy({
            by: ['category'],
            where: { status: 'APPROVED' },
            _count: { _all: true },
        });

        const formattedCounts = counts.reduce((acc, curr) => {
            acc[curr.category] = curr._count._all;
            return acc;
        }, {});

        return NextResponse.json({ success: true, counts: formattedCounts });
    } catch (error) {
        console.error('Category count error:', error.message);
        return NextResponse.json({
            success: true,
            counts: {
                CLIMATE: 0,
                SOCIAL_IMPACT: 0,
                EDUCATION: 0,
                GOODDOLLAR_GRANTEE: 0,
                GRANT_SEEKER: 0,
            },
        });
    }
}
