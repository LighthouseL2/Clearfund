const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const project = {
        name: "Learn for Impact",
        slug: "learn-for-impact",
        tagline: "Empowering communities through accessible Web3 education and practical impact-driven learning modules.",
        category: "EDUCATION",
        logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
        banner: "https://images.unsplash.com/photo-1523240715630-991f2b076c33?w=1200&q=80",
        fundingGoal: 500,
        featured: true,
        status: 'APPROVED',
        location: "Global",
        walletAddress: "0x6B7881a53B476495d48d0B7eA091773340354857",
        description: "Learn for Impact is a decentralized education platform designed to bridge the gap between Web3 theory and real-world application. We provide learners with practical, modular courses that focus on building regenerative systems and community-led public goods.\n\nOur mission is to create a global network of builders who are equipped with the tools and knowledge to drive sustainable change. Through this platform, users can support specific educational tracks and directly fund the creation of open-source learning resources that benefit the entire ecosystem."
    };

    try {
        console.log("Restoring Learn for Impact...");
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: project,
            create: project
        });
        console.log("Successfully restored Learn for Impact.");
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
