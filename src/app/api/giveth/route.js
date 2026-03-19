import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CURATED_REFI_PROJECTS } from '@/lib/curatedProjects';

const GIVETH_GRAPHQL = 'https://mainnet.serve.giveth.io/graphql';

const REFI_KEYWORDS = [
    'climate', 'environment', 'nature', 'forest', 'ocean', 'carbon',
    'reforestation', 'biodiversity', 'renewable', 'energy', 'clean',
    'regenerative', 'refi', 'sustainability', 'conservation',
    'education', 'learning', 'school', 'literacy',
    'social', 'community', 'poverty', 'women', 'health', 'food', 'water'
];

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

    return null;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category') || 'ALL';
    const searchFilter = searchParams.get('search') || '';
    const featuredOnly = searchParams.get('featured');

    // 1. Fetch Local APPROVED Projects
    let dbProjects = [];
    try {
        const local = await prisma.project.findMany({ where: { status: 'APPROVED' } });
        dbProjects = local.map(p => ({
            ...p,
            _id: p.id,
            totalTipped: p.totalRaised || 0,
            tipCount: p.tipCount || 0,
            source: 'local'
        }));
    } catch (e) { console.error('DB Fetch Error:', e); }

    // 2. Fetch Giveth Projects
    let givethProjects = [];
    try {
        const query = `
            query {
                allProjects(
                    sortingBy: QualityScore,
                    limit: 50,
                    filters: [Verified]
                ) {
                    projects {
                        id
                        title
                        descriptionSummary
                        categories { name }
                        image
                        totalDonations
                        slug
                        walletAddress
                    }
                }
            }
        `;
        const gResponse = await fetch(GIVETH_GRAPHQL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const gData = await gResponse.json();

        if (gData.data?.allProjects?.projects) {
            givethProjects = gData.data.allProjects.projects
                .map(p => {
                    const pillar = mapCategory(p.categories);
                    if (!pillar) return null;
                    return {
                        _id: `giveth-${p.id}`,
                        name: p.title,
                        description: p.descriptionSummary,
                        category: pillar,
                        logo: p.image || '/assets/projectIcon.png',
                        totalTipped: (p.totalDonations || 0) * 100, // format as cents to match local logic
                        tipCount: Math.floor((p.totalDonations || 0) / 10), // mock count if unavailable
                        slug: p.slug,
                        walletAddress: p.walletAddress,
                        location: "Global",
                        source: 'giveth'
                    };
                })
                .filter(Boolean);
        }
    } catch (e) { console.error('Giveth Fetch Error:', e); }

    // 3. Merge and Deduplicate
    const allSlugs = new Set(dbProjects.map(p => p.slug));
    const allGSlugs = new Set(givethProjects.map(p => p.slug));

    // Add curated projects that aren't already represented
    const uniqueCurated = CURATED_REFI_PROJECTS.filter(p => !allSlugs.has(p.slug) && !allGSlugs.has(p.slug));

    let results = [...dbProjects, ...givethProjects, ...uniqueCurated];

    // 4. Group groups and stats (standardize field names)
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
                    totalTipped: (p.totalTipped || 0) + stats.total,
                    tipCount: (p.tipCount || 0) + stats.count
                };
            }
            return p;
        });
    } catch (e) { console.warn('Tip Aggregation skipped:', e); }

    // 5. Final Filtering
    if (featuredOnly === 'true') {
        results = results.filter(p => p.featured || p.totalTipped > 0);
        results.sort((a, b) => (b.totalTipped || 0) - (a.totalTipped || 0));
        if (results.length > 7) results = results.slice(0, 7);
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
