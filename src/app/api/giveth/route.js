import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CURATED_REFI_PROJECTS } from '@/lib/curatedProjects';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category') || 'ALL';
    const searchFilter = searchParams.get('search') || '';
    const featuredOnly = searchParams.get('featured');

    // 1. Fetch Local APPROVED Projects
    let dbProjects = [];
    try {
        const local = await prisma.project.findMany({
            where: { status: 'APPROVED' }
        });
        dbProjects = local.map(p => ({
            ...p,
            _id: p.id,
            totalTipped: p.totalRaised || 0,
            tipCount: p.tipCount || 0,
            source: 'local'
        }));
    } catch (e) {
        console.error('DB Fetch Error:', e);
    }

    // 2. Fetch Curated projects (no more Giveth)
    const dbSlugs = new Set(dbProjects.map(p => p.slug));
    const uniqueCurated = CURATED_REFI_PROJECTS.filter(p => !dbSlugs.has(p.slug));

    let results = [...dbProjects, ...uniqueCurated];

    // 3. Tip Aggregation (Force real-time update)
    try {
        const tipStats = await prisma.tip.groupBy({
            by: ['projectId'],
            _sum: { amount: true },
            _count: { _all: true }
        });
        const statsMap = {};
        tipStats.forEach(s => {
            statsMap[s.projectId] = { total: s._sum.amount, count: s._count._all };
        });

        results = results.map(p => {
            const pid = p.id || p._id;
            const stats = statsMap[pid];
            if (stats) {
                return {
                    ...p,
                    totalTipped: p.source === 'local' ? stats.total : (p.totalTipped || 0) + stats.total,
                    tipCount: p.source === 'local' ? stats.count : (p.tipCount || 0) + stats.count
                };
            }
            return p;
        });
    } catch (e) {
        console.warn('Tip Aggregation skipped:', e);
    }

    // 4. Sort and Filter
    // Always sort by highest tip for discovery, unless category sorting is active.
    results.sort((a, b) => (b.totalTipped || 0) - (a.totalTipped || 0));

    if (featuredOnly === 'true') {
        // For landing page, take top 3 based on totalTipped
        results = results.slice(0, 3);
    }

    if (categoryFilter !== 'ALL') results = results.filter(p => p.category === categoryFilter);
    if (searchFilter) {
        const q = searchFilter.toLowerCase();
        results = results.filter(p =>
            (p.name || "").toLowerCase().includes(q) ||
            (p.location || "").toLowerCase().includes(q)
        );
    }

    return NextResponse.json({ success: true, data: results });
}
