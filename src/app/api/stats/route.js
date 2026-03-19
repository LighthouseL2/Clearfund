import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
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

        // Real number of projects: Deduplicated count between DB + Curated
        const dbSlugs = await prisma.project.findMany({
            where: { status: 'APPROVED' },
            select: { slug: true }
        });
        const dbSlugSet = new Set(dbSlugs.map(p => p.slug));
        const uniqueCuratedCount = CURATED_REFI_PROJECTS.filter(p => !dbSlugSet.has(p.slug)).length;
        const projectCount = dbSlugs.length + uniqueCuratedCount;

        // Count total number of tips as "Tippers" to match project-level "Backers" logic
        const tipperCount = await prisma.tip.count();

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
