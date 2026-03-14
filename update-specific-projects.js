const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Updating Learn for Impact...');
        const learn = await prisma.project.updateMany({
            where: { name: { contains: 'Learn for Impact', mode: 'insensitive' } },
            data: {
                logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
                banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
                description: 'Empowering underserved communities through digital literacy and skill-building programs. Learn for Impact provides free, accessible education to bridge the technology gap and create sustainable career paths for aspiring builders.',
                tagline: 'Bridging the digital divide through accessible education and skill-building.',
                status: 'APPROVED'
            }
        });
        console.log(`Updated ${learn.count} projects matching 'Learn for Impact'`);

        console.log('Updating Green Pill Nigeria...');
        const green = await prisma.project.updateMany({
            where: { name: { contains: 'Green pill nigeria', mode: 'insensitive' } },
            data: {
                description: 'Greenpill Nigeria is a community-driven initiative focused on decentralizing impact through Regenerative Finance (ReFi) tools. We empower local builders and communities to create sustainable public goods using blockchain technology, fostering transparency and localized growth across the region.',
                tagline: 'Decentralizing impact through Regenerative Finance (ReFi) tools in Nigeria.',
                logo: '/assets/greenpill-nigeria.jfif', // Based on curated list
                status: 'APPROVED'
            }
        });
        console.log(`Updated ${green.count} projects matching 'Green Pill Nigeria'`);

    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
