import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { slugify } from '@/lib/utils/slugify';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');
        const status = searchParams.get('status') || 'APPROVED';
        const sort = searchParams.get('sort') || 'recent';

        const where = {};

        if (status !== 'ALL') {
            where.status = status;
        }
        if (category && category !== 'ALL') {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (featured === 'true') {
            where.featured = true;
        }

        let orderBy = { createdAt: 'desc' };
        if (sort === 'most-funded') {
            orderBy = { totalRaised: 'desc' };
        } else if (sort === 'alphabetical') {
            orderBy = { name: 'asc' };
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy,
        });

        const data = projects.map(p => ({
            ...p,
            _id: p.id,
            totalTipped: p.totalRaised || 0,
            tipCount: p.tipCount || 0,
        }));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Projects GET error:', error.message);
        // Return mock data on failure
        const mockProjects = [
            {
                _id: '1',
                name: 'Amazon Reforestation',
                tagline: 'Directly funding local communities to plant and protect native trees in the Amazon.',
                category: 'CLIMATE',
                logo: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
                totalTipped: 0, fundingGoal: 100, tipCount: 0, featured: true,
                slug: 'amazon-reforestation',
                description: 'The Amazon rainforest is a crucial buffer against global climate change.',
            },
            {
                _id: '2',
                name: 'Global Literacy Initiative',
                tagline: 'Providing digital learning tools and books to children in underserved regions.',
                category: 'EDUCATION',
                logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
                totalTipped: 0, fundingGoal: 80, tipCount: 0, featured: true,
                slug: 'global-literacy',
                description: 'Access to quality education remains a profound global challenge.',
            },
            {
                _id: '3',
                name: 'Clean Water Access',
                tagline: 'Installing solar-powered water filtration systems in remote villages.',
                category: 'SOCIAL_IMPACT',
                logo: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80',
                totalTipped: 0, fundingGoal: 150, tipCount: 0, featured: true,
                slug: 'clean-water-access',
                description: 'Millions of people worldwide still lack basic access to safe, clean drinking water.',
            },
        ];
        return NextResponse.json({ success: true, data: mockProjects });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Generate unique slug
        let slug = slugify(data.name);
        const existing = await prisma.project.findUnique({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const project = await prisma.project.create({
            data: {
                name: data.name,
                slug,
                description: data.description,
                category: data.category,
                location: data.location || null,
                website: data.website || null,
                twitter: data.twitter || null,
                github: data.github || null,
                karmaLink: data.karmaLink || null,
                milestones: data.milestones || null,
                impactDescription: data.impactDescription || null,
                logo: data.logo,
                banner: data.banner || null,
                images: data.images || [],
                fundingGoal: data.fundingGoal || null,
                walletAddress: data.walletAddress,
                status: 'PENDING',
                featured: false,
                totalRaised: 0,
                tipCount: 0,
                submittedBy: data.submittedBy || null,
            },
        });

        return NextResponse.json({ success: true, data: { ...project, _id: project.id } });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
