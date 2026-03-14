const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const project = {
        name: "Learn for Impact",
        slug: "learn-for-impact",
        tagline: "Bridging the digital divide through accessible education and skill-building.",
        category: "EDUCATION",
        logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        banner: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
        location: "Brazil",
        website: "https://www.karmahq.xyz/project/kfmedias-learn-for-impact-program",
        impactDescription: "Research and Development",
        walletAddress: "0x6b7881a8e60baaf50e722fd193c49122d076c337",
        status: 'APPROVED',
        featured: true,
        description: "Empowering underserved communities through digital literacy and skill-building programs. Learn for Impact provides free, accessible education to bridge the technology gap and create sustainable career paths for aspiring builders."
    };

    try {
        console.log("Updating Learn for Impact with submitted data...");
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: project,
            create: project
        });
        console.log("Successfully updated Learn for Impact.");
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
