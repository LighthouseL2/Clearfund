const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Searching for test projects...');
        const testProjects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: 'test', mode: 'insensitive' } },
                    { slug: { contains: 'test', mode: 'insensitive' } }
                ]
            }
        });

        if (testProjects.length === 0) {
            console.log('No test projects found.');
            return;
        }

        console.log(`Found ${testProjects.length} test project(s). Deleting...`);
        for (const p of testProjects) {
            console.log(`- Deleting: ${p.name} (${p.slug})`);
            await prisma.project.delete({
                where: { id: p.id }
            });
        }
        console.log('Deletion complete.');

    } catch (err) {
        console.error('Error during deletion:', err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
