const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Deleting Learn for Impact...');
        const d = await prisma.project.deleteMany({
            where: { slug: 'learn-for-impact' }
        });
        console.log(`Deleted ${d.count} projects.`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
