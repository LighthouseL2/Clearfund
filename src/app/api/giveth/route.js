import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CURATED_REFI_PROJECTS } from '@/lib/curatedProjects';

const GIVETH_GRAPHQL = 'https://mainnet.serve.giveth.io/graphql';

// Only allow ReFi-relevant categories into the platform
const REFI_KEYWORDS = [
    'climate', 'environment', 'nature', 'forest', 'ocean', 'carbon',
    'reforestation', 'biodiversity', 'renewable', 'energy', 'clean',
    'regenerative', 'refi', 'sustainability', 'conservation',
    'education', 'learning', 'school', 'literacy',
    'social', 'community', 'poverty', 'women', 'health', 'food', 'water'
];

// Map Giveth category names → our three ClearFund pillars
function mapCategory(categories = []) {
    const names = categories.map(c => c.name?.toLowerCase() || '');
    if (names.some(n =>
        n.includes('climate') || n.includes('environment') || n.includes('nature') ||
        n.includes('forest') || n.includes('ocean') || n.includes('carbon') ||
        n.includes('regenerative') || n.includes('refi') || n.includes('biodiversity') ||
        n.includes('renewable') || n.includes('conservation')
    )) return 'CLIMATE';

    if (names.some(n =>
        n.includes('education') || n.includes('learning') || n.includes('school') || n.includes('literacy')
    )) return 'EDUCATION';

    if (names.some(n =>
        n.includes('social') || n.includes('community') || n.includes('poverty') ||
        n.includes('women') || n.includes('health') || n.includes('food') || n.includes('water')
    )) return 'SOCIAL_IMPACT';

    return null; // exclude projects that don't fit our pillars
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'ALL';
    const search = searchParams.get('search') || '';
    const featured = searchParams.get('featured');

    // ─── Local Database Projects ──────────────────────────────────
    let dbProjects = [];
    try {
        const localProjects = await prisma.project.findMany({
            where: { status: 'APPROVED' },
        });
        dbProjects = localProjects.map(p => ({
            ...p,
            _id: p.id,
            totalTipped: p.totalRaised || 0,
            tipCount: p.tipCount || 0,
            source: 'local',
        }));
    } catch (dbErr) {
        console.error('Local DB fetch failed:', dbErr);
    }

    // ─── Curated fallback ───────────────────────────────────────────
    let results = [...dbProjects, ...CURATED_REFI_PROJECTS];

    // ─── Real-time Tip Aggregation ──────────────────────────────────
    try {
        const tipStats = await prisma.tip.groupBy({
            by: ['projectId'],
            _sum: { amount: true },
            _count: { _all: true },
        });

        // Map tip stats for easy lookup
        const statsMap = {};
        tipStats.forEach(stat => {
            statsMap[stat.projectId] = {
                totalAmount: stat._sum.amount || 0,
                count: stat._count._all,
            };
        });

        // Merge stats into results
        results = results.map(p => {
            const pid = p._id || p.id;
            const stats = statsMap[pid];
            if (stats) {
                return {
                    ...p,
                    totalTipped: stats.totalAmount,
                    tipCount: stats.count,
                };
            }
            return p;
        });
    } catch (statError) {
        console.warn('Failed to aggregate tip stats:', statError);
    }

    if (featured === 'true') {
        results = results.filter(p => p.featured);
        // Only slice if we have enough results, otherwise return what we have
        if (results.length > 3) results = results.slice(0, 3);
    }
    if (category !== 'ALL') results = results.filter(p => p.category === category);
    if (search) {
        const q = search.toLowerCase();
        results = results.filter(p =>
            (p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
        );
    }

    return NextResponse.json({ success: true, data: results, source: 'hybrid' });
}
