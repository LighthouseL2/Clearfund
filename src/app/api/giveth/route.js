import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

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

//  Curated ReFi projects sourced from Giveth / real initiatives, including 5 GoodCollective projects
const CURATED_REFI_PROJECTS = [
    {
        _id: "gc1",
        name: "Education Fund",
        tagline: "Providing essential resources and digital access to underserved students in Colombia.",
        category: "EDUCATION",
        logo: "/donate-images/happy.png",
        totalRaised: 0,
        fundingGoal: 150,
        donationCount: 0,
        featured: true,
        slug: "education-fund-colombia",
        website: "https://goodcollective.xyz",
        location: "Colombia",
        socialLink: "https://twitter.com/gooddollarorg",

        description: "Education fundamentally alters the trajectory of a community, yet access remains unequal around the world. In rural Colombia, many underserved students face systemic barriers to foundational learning and technological access, widening the digital divide.\n\nThis specific fund is built to bridge that gap by equipping marginalized classrooms with critical digital learning tools, stable internet routing, and essential school supplies. Tipping this campaign channels resources directly to localized hubs where children are trained in both traditional literacy and modern tech literacy, equipping them with the knowledge and autonomy necessary to break generational cycles of poverty and thrive."
    },
    {
        _id: "gc2",
        name: "Kakamega Forest Restoration",
        tagline: "Supporting smallholder farmers in reforestation and conservation of the Kakamega forest.",
        category: "CLIMATE",
        logo: "/donate-images/grass.jpg",
        totalRaised: 0,
        fundingGoal: 120,
        donationCount: 0,
        featured: false,
        slug: "kakamega-restoration",
        website: "https://goodcollective.xyz",
        location: "Kenya",
        socialLink: "https://twitter.com/gooddollarorg",

        description: "The Kakamega Forest is Kenya's only tropical rainforest and an unparalleled biodiversity hotspot. Unfortunately, rapid agricultural expansion and illegal logging have dramatically reduced its footprint. This campaign tackles both environmental conservation and local economic empowerment simultaneously.\n\nBy tipping, you directly support indigenous smallholder farmers who live on the forest's edge. Your funds provide them with the seeds, tools, and direct economic incentives needed to transition away from logging and towards sustainable agroforestry and native ecosystem restoration. This initiative rebuilds the vital flora canopy, protects native species, and fundamentally aligns local livelihoods with the preservation of natural capital."
    },
    {
        _id: "gc3",
        name: "Women Empowerment",
        tagline: "Direct support for female entrepreneurs and community leaders across Nigeria.",
        category: "SOCIAL_IMPACT",
        logo: "/donate-images/laugh.png",
        totalRaised: 0,
        fundingGoal: 100,
        donationCount: 0,
        featured: false,
        slug: "women-empowerment-nigeria",
        website: "https://goodcollective.xyz",
        location: "Nigeria",
        socialLink: "https://twitter.com/gooddollarorg",

        description: "Economic independence is the cornerstone of societal progress. Across Nigeria, countless resilient female entrepreneurs lack access to traditional banking, credit lines, and foundational business resources. \n\nThis initiative is fully committed to tipping the scales by distributing direct micro-grants and GoodDollar basic income to women spearheading community projects and small local enterprises. These funds are used to scale up small businesses, foster financial independence, and create robust mutual-aid networks within communities. When you fund female leaders, you uplift entire neighborhoods. Join us in fueling the financial exclusion gap with targeted tools for opportunity and growth."
    },
    {
        _id: "gc4",
        name: "Silvi: Trees for the Future",
        tagline: "Empowering local communities to plant trees and earn crypto rewards for biodiversity.",
        category: "CLIMATE",
        logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        totalRaised: 0,
        fundingGoal: 100,
        donationCount: 0,
        featured: false,
        slug: "silvi-trees",
        website: "https://goodcollective.xyz",
        location: "Global",
        socialLink: "https://twitter.com/silvi_protocol",
        description: "Silvi connects the digital frontier of blockchain with grounded, real-world climate action. Deforestation accelerates global warming, and typical carbon offset programs often fail to properly compensate the locals doing the actual physical labor. Silvi is changing that narrative by directly tokenizing tree-planting operations.\n\nBy tipping this initiative, you allow local communities to earn tangible crypto rewards every time they plant a tree and verify its growth. This transforms environmental restoration from a distant charitable act into a highly transparent, gamified, and localized economy. Join us in making regenerative finance the easiest way to heal our planet."
    },
    {
        _id: "gc5",
        name: "Clean Water Access",
        tagline: "Installing solar-powered water filtration systems in drought-affected villages.",
        category: "SOCIAL_IMPACT",
        logo: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
        totalRaised: 0,
        fundingGoal: 50,
        donationCount: 0,
        featured: false,
        slug: "clean-water-access",
        website: "https://goodcollective.xyz",
        location: "Uganda",
        description: "Contaminated water sources are one of the leading severe health crises in rural Uganda. Many communities walk miles daily to collect water, which frequently carries aggressive pathogens that stall economic and educational opportunities, particularly for young children.\n\nThis campaign bridges the infrastructure gap by sourcing and deploying rugged, solar-powered water filtration machinery directly into the heart of drought-affected villages. The systems run entirely off-grid, stripping out heavy pollutants and biological hazards to produce clean, safe drinking water. Your direct tips immediately reduce local disease rates, return thousands of hours to the community, and establish a foundational layer for public health."
    },
    {
        _id: "g2",
        name: "Greenpill Nigeria",
        tagline: "Empowering local communities with regenerative finance tools and sustainable initiatives across Nigeria.",
        category: "SOCIAL_IMPACT",
        logo: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
        totalRaised: 0,
        fundingGoal: 200,
        donationCount: 0,
        featured: true,
        slug: "greenpill-nigeria",
        website: "https://greenpill.network",
        location: "Nigeria"
    }
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'ALL';
    const search = searchParams.get('search') || '';
    const featured = searchParams.get('featured');

    // try {
    //     // Query Giveth GraphQL for ReFi/Environmental/Social projects
    //     const query = `{
    //         projects(
    //             limit: 20,
    //             sortingBy: MostFunded,
    //             filters: [Verified],
    //             searchTerm: "environment"
    //         ) {
    //             projects {
    //                 id
    //                 title
    //                 descriptionSummary
    //                 categories { name }
    //                 image
    //                 totalDonations
    //                 slug
    //             }
    //         }
    //     }`;

    //     const response = await fetch(GIVETH_GRAPHQL, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ query }),
    //         signal: AbortSignal.timeout(6000),
    //         next: { revalidate: 300 }, // cache 5 min
    //     });

    //     if (response.ok) {
    //         const json = await response.json();
    //         const raw = json?.data?.projects?.projects || [];

    //         if (raw.length > 0) {
    //             const mapped = raw
    //                 .map((p, i) => {
    //                     const cat = mapCategory(p.categories);
    //                     if (!cat) return null; // only include ReFi-relevant projects
    //                     return {
    //                         _id: `giveth-${p.id}`,
    //                         name: p.title,
    //                         tagline: p.descriptionSummary || 'A high-impact ReFi project on Giveth.',
    //                         category: cat,
    //                         logo: p.image || `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80`,
    //                         totalRaised: 0,
    //                         fundingGoal: 200,
    //                         donationCount: 0,
    //                         featured: i < 3,
    //                         slug: p.slug || `giveth-${p.id}`,
    //                         website: `https://giveth.io/project/${p.slug}`,
    //                         location: 'Global'
    //                     };
    //                 })
    //                 .filter(Boolean);

    //             if (mapped.length > 0) {
    //                 let results = mapped;
    //                 if (featured === 'true') results = results.filter(p => p.featured).slice(0, 3);
    //                 if (category !== 'ALL') results = results.filter(p => p.category === category);
    //                 if (search) {
    //                     const q = search.toLowerCase();
    //                     results = results.filter(p => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
    //                 }
    //                 return NextResponse.json({ success: true, data: results, source: 'giveth' });
    //             }
    //         }
    //     }
    // } catch (err) {
    //     // Silently fall through to curated data
    // }

    // ─── Local Database Projects ──────────────────────────────────
    let dbProjects = [];
    try {
        await dbConnect();
        const localProjects = await Project.find({ status: 'APPROVED' }).lean();
        dbProjects = localProjects.map(p => ({
            ...p,
            _id: p._id.toString(),
            source: 'local'
        }));
    } catch (dbErr) {
        console.error("Local DB fetch failed:", dbErr);
    }

    // ─── Curated fallback ───────────────────────────────────────────
    let results = [...dbProjects, ...CURATED_REFI_PROJECTS];

    if (featured === 'true') results = results.filter(p => p.featured).slice(0, 3);
    if (category !== 'ALL') results = results.filter(p => p.category === category);
    if (search) {
        const q = search.toLowerCase();
        results = results.filter(p =>
            p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)
        );
    }

    return NextResponse.json({ success: true, data: results, source: 'hybrid' });
}
