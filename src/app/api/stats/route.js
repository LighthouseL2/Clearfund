import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CURATED_REFI_PROJECTS } from '@/lib/curatedProjects';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        // Aggregated stats: Sum of ALL tips across the entire platform
        const tipSummary = await prisma.tip.aggregate({
            _sum: { amount: true },
        });
        const totalGTipped = tipSummary._sum.amount || 0;

        // Real number of projects: Approved in DB + Curated Hardcoded ones
        const dbProjectCount = await prisma.project.count({
            where: { status: 'APPROVED' },
        });
        const projectCount = CURATED_REFI_PROJECTS.length + dbProjectCount;

        // Count unique tipper wallets
        const tippers = await prisma.tip.findMany({
            distinct: ['donorWallet'],
            select: { donorWallet: true },
        });
        const tipperCount = tippers.length;

        return NextResponse.json({
            success: true,
            data: {
                totalGTipped,
                projectCount,
                tipperCount,
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error('Stats API error:', error.message);
        // Graceful fallback with curated data
        return NextResponse.json({
            success: true,
            data: {
                totalGTipped: 0,
                projectCount: CURATED_REFI_PROJECTS.length,
                tipperCount: 0,
                timestamp: new Date().toISOString(),
            },
            isMock: true,
        });
    }
}
