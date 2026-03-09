import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { slugify } from '@/lib/utils/slugify';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');
        const status = searchParams.get('status') || 'APPROVED';
        const sort = searchParams.get('sort') || 'recent';

        try {
            await dbConnect();
        } catch (dbError) {
            const mockProjects = [
                {
                    _id: "1",
                    name: "Amazon Reforestation",
                    tagline: "Directly funding local communities to plant and protect native trees in the Amazon.",
                    category: "CLIMATE",
                    logo: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
                    totalRaised: 0,
                    fundingGoal: 100,
                    donationCount: 0,
                    featured: true,
                    slug: "amazon-reforestation",
                    website: "https://amazonreforestation.org",
                    socialLink: "https://twitter.com/amazonref",
                    contactEmail: "contact@amazonreforestation.org",
                    description: "The Amazon rainforest is a crucial buffer against global climate change, yet deforestation rates continue to threaten this vital ecosystem. This campaign directly funds local indigenous communities on the frontlines of conservation. By providing them with resources, tools, and direct crypto compensation, we empower them to cultivate native tree species, restore degraded lands, and patrol protected areas. \n\nYour contribution not only aids in carbon sequestration and biodiversity protection but also supports sustainable economic models that make forest preservation more viable than logging. Together, we can regenerate the 'lungs of the Earth' and ensure these communities thrive alongside their natural environment."
                },
                {
                    _id: "2",
                    name: "Global Literacy Initiative",
                    tagline: "Providing digital learning tools and books to children in underserved regions.",
                    category: "EDUCATION",
                    logo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
                    totalRaised: 0,
                    fundingGoal: 80,
                    donationCount: 0,
                    featured: true,
                    slug: "global-literacy",
                    website: "https://globalliteracy.org",
                    socialLink: "https://twitter.com/globalliteracy",
                    contactEmail: "info@globalliteracy.org",
                    description: "Access to quality education remains a profound global challenge, particularly in remote and underserved regions. The Global Literacy Initiative is dedicated to bridging the educational divide by delivering foundational learning materials and digital tools to children who need them most. \n\nWe partner with established local educators to distribute tablets pre-loaded with interactive offline curriculums, establish pop-up libraries, and provide critical teacher training. By tipping this campaign, you are actively democratizing education and providing the next generation with the knowledge and literacy skills necessary to escape the cycle of poverty and participate meaningfully in the global economy."
                },
                {
                    _id: "3",
                    name: "Clean Water Access",
                    tagline: "Installing solar-powered water filtration systems in remote villages.",
                    category: "SOCIAL_IMPACT",
                    logo: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
                    totalRaised: 0,
                    fundingGoal: 150,
                    donationCount: 0,
                    featured: true,
                    slug: "clean-water-access",
                    website: "https://cleanwateraccess.org",
                    socialLink: "https://twitter.com/cleanwater",
                    contactEmail: "support@cleanwateraccess.org",
                    description: "Millions of people worldwide still lack basic access to safe, clean drinking water, leading to severe health complications and stunted economic growth. This campaign addresses the water crisis directly by deploying robust, solar-powered water filtration systems in remote villages and drought-affected regions.\n\nOur off-grid technology pumps and purifies groundwater without relying on fossil fuels or fragile centralized infrastructure. By supporting this initiative, you are ensuring entire communities gain sustainable access to clean water, which immediately reduces waterborne diseases, frees women and children from hours of daily water collection, and creates a foundation for local agriculture and long-term public health."
                }
            ];


            return NextResponse.json({ success: true, data: mockProjects });
        }



        let query = {};
        if (status !== 'ALL') {
            query.status = status;
        }

        if (category && category !== 'ALL') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { tagline: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (featured === 'true') {
            query.featured = true;
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'most-funded') {
            sortOption = { totalRaised: -1 };
        } else if (sort === 'alphabetical') {
            sortOption = { name: 1 };
        }

        const projects = await Project.find(query).sort(sortOption);

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        await dbConnect();

        // Generate unique slug
        let slug = slugify(data.name);
        const existingProjectWithSlug = await Project.findOne({ slug });
        if (existingProjectWithSlug) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const project = await Project.create({
            ...data,
            slug,
            status: 'APPROVED', // Set to APPROVED for immediate visibility
            featured: false,
            totalRaised: 0,
            donationCount: 0,
        });

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
