const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const deleted = await prisma.project.deleteMany({
            where: {
                OR: [
                    { name: { contains: 'test', mode: 'insensitive' } },
                    { description: { contains: 'test', mode: 'insensitive' } },
                    { slug: { contains: 'test', mode: 'insensitive' } },
                    { name: { contains: 'dummy', mode: 'insensitive' } },
                    { description: { contains: 'dummy', mode: 'insensitive' } }
                ]
            }
        });
        console.log(`Deleted ${deleted.count} dummy/test projects.`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
